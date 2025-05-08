import { db } from '$lib/server/db';
import { diaryPost } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
  const userId = request.user.id;

  const posts = await db.query.diaryPost.findMany({
    where: eq(diaryPost.user_id, userId)
  });

  return json(posts); // Returner dagbogsposter som JSON
}

export async function POST({ request }) {
  const userId = request.user.id;
  const { title, content } = await request.json();

  const newPosts = await db
    .insert(diaryPost)
    .values({
      user_id: userId,
      title,
      content
    })
    .returning();

  return json(newPosts[0], { status: 201 });
}
