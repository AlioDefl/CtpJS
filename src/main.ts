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

const popup = new Popup('.popup');
const footerLink = document.querySelector('footer a');
if (footerLink) {
	footerLink.addEventListener('click', (e) => {
		e.preventDefault();
		popup.open();
	});
}

function displayScores(scoresArray: StudentScore[]): void {
	const boardElement = document.querySelector('.board');
	if (!boardElement) {
		return;
	}
	boardElement.innerHTML = '';

	scoresArray.forEach((student, index) => {
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

displayScores(scores);