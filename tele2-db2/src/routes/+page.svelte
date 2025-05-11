<svelte:head>
  <title>Diabetes Dagbog</title>
</svelte:head>

<script>
  import { goto } from '$app/navigation';
  import Title from '$lib/components/Title.svelte';
  import Link from '$lib/components/Link.svelte';
  import H1 from '$lib/components/H1.svelte';

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

<!-- Center wrapper -->
<div class="flex flex-col items-center justify-center min-h-screen px-4">

  <Title>Diabetes Dagbog</Title>

  <p class="mb-4 text-center">Log ind for at få adgang til din dagbog.</p>

  <input class="input mb-4 block w-full max-w-sm" bind:value={username} type="text" placeholder="Indtast Email" />
  <input class="input mb-4 block w-full max-w-sm" bind:value={password} type="password" placeholder="Indtast Password" />
  <button class="btn btn-primary mb-4 w-full max-w-sm" onclick={login}>Login</button>

  <p class="text-center">Har du ikke en konto endnu?</p>
  <Link href="/signup" class="text-center">Opret ny konto</Link>

</div>
