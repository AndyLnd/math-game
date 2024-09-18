<script lang="ts">
	import { animate } from './utils.svelte';

	const { speed = 0.2 } = $props();

	let position = $state(0);
	let spikesL1 = $state(new Array(52).fill(0).map(() => Math.random()));
	let spikesL2 = $state(new Array(58).fill(0).map(() => Math.random()));
	let spikesL3 = $state(new Array(65).fill(0).map(() => Math.random()));
	let spikesR1 = $state(new Array(52).fill(0).map(() => Math.random()));
	let spikesR2 = $state(new Array(58).fill(0).map(() => Math.random()));
	let spikesR3 = $state(new Array(65).fill(0).map(() => Math.random()));

	animate(() => {
		const currInt = Math.floor(position);
		position += speed;
		const nextInt = Math.floor(position);
		if (currInt !== nextInt) {
			spikesL1 = [...spikesL1.slice(1), Math.random()];
			spikesL2 = [...spikesL2.slice(1), Math.random()];
			spikesL3 = [...spikesL3.slice(1), Math.random()];
			spikesR1 = [...spikesR1.slice(1), Math.random()];
			spikesR2 = [...spikesR2.slice(1), Math.random()];
			spikesR3 = [...spikesR3.slice(1), Math.random()];
		}
	});

	const makePath = (spikes: number[]) =>
		spikes.map((v, i) => `l ${v - (spikes[i - 1] ?? 0)},1`).join(' ');
</script>

<g >
	<path
		d="M0,-2 l3,0 {makePath(spikesL3)} L0,65 Z"
		transform="translate(0,{1 - (position % 1)}) scale(.8)"
		fill="#323"
	/>
	<path
		d="M0,-2 l2,0 {makePath(spikesL2)} L0,58 Z"
		transform="translate(0,{1 - (position % 1)}) scale(.9)"
		fill="#656"
	/>
	<path
		d="M30,-2 l-4,0 {makePath(spikesR3)} L30,65 Z"
		transform="translate(0,{1 - (position % 1)}) scale(.8)"
		transform-origin="right top"
		fill="#323"
	/>
	<path
		d="M30,-2 l-3,0 {makePath(spikesR2)} L30,58 Z"
		transform="translate(0,{1 - (position % 1)}) scale(.9)"
		transform-origin="right top"
		fill="#656"
	/>
	<g id="topborder" fill="#dacdd8">
		<path
			d="M0,-2 l1,0 {makePath(spikesL1)} L0,50 Z"
			transform="translate(0,{1 - (position % 1)})"
		/>
		<path
			z={10}
			d="M30,-2 l-2,0 {makePath(spikesR1)} L30,50 Z"
			transform="translate(0,{1 - (position % 1)})"
		/>
	</g>
</g>
