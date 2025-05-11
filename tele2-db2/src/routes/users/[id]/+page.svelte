<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let user = null;
	const userId = $page.params.id;

	onMount(async () => {
		// Hent brugerdata fra API og send login-cookie med
		const res = await fetch(`/api/user/${userId}`, {
			credentials: 'include' // VIGTIGT: medtag cookie (JWT)
		});
		
		if (res.ok) {
			user = await res.json();
		} else {
			alert('Fejl ved hentning af brugerdata!');
		}
	});
</script>

<h1>Brugeroplysninger</h1>

{#if user}
	<p><strong>ID:</strong> {user.id}</p>
	<p><strong>Brugernavn:</strong> {user.username}</p>
{:else}
	<p>Indlæser brugerdata...</p>
{/if}
