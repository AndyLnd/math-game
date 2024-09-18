import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export const rndArray = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export const makeTest = (values: number[]) => {
	const factor1 = Math.ceil(Math.random() * 10);
	const factor2 = rndArray(values);
	const answer = factor1 * factor2;
	return {
		question: `${factor1} × ${factor2}`,
		correct: answer,
		wrong: answer + rndArray([-2, -1, 1, 2])
	};
};

export const animate = (callback: () => void) =>
	onMount(() => {
		let rafId = 0;
		const loop = () => {
			callback();
			rafId = requestAnimationFrame(loop);
		};
		loop();
		return () => cancelAnimationFrame(rafId);
	});

export const onEvent = <K extends keyof WindowEventMap>(
	eventName: K,
	callback: (ev: WindowEventMap[K]) => void
) =>
	onMount(() => {
		window.addEventListener(eventName, callback);
		return () => window.removeEventListener(eventName, callback);
	});

export const jiggle = (lo: number, hi: number) => {
	let value = $state(0);
	animate(() => (value = Math.random() * (hi - lo) + lo));
	return {
		get value() {
			return value;
		}
	};
};

export const fadeTo = (
	start: number,
	end: number,
	timeInMs: number,
	callback: (value: number) => void,
	onEnd?: () => void
) => {
	const startTime = performance.now();
	const [min, max] = start < end ? [start, end] : [end, start];
	const loop = (dt: number) => {
		const diff = dt - startTime;
		const value = start + (end - start) * (diff / timeInMs);
		callback(clamp(value, min, max));
		if (diff < timeInMs) {
			requestAnimationFrame(loop);
		} else {
			onEnd?.();
		}
	};
	loop(startTime);
};

export const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

export const persistWritable = <T>(name: string, defaultValue: T) => {
	const hasLS = typeof localStorage !== 'undefined';
	const stored = hasLS && localStorage.getItem(name);
	const value = (stored ? JSON.parse(stored) : defaultValue) as T;
	const returnWritable = writable(value);
	returnWritable.subscribe((val) => hasLS && localStorage.setItem(name, JSON.stringify(val)));
	return returnWritable;
};
