import { put } from '@vercel/blob';
import { fail } from '@sveltejs/kit';

export async function POST({ request }) {
	const formData = await request.formData();
	const data = formData.get('file');

	if (!data || data.name === 'undefined') {
		return fail(400, {
			error: true,
			message: 'You must provide a file to upload'
		});
	}

	const { url } = await put('data/' + data.name, data, { access: 'public' });

	return new Response(url, { status: 201 });
}
