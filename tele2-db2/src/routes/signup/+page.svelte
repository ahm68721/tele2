<script>
	import { goto } from '$app/navigation';
	import Title from '$lib/components/Title.svelte';
	import Link from '$lib/components/Link.svelte';
	import H1 from '$lib/components/H1.svelte';

	let username = $state('user');
	let password = $state('password');

	const createUser = async () => {
		const response = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		await response.json();
		if (response.ok) {
			alert('Konto oprettet! Du kan nu logge ind.');
            goto('/');
		} else {
			alert('Fejl ved oprettelse af konto!');
		}
		username = '';
		password = '';
	};
</script>

<Title>Opret ny konto</Title>

<H1>Ny bruger</H1>
<p class="mb-4">Opret en ny bruger for at få adgang til systemet.</p>

<input id="username" type="email" bind:value={username} placeholder="Indtast email" class="input block mb-4" />

<input id="password" type="password" bind:value={password} placeholder="Indtast adgangskode" class="input block mb-4" />

<button class="btn btn-primary mb-4" onclick={createUser}>Opret konto</button>

<Link href="/">Tilbage til login</Link>