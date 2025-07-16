<script lang="ts">
	import './random-number-button.wc.svelte';
	import RandomNumberButton from './random-number-button.svelte';

	let randomNumber = $state(0);

	const handlePress = (e: CustomEvent) => {
		console.log('Button pressed', { e }, e.detail);
		randomNumber = e.detail;
	};

	const onpress = (random: number) => {
		randomNumber = random;
	};
</script>

<RandomNumberButton label="Generate Random Number" {onpress} />

<p>Random number: {randomNumber}</p>

<wc-random-number-button label="Generate Random Number WC" onpress={handlePress}
></wc-random-number-button>
