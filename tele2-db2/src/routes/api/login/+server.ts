import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { PRIVATE_JWT_SECRET } from '$env/static/private';


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

  // Opret JWT token
  const token = jwt.sign(
    { id: userData.id, username },
    PRIVATE_JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Gem token som en cookie
  cookies.set('session', token, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 // 1 time
  });

  return new Response(JSON.stringify({ message: 'Login successful' }), {
    status: 200
  });
}
