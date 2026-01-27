"use strict";


fetch("/char-practice/charlist").then((resp) => resp.text().then(
function(charlist) {
		function toggleOpacity() {
			let toggle = {
				"show": "hide",
				"hide": "show"
			};
			let charBox = document.getElementById("char-box");
			charBox.className = toggle[charBox.className];
		}


		function prev() {
			let indexBox = document.getElementById("char-index");
			let index = sanatizeIndex(indexBox.value);
			indexBox.value = Math.max(0, index - 1);
			showChar();
		}


		function next() {
			let indexBox = document.getElementById("char-index");
			let index = sanatizeIndex(indexBox.value);
			indexBox.value = Math.min(charlist.length - 1, index + 1);
			showChar();
		}


		function showChar() {
			let charBox = document.getElementById("char-box");
			let indexBox = document.getElementById("char-index");
			charBox.textContent = charlist[sanatizeIndex(indexBox.value)];
		}


		function sanatizeIndex(value) {
			value = parseInt(value);
			if (isNaN(value))
				return 0;
			if (value === null)
				return 0;
			if (value < 0)
				return 0;
			if (value >= charlist.length)
				return charlist.length - 1;
			return value;
		}


		function setupControls() {
			let btnPrev = document.getElementById('btn-prev');
			// Controls already setup.
			if (btnPrev !== null && !btnPrev.disabled)
				return;
			let btnNext = document.getElementById('btn-next');
			let btnToggle = document.getElementById('btn-toggle-vis');
			let indexBox = document.getElementById('char-index');

			btnPrev.addEventListener("click", prev);
			btnNext.addEventListener("click", next);
			btnToggle.addEventListener("click", toggleOpacity);
			indexBox.addEventListener("input", showChar);

			[btnPrev, btnNext, btnToggle, indexBox]
				.map((e) => e.removeAttribute('disabled'));
		}

		setupControls();
		window.addEventListener('DOMContentLoaded', setupControls);
	}));
