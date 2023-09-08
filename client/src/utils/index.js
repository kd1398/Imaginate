import { surpriseMePrompts } from "../constants";

export function getRandomPormpt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    // Implement check to check we dont get same random prompt two or three times in a row
    if (randomPrompt === prompt) return getRandomPrompt(prompt);
    return randomPrompt;
}