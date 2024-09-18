<script lang="ts">
	import { isPlayerLeft, playerTop } from './gameState';
	import Limb from './Limb.svelte';
	import { jiggle, onEvent } from './utils.svelte';

	const offsetX = jiggle(-.1, .1);
	const offsetY = jiggle(-.2, .2);

	onEvent('keydown', (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') {
			$isPlayerLeft = true;
		} else if (e.key === 'ArrowRight') {
			$isPlayerLeft = false;
		}
	});
</script>

<g class="group" style="transform: translate({$isPlayerLeft ? 8 : 22}px, {$playerTop}px) skewX({$isPlayerLeft ? -4 : 4}deg)">
	<g transform="translate({offsetX.value} {offsetY.value})" stroke="#cfc" fill="none" stroke-width={0.3}>
		<ellipse ry={3} rx={2.5} fill="black" />
		<circle r={0.3} cx={-1} cy={1} />
		<circle r={0.3} cx={1} cy={1} />
		<Limb ax={-1} ay={-2.8} bx={-2} by={-6} />
		<Limb ax={1} ay={-2.8} bx={2} by={-6} />
		<Limb ax={-2.5} ay={0} bx={-5} by={-1} />
		<Limb ax={2.5} ay={0} bx={5} by={-1} />
	</g>
</g>

<style>
	g.group {
		transition: all 0.25s ease-out;
	}
</style>
