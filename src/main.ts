import type { StudentScore } from './types';
import { Popup } from './Popup';

const scores: StudentScore[] = [
	{ score: 0.5, name: 'Maxime' },
	{ score: 0.5, name: 'Ambroise' },
	{ score: 0.5, name: 'Lorenzo' },
	{ score: 0.25, name: 'Alexandre' },
	{ score: 0.25, name: 'Felix' },
	{ score: 0.25, name: 'Elias' },
	{ score: 0.25, name: 'Dylan' },
	{ score: 0.25, name: 'Othemane' },
	{ score: 0.25, name: 'Arthur' },
	{ score: 0, name: 'Les autres' },
];

let currentScores: StudentScore[] = scores;

const popup = new Popup('.popup');
const footerLink = document.querySelector('footer a');
if (footerLink) {
	footerLink.addEventListener('click', e => {
		e.preventDefault();
		popup.open();
	});
}

function displayScores(scoresArray: StudentScore[], limit?: number): void {
	const boardElement = document.querySelector('.board');
	if (!boardElement) {
		return;
	}
	boardElement.innerHTML = '';

	const scoresToDisplay = limit ? scoresArray.slice(0, limit) : scoresArray;

	scoresToDisplay.forEach((student, index) => {
		const li = document.createElement('li');
		const em = document.createElement('em');
		em.textContent = `${index + 1}.`;

		const strong = document.createElement('strong');
		strong.textContent = student.name;

		const span = document.createElement('span');
		span.textContent = String(student.score);

		li.appendChild(em);
		li.appendChild(strong);
		li.appendChild(span);
		boardElement.appendChild(li);
	});
}

displayScores(currentScores);

async function loadScoresFromAPI(): Promise<void> {
	const boardElement = document.querySelector('.board');
	if (!boardElement) {
		return;
	}

	boardElement.classList.add('is-loading');

	try {
		const response = await fetch('./api/scores.json');
		const data: StudentScore[] = await response.json();

		await new Promise(resolve => setTimeout(resolve, 1000));

		boardElement.classList.remove('is-loading');

		currentScores = data;
		displayScores(currentScores);
	} catch (error) {
		console.error('Erreur lors du chargement des scores:', error);
		boardElement.classList.remove('is-loading');
	}
}

const refreshButton = document.querySelector('.refreshButton');
if (refreshButton) {
	refreshButton.addEventListener('click', () => {
		loadScoresFromAPI();
	});
}

const showPodiumLink = document.querySelector('.showPodium');
if (showPodiumLink) {
	showPodiumLink.addEventListener('click', (e) => {
		e.preventDefault();
		displayScores(currentScores, 3);
	});
}

const showFullListLink = document.querySelector('.showFullList');
if (showFullListLink) {
	showFullListLink.addEventListener('click', (e) => {
		e.preventDefault();
		displayScores(currentScores);
	});
}
