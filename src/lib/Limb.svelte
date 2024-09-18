<script lang="ts">
	import { jiggle } from './utils.svelte';
	const { ax = 0, ay = 0, bx = 0, by = 0 } = $props();

	const tx = jiggle(-0.15, 0.15);
	const ty = jiggle(-0.15, 0.15);
</script>

<path d="M{ax},{ay}L{bx + tx.value},{by + ty.value}" stroke-width={0.3} stroke-linecap="round" />
