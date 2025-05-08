<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Title from '$lib/components/Title.svelte';

	
	let diary = [];
	let title = '';
	let content = '';
  
	const saveDiary = async () => {
	  const response = await fetch('/api/diary/self', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title, content })
	  });
  
	  const data = await response.json();
  
	  if (response.ok) {
		diary.push(data);
		title = '';
		content = '';
	  } else {
		console.error('Error saving diary:', data);
	  }
	};
  
	onMount(async () => {
	  const res = await fetch('/api/diary/self');
	  if (res.ok) {
		diary = await res.json();
	  }
	});
  </script>
  
  <Title>Min dagbog</Title>
  
  <div class="mb-4">
	<input bind:value={title} type="text" placeholder="Titel" class="input input-bordered w-full mb-2" />
	<textarea bind:value={content} placeholder="Indhold" class="textarea textarea-bordered w-full mb-2"></textarea>
	<button class="btn btn-primary" on:click={saveDiary}>Gem dagbog</button>
  </div>
  
  {#each diary as post}
	<div class="p-4 mb-4 border rounded bg-base-200">
	  <h2 class="text-xl font-semibold">{post.title}</h2>
	  <i class="text-sm text-gray-500">{post.created_at}</i>
	  <p>{post.content}</p>
	</div>
  {/each}
  