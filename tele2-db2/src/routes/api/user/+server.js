import { db } from '$lib/server/db'; // Import din database-klient
import { user } from '$lib/server/db/schema.js'; // Import din bruger-tabel
import { hash } from 'bcryptjs'; // Til at kryptere adgangskoder

export async function POST({ request }) {
  const { username, password } = await request.json(); // Læs body fra request

  // Krypter adgangskoden
  const hashedPass = await hash(password, 10);

  // Indsæt bruger i databasen
  const createdUser = await db.insert(user).values({
    username,
    password: hashedPass
  }).returning();

  // Send succesfuldt svar tilbage
  return new Response(JSON.stringify(createdUser), {
    status: 201 // Created
  });
}
