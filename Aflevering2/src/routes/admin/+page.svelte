<script>
	import { createSubscriber } from 'svelte/store';
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

		if (response.ok) {
			alert('Bruger oprettet!');
		} else {
			alert('Fejl ved oprettelse af bruger!');
		}

		username = '';
		password = '';
	};
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
	<div class="bg-white shadow-md rounded p-6 w-full max-w-sm">
		<h1 class="text-2xl font-bold mb-4">Den hemmelige administratorside</h1>

		<input
			type="text"
			bind:value={username}
			placeholder="Brugernavn"
			class="input input-bordered w-full mb-3"
		/>

		<input
			type="password"
			bind:value={password}
			placeholder="Adgangskode"
			class="input input-bordered w-full mb-3"
		/>

		<button class="btn btn-primary w-full" on:click={createUser}>
			Opret bruger
		</button>
	</div>
</div>
