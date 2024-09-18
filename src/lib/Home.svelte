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
				/>&nbsp;× {level}</label
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
		font-size: 3vmin;
	}

	div.choice {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1vmin 4vmin;
	}
	h1 {
		padding-top: 2vmin;
		font-size: 8vmin;
		line-height: 120%;
		text-align: center;
	}

	label {
		display: flex;
	}
	label input {
		display: none;
	}
	label::before {
		content: '';
		display: flex;
		border: 0.5vmin solid white;
		width: 4vmin;
		height: 4vmin;
		justify-content: center;
		align-items: center;
		border-radius: 1vmin;
	}
	label:has(input:checked)::before {
		content: '✓';
	}

	button {
    margin-top: 6vmin;
		display: flex;
		font-family: 'Playpen Sans', sans-serif;
    color: black;
    background-color: white;
		border: none;
    border-radius: 1vmin;
    font-size: 6vmin;
    font-weight: bold;
    padding: 0 6vmin;
	}
</style>
