import { get, writable } from 'svelte/store';
import { fadeTo, makeTest, persistWritable } from './utils.svelte';
import windSound from '$lib/sounds/wind.webm';
import successSound from '$lib/sounds/success.webm';
import failSound from '$lib/sounds/fail.webm';
import owwSound from '$lib/sounds/oww.webm';
import { Howl, Howler } from 'howler';

export enum GAMESTATE {
	HOME,
	INGAME,
	PAUSE,
	GAMEOVER
}

const wind = new Howl({ src: [windSound], loop: true });
const success = new Howl({ src: [successSound], volume: 0.5 });
const fail = new Howl({ src: [failSound], volume: 0.5 });
const oww = new Howl({ src: [owwSound], volume: 0.5 });

export const gameState = writable(GAMESTATE.HOME);

export const isMuted = persistWritable('isMuted', false);

isMuted.subscribe((_isMuted) => Howler.mute(_isMuted));

export const fallSpeed = writable(0.1);
export const playerTop = writable(-5);
export const isGameOver = writable(false);

export const isPlayerLeft = writable(true);

export const currentQuestion = writable('');
export const correctAnswer = writable(0);
export const wrongAnswer = writable(0);
export const isAnswerLeft = writable(false);
export const hasQuestion = writable(false);
export const depth = writable(0);
export const health = writable(3);
export const showMonster = writable(false);
export const isMonsterLeft = writable(false);

export const answerOffset = writable(100);

export const levelChoices = persistWritable('levelChoices', [1, 2, 3]);
export const highScore = persistWritable('highScore', 0);

const generateQuestion = (values: number[]) => {
	const { correct, question, wrong } = makeTest(values);
	currentQuestion.set(question);
	correctAnswer.set(correct);
	wrongAnswer.set(wrong);
	isAnswerLeft.set(Math.random() < 0.5);
	hasQuestion.set(true);
	answerOffset.set(25);
};

export const startGame = () => {
	gameState.set(GAMESTATE.INGAME);
	depth.set(0);
	health.set(3);
	isGameOver.set(false);
	fadeTo(0.1, 0.6, 2000, fallSpeed.set);
	fadeTo(-5, 25, 2000, playerTop.set, () => generateQuestion(get(levelChoices)));
	wind.play();
	wind.fade(0, 0.1, 2000);
	gameLoop();
};

const hurt = () => {
	health.update((h) => h - 1);
	setTimeout(() => oww.play(), 250);
};

const gameLoop = () => {
	const fs = get(fallSpeed) / 4;
	if (hasQuestion) {
		answerOffset.update((ao) => ao - fs / 2);
		if (get(answerOffset) < 0) {
			if (get(isPlayerLeft) !== get(isAnswerLeft)) {
				hurt();
			} else {
				success.play();
			}
			showMonster.set(true);
			isMonsterLeft.set(!get(isAnswerLeft));
			fallSpeed.update((f) => f + 0.01);
			generateQuestion(get(levelChoices));
		}
	}
	depth.update((d) => d + fs);
	if (get(health) === 0) {
		die();
		return;
	}
	requestAnimationFrame(gameLoop);
};

const die = () => {
	highScore.update((h) => Math.max(h, get(depth)));
	fadeTo(get(fallSpeed), 0.1, 2000, fallSpeed.set, () => {
		isGameOver.set(true);
		hasQuestion.set(false);
	});
	setTimeout(() => fail.play(), 500);
	fadeTo(25, 60, 1000, playerTop.set);
	wind.fade(0.1, 0, 2000);
};
