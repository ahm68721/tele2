<script>
	import { goto } from '$app/navigation';
	let username = $state('user');
	let password = $state('password');

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		const data = await response.json();
		if (response.ok) {
			goto('/diary');
		} else {
			alert('Login failed!');
		}
	};
</script>

<svelte:head>
	<title>Diabetes Dagbog</title>
</svelte:head>

<!-- Wrapper som centrerer hele login-boksen -->
<div class="flex justify-center items-center min-h-screen">
	<!-- Selve login-boksen -->
	<div class="w-full max-w-md p-6">
		<h1 class="text-4xl font-bold text-primary text-center mb-6">Diabetes Dagbog</h1>
		<p class="text-center mb-4">Log ind for at få adgang til din dagbog.</p>

		<input
			class="input input-bordered w-full mb-4"
			bind:value={username}
			type="text"
			placeholder="Indtast Email"
		/>
		<input
			class="input input-bordered w-full mb-4"
			bind:value={password}
			type="password"
			placeholder="Indtast Password"
		/>
		<button class="btn btn-primary w-full mb-4" on:click={login}>Login</button>

		<p class="text-center">Har du ikke en konto endnu?</p>
		<a href="/signup" class="link link-primary text-center block">Opret ny konto</a>
	</div>
</div>

