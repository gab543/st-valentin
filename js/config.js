// js/config.js
export const urlParams = new URLSearchParams(window.location.search);

export const playerName = urlParams.get('name') || "toi";
export const gender = urlParams.get('gender') || "x";
export const from = urlParams.get('sender') || "ton admirateur secret";

export let crushWord = "mon amour";
if (gender === "m") crushWord = "mon valentin";
if (gender === "f") crushWord = "ma valentine";
