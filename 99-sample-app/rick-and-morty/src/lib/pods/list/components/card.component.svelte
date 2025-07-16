<script lang="ts">
	let { children, onclick } = $props();
</script>

<div class="card" {onclick} onkeypress={onclick} role="button" tabindex="0">
	{@render children()}
</div>

<style>
	.card {
		cursor: pointer;
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 16px;
		margin: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16px;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		font-size: 26px;
	}
</style>
