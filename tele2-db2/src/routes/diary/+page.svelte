<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Title from '$lib/components/Title.svelte';
	import Link from '$lib/components/Link.svelte';
	import H1 from '$lib/components/H1.svelte';

	let diary = $state([]);
	let title = $state('');
	let content = $state('');
	let loading = $state(false);

	const saveDiary = async () => {
		const response = await fetch('/api/diary/self', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content })
		});
		const data = await response.json();
		if (response.ok) {
			diary = [data, ...diary];  // Opdater liste med nyeste først
			title = '';
			content = '';
		} else {
			console.error('Error saving diary:', data);
		}
	};

	const logout = async () => {
		const response = await fetch('/api/logout', { method: 'POST' });
		if (response.ok) {
			goto('/');
		} else {
			console.error('Logout failed');
		}
	};

	onMount(async () => {
		try {
			loading = true;
			const res = await fetch('/api/diary/self');
			if (res.ok) {
				diary = await res.json();
			} else {
				console.error('Fetch diary failed');
			}
		} catch (error) {
			console.error('Fetch error:', error);
		} finally {
			loading = false;
		}
	});
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-center">
	<Title>Patient Dagbog</Title>

	<input bind:value={title} type="text" placeholder="Title" class="input block mb-2 w-full max-w-md" />
	<textarea bind:value={content} placeholder="Content" class="textarea block mb-4 w-full max-w-md"></textarea>

	<div class="flex gap-4 mb-6">
		<button disabled={loading} class="btn btn-primary" on:click={saveDiary}>Gem dagbog</button>
		<button class="btn btn-outline" on:click={logout}>Log ud</button>
	</div>

	<H1>Din Dagbog</H1>
	<p class="mb-2">Dine dagbogsindlæg vil blive vist her.</p>
	<Link href="/admin" class="mb-4 text-blue-500">Gå til Admin Side</Link>

	<div class="divider w-full max-w-md"></div>

	{#if loading}
		<div class="loading loading-spinner loading-xl"></div>
	{:else if diary.length === 0}
		<p class="text-gray-500 mt-4">Du har endnu ikke nogen dagbogsindlæg.</p>
	{:else}
		{#each diary as post}
			<div class="post text-left w-full max-w-md mb-6 border rounded-md p-4 bg-gray-50">
				<h2 class="text-xl font-semibold">{post.title}</h2>
				<i class="text-xs text-gray-500">{post.created_at}</i>
				<p class="mt-2">{post.content}</p>
			</div>
		{/each}
	{/if}
</div>
