<script>
	import Health from './Health.svelte';
	import Monster from './Monster.svelte';
	import Player from './Player.svelte';
	import {
		currentQuestion,
		isAnswerLeft,
		correctAnswer,
		wrongAnswer,
		hasQuestion,
		answerOffset,
		depth,
		isGameOver,
		highScore,
		gameState,
		GAMESTATE,
		showMonster,
		isMonsterLeft
	} from './gameState';
</script>

<g>
	<Health />
	<text class="small" x={22} y={3} text-anchor="end">{$depth.toFixed(0)} Meter</text>
	{#if $hasQuestion}
		<text class="question" x={15} y={15} text-anchor="middle">{$currentQuestion}</text>
		<text x={8} y={30 + $answerOffset} text-anchor="middle"
			>{$isAnswerLeft ? $correctAnswer : $wrongAnswer}</text
		>
		<text x={22} y={30 + $answerOffset} text-anchor="middle"
			>{$isAnswerLeft ? $wrongAnswer : $correctAnswer}</text
		>
	{/if}
	{#if $isGameOver}
		<text x={15} y={15} text-anchor="middle">Game</text>
		<text x={15} y={20} text-anchor="middle">Over</text>
		<text class="small" x={15} y={25} text-anchor="middle" font-size="2px">Dein Score</text>
		<text class="small" x={15} y={27.5} text-anchor="middle">{$depth.toFixed(0)}</text>
		<text class="small" x={15} y={32} text-anchor="middle">Highscore</text>
		<text class="small" x={15} y={34.5} text-anchor="middle">{$highScore.toFixed(0)}</text>
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<g onclick={() => ($gameState = GAMESTATE.HOME)} role="button">
			<rect x={8} y={38} width={14} height={5} fill="white" rx={0.5} />
			<text x={15} y={41.5} class="back" text-anchor="middle">Zurück</text>
		</g>
	{/if}
	<Player />
	{#if $showMonster}
		<Monster isLeft={$isMonsterLeft} />
	{/if}
	<use xlink:href="#topborder" />
</g>

<style>
	text {
		fill: white;
		font:
			5.5px 'Playpen Sans',
			sans-serif;
	}
	.question {
		transform-origin: 50% 30%;
		animation: bounce 0.3s infinite alternate ease-in;
	}
	.small {
		font-size: 1.8px;
	}
	.back {
		font-size: 3px;
		fill: black;
	}
	@keyframes bounce {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.05);
		}
	}
</style>
