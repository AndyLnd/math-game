<script>
	import Borders from '$lib/Borders.svelte';
	import Game from '$lib/Game.svelte';
	import { GAMESTATE, gameState, fallSpeed, isGameOver, isPlayerLeft } from '$lib/gameState';
	import Home from '$lib/Home.svelte';
</script>

{#if $gameState === GAMESTATE.HOME}
	<Home />
{/if}
<svg viewBox="0 0 30 50" height="100%">
	<Borders speed={$fallSpeed} />
	{#if $gameState === GAMESTATE.INGAME}
		<Game />
	{/if}
</svg>

{#if $gameState === GAMESTATE.INGAME && !$isGameOver}
	<div class="left" onpointerdown={() => ($isPlayerLeft = true)}></div>
	<div class="right" onpointerdown={() => ($isPlayerLeft = false)}></div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@100..800&display=swap');
	:global(body) {
		margin: 0;
		background-color: rgb(218, 205, 216);
		display: flex;
		justify-content: center;
	}
	svg {
		max-width: 100vw;
		max-height: 100dvh;
		width:fit-content;

		background: #474747;
		background: radial-gradient(at center top, #2b2b2b, #010101 100%);
	}
	.left,
	.right {
		position: fixed;
		top: 0;
		bottom: 0;
	}
	.left{
		left: 0;
		right: 50%;
	}
	.right{
		left: 50%;
		right: 0;
	}
</style>
