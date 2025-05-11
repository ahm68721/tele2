import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ params, cookies }) {
	const userId = Number(params.id);

	if (isNaN(userId)) {
		return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
	}

	const session = cookies.get('session'); // ← vigtigt at læse auth-cookie
	if (!session) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	const userData = await db.select().from(user).where(eq(user.id, userId)).execute();

	if (userData.length === 0) {
		return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(userData[0]), { status: 200 });
}
