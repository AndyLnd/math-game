<script>
	import Borders from '$lib/Borders.svelte';
	import Game from '$lib/Game.svelte';
	import {
		GAMESTATE,
		gameState,
		fallSpeed,
		isGameOver,
		isPlayerLeft,
		isMuted
	} from '$lib/gameState';
	import Home from '$lib/Home.svelte';
</script>

{#if $gameState === GAMESTATE.HOME}
	<Home />
{/if}
<svg class="game" viewBox="0 0 30 50" height="100%">
	<Borders speed={$fallSpeed} />
	{#if $gameState === GAMESTATE.INGAME}
		<Game />
	{/if}
</svg>

{#if $gameState === GAMESTATE.INGAME}
	{#if !$isGameOver}
		<div class="left" onpointerdown={() => ($isPlayerLeft = true)}></div>
		<div class="right" onpointerdown={() => ($isPlayerLeft = false)}></div>
	{/if}
	<button onclick={() => ($isMuted = !$isMuted)}
		><svg width="90%" height="90%" fill="none" viewBox="0 0 4 4"
			><path
				fill="#000"
				d="M.25 2.52286V1.50653c0-.2808.22766-.50839.50839-.50839H1.29L2.75398.0367c.25417-.16103.50838.24334.50838.52415v2.90769c0 .28081-.25422.68517-.50838.52415L1.29 3.03125H.75838C.47765 3.03125.25 2.80366.25 2.52286Z"
			/>
			{#if $isMuted}
				<path
					stroke="#fff"
					stroke-width=".5"
					d="m.7244 1.0867 2.52267 2.52265.24659.24651a.23074.23074 0 0 0 .16388.06797.23106.23106 0 0 0 .16394-.06797c.09056-.09049.09056-.23731 0-.32788l-.55114-.55113-1.92458-1.92458L.50639.21308A.2308.2308 0 0 0 .3425.14511a.23103.23103 0 0 0-.16394.06797c-.0906.09049-.0906.23732 0 .32784l.54585.54578Z"
				/>
				<path
					fill="#000"
					d="m.7244 1.0867 2.52267 2.52265.24659.24651a.23074.23074 0 0 0 .16388.06797.23106.23106 0 0 0 .16394-.06797c.09056-.09049.09056-.23731 0-.32788l-.55114-.55113-1.92458-1.92458L.50639.21308A.2308.2308 0 0 0 .3425.14511a.23103.23103 0 0 0-.16394.06797c-.0906.09049-.0906.23732 0 .32784l.54585.54578Z"
				/>
			{/if}
		</svg>
	</button>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@100..800&display=swap');
	:global(body) {
		margin: 0;
		background-color: rgb(218, 205, 216);
		display: flex;
		justify-content: center;
	}
	svg.game {
		max-width: 100vw;
		max-height: 100dvh;
		width: fit-content;

		background: #474747;
		background: radial-gradient(at center top, #2b2b2b, #010101 100%);
	}
	.left,
	.right {
		position: fixed;
		top: 0;
		bottom: 0;
	}
	.left {
		left: 0;
		right: 50%;
	}
	.right {
		left: 50%;
		right: 0;
	}

	button {
		position: fixed;
		width: 5vmin;
		height: 5vmin;
		top: 2.5vmin;
		left: calc(50% + 17vmin);
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Playpen Sans', sans-serif;
		color: black;
		background-color: white;
		border: none;
		border-radius: 1vmin;
	}
</style>
