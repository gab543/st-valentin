// js/ui.js
export function showStep(stepId) {
    document.querySelectorAll('.step-section').forEach(s => s.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
}

export const getCharacterSVG = (state = 'normal') => {
    const isSad = state === 'sad';
    return `
    <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <!-- Ears -->
        <circle cx="25" cy="25" r="12" fill="#fecdd3" />
        <circle cx="75" cy="25" r="12" fill="#fecdd3" />
        <circle cx="25" cy="25" r="7" fill="#fda4af" />
        <circle cx="75" cy="25" r="7" fill="#fda4af" />
        <!-- Body/Head -->
        <circle cx="50" cy="55" r="40" fill="#fecdd3" />
        <!-- Eyes -->
        ${isSad ? `
            <path d="M 30 50 L 40 45 M 60 45 L 70 50" stroke="#4c0519" stroke-width="3" fill="none" />
        ` : `
            <circle cx="35" cy="48" r="4" fill="#4c0519" />
            <circle cx="65" cy="48" r="4" fill="#4c0519" />
        `}
        <!-- Blush -->
        <circle cx="28" cy="58" r="5" fill="#fda4af" opacity="0.6" />
        <circle cx="72" cy="58" r="5" fill="#fda4af" opacity="0.6" />
        <!-- Mouth -->
        <path d="${isSad ? 'M 45 65 Q 50 60 55 65' : 'M 45 62 Q 50 68 55 62'}" fill="none" stroke="#4c0519" stroke-width="2.5" stroke-linecap="round" />
        <!-- Small Heart on belly -->
        <path d="M 50 82 C 45 78 42 82 42 85 C 42 88 50 92 50 92 C 50 92 58 88 58 85 C 58 82 55 78 50 82" fill="#f43f5e" />
    </svg>
    `;
};
