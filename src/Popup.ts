export class Popup {
	private element: HTMLElement;

	constructor(selector: string) {
		const element = document.querySelector(selector);
		this.element = element as HTMLElement;

		const closeButton = this.element.querySelector('.closeButton');
		if (closeButton) {
			closeButton.addEventListener('click', () => {
				this.close();
			});
		}
	}

	open(): void {
		this.element.classList.add('visible');
	}

	close(): void {
		this.element.classList.remove('visible');
	}
}
