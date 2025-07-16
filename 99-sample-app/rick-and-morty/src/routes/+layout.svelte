<script lang="ts">
	const { children } = $props();
</script>

<header>Rick & Morty</header>
<main>
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: #f0f0f0;
	}

	header {
		background-color: #282c34;
		color: white;
		padding: 20px;
		text-align: center;
		font-size: 24px;
	}

	main {
		padding: 20px;
	}
</style>
