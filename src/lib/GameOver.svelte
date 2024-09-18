<script>
	import { depth, highScore } from './gameState';
</script>

<text x={15} y={15} text-anchor="middle">Game</text>
<text x={15} y={20} text-anchor="middle">Over</text>
<text class="small" x={15} y={25} text-anchor="middle" font-size="2px">Dein Score</text>
<text class="small" x={15} y={27.5} text-anchor="middle">{$depth.toFixed(0)}</text>
<text class="small" x={15} y={32} text-anchor="middle">Highscore</text>
<text class="small" x={15} y={34.5} text-anchor="middle">{$highScore.toFixed(0)}</text>

<style>
	text {
		fill: white;
		font:
			5.5px 'Playpen Sans',
			sans-serif;
	}
	.small {
		font-size: 1.8px;
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
