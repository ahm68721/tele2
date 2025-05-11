import { db } from '$lib/server/db';
import { diaryPost } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const userId = request.user.id;
	const { title, content } = await request.json();

	// Indsæt det nye indlæg
	const inserted = await db
		.insert(diaryPost)
		.values({
			user_id: userId,
			title,
			content
		})
		.returning();

	const newPostId = inserted[0].id;

	// Hent det komplette indlæg inkl. created_at
	const fullPost = await db.query.diaryPost.findFirst({
		where: eq(diaryPost.id, newPostId)
	});

	return json(fullPost, { status: 201 });
}

export async function GET({ cookies }) {
	const session = cookies.get('session');
	if (!session) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	const { id: userId } = JSON.parse(atob(session.split('.')[1])); // JWT payload

	const posts = await db.query.diaryPost.findMany({
		where: eq(diaryPost.user_id, userId)
	});

	return json(posts);
}
