import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function POST({ request, cookies }) {
  const { username, password } = await request.json();
  console.log('Modtaget login:', username, password);

  const userData = await db.query.user.findFirst({
    where: eq(user.username, username)
  });

  console.log('Fundet bruger i DB:', userData);

  if (!userData) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404
    });
  }

  // MIDLOERTIG: Sammenlign klartekst (uden hash)
  const isPasswordValid = password === userData.password;
  console.log('Kodeord korrekt?', isPasswordValid);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401
    });
  }

  // Sæt cookie med bruger-ID
  cookies.set('session', userData.id.toString(), {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 // 1 time
  });

  return new Response(JSON.stringify({ message: 'Login successful' }), {
    status: 200
  });
}
