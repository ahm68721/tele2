import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import bcrypt from 'bcryptjs';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { username, password } = await request.json();

	// Hash adgangskoden før den gemmes
	const hashedPass = await bcrypt.hash(password, 10);

	// Opret brugeren i databasen
	const createdUser = await db.insert(user).values({
		username,
		password: hashedPass
	}).returning();

	return json(createdUser, { status: 201 });
}

export async function GET() {
	// Hent alle brugere (til admin-siden)
	const allUsers = await db.select().from(user).execute();
	return json(allUsers, { status: 200 });
}
