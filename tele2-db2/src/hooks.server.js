import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
  console.log(event.url.pathname);
  const token = event.cookies.get('session');

  // Tillad adgang til åbne sider
  if (['/', '/login', '/api/login'].includes(event.url.pathname)) {
    return await resolve(event);
  }

  if (token) {
    try {
      // Verificér token og gem brugerinfo
      const decoded = jwt.verify(token, env.JWT_SECRET);
      event.request.user = decoded;
      return await resolve(event); // Fortsæt til route
    } catch (err) {
      console.error('Token verification failed:', err);
    }
  }

  // Token mangler eller er ugyldig
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401
  });
}
