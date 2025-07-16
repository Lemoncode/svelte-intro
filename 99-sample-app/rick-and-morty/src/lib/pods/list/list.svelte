<script lang="ts">
	import { getCharacterList } from './api/api';
	import Card from './components/card.component.svelte';
	import { goto } from '$app/navigation';
	import type { Character } from './api/api.model';
	import { onMount } from 'svelte';

	let list = $state<Character[]>([]);

	onMount(() => {
		getCharacterList().then((data) => {
			list = data.results;
		});
	});
</script>

<div>
	{#each list as character (character.id)}
		<Card onclick={() => goto(`/character/${character.id}`)}>
			<img src={character.image} alt={character.name} />
			<div>{character.name}</div>
		</Card>
	{/each}
</div>

<style>
	img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
</style>
