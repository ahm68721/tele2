<script>
	import { createSubscriber } from 'svelte/reactivity';

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
			alert('Bruger oprettet!');
		} else {
			alert('Fejl ved oprettelse af bruger!');
		}
		username = '';
		password = '';
	};
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow-md">
	<h1 class="text-2xl font-bold mb-4">Den hemmelige administratorside</h1>

	<input
		type="text"
		bind:value={username}
		placeholder="Brugernavn"
		class="input input-bordered mb-3 w-full"
	/>

	<input
		type="password"
		bind:value={password}
		placeholder="Adgangskode"
		class="input input-bordered mb-4 w-full"
	/>

	<button
		class="btn btn-primary w-full"
		on:click={createUser}
	>
		Opret bruger
	</button>
</div>
