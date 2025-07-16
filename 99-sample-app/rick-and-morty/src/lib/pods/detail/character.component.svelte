<script lang="ts">
	const { id } = $props();
	import { getCharacterDetail } from './api/api';
</script>

{#await getCharacterDetail(id)}
	<p>Loading...</p>
{:then character}
	<div class="details">
		<h1>{character.name}</h1>
		<img src={character.image} alt={character.name} />
		<p>Status: {character.status}</p>
		<p>Species: {character.species}</p>
		<p>
			Origin: {character.origin.name}
		</p>
		<p>Location: {character.location.name}</p>
	</div>
{/await}

<style>
	.details {
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		font-size: 20px;
		text-align: center;
	}

	img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		margin-bottom: 20px;
	}
</style>
