<script lang="ts">
	import { page } from '$app/state';
	import Character from '$lib/pods/detail/character.component.svelte';
	let { slug } = page.params;
</script>

<Character id={slug} />
