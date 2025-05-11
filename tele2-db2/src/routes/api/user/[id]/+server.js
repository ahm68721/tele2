import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Tilføj evt. din egen måde at finde current user fra cookies
function getUserIdFromCookies(cookies) {
	const token = cookies.get('token');
	if (!token) return null;

	// Simpel JWT parsing — brug din egen validering her hvis nødvendig
	try {
		const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
		return payload.id;
	} catch (e) {
		return null;
	}
}

export async function GET({ params, cookies }) {
	const requestedId = Number(params.id);
	const sessionUserId = getUserIdFromCookies(cookies);

	if (isNaN(requestedId)) {
		return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
	}

	// Bloker hvis man ikke er logget ind
	if (!sessionUserId) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	// Admin check kunne være her — fx hvis du har en `role` i din user-tabel
	// eller: allow if sessionUserId === requestedId
	if (sessionUserId !== requestedId) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
	}

	const userData = await db.select().from(user).where(eq(user.id, requestedId)).execute();

	if (userData.length === 0) {
		return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(userData[0]), { status: 200 });
}
