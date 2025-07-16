<script lang="ts">
	interface Props {
		label: string;
		onpress: (random: number) => void;
	}

	let { label, onpress }: Props = $props();

	const onclick = () => {
		const random = Math.random();
		onpress(random);
	};
</script>

<div>
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
		font-size: 16px;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
