<svelte:options customElement="wc-random-number-button" />

<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();

	let mySelf: HTMLDivElement;

	const onclick = () => {
		const random = Math.random();
		mySelf.dispatchEvent(
			new CustomEvent('press', {
				detail: random,
				composed: true // makes the event jump shadow DOM boundary
			})
		);
	};
</script>

<div bind:this={mySelf}>
	<button {onclick}>
		{label}
	</button>
</div>

<style>
	:global(button) {
		cursor: progress;
	}

	button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
