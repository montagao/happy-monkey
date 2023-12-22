// src/stores.js
import { writable } from 'svelte/store';

export const generatedImageUrl = writable(""); // This creates a writable store with an empty string as the initial value.
export const isGenerating = writable(false); // This creates a writable store with an empty string as the initial value.
export const isError = writable(false); // This creates a writable store with an empty string as the initial value.

