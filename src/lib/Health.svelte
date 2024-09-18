<script>
	import { health } from './gameState';
</script>

{#each [0, 1, 2] as heart}
	<path
		transform="translate({3 + heart * 3} {1})"
		d="M1.5.67a.76.76 0 0 0-.65-.4c-.39 0-.69.3-.69.7 0 .76.42.88 1.34 1.75.92-.87 1.34-.99 1.34-1.75 0-.4-.3-.7-.7-.7-.27 0-.5.17-.64.4Z"
		fill={$health > heart ? '#fff' : 'none'}
		stroke="#888"
		stroke-width={0.2}
    stroke-linejoin="round"
	/>
{/each}
