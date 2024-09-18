<script lang="ts">
	import { startGame, levelChoices } from './gameState';
	const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	const handleClick = (level: number) => {
		if ($levelChoices.includes(level)) {
			$levelChoices = $levelChoices.filter((l) => l !== level);
		} else {
			$levelChoices = [...$levelChoices, level];
		}
	};
</script>

<div class="home">
	<h1>Math<br />Fall</h1>
	<div class="choice">
		{#each levels as level}
			<label
				><input
					type="checkbox"
					checked={$levelChoices.includes(level)}
					onchange={() => handleClick(level)}
				/>× {level}</label
			>
		{/each}
	</div>
	<button onclick={startGame}>Los!</button>
</div>

<style>
	div.home {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		height: 100dvh;
		position: absolute;
		font-family: 'Playpen Sans', sans-serif;
		color: white;
	}

	div.choice {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	h1 {
		padding-top: 2vmin;
		font-size: 8vmin;
		line-height: 120%;
		text-align: center;
	}
</style>
