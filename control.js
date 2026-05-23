"use strict";


fetch("/char-practice/segments").then((resp) => resp.text().then(
//fetch("/segments").then((resp) => resp.text().then(
	function(segments) {
		segments = segments.split(/\r?\n/);
		function toggleOpacity() {
			let toggle = {
				"show": "hide",
				"hide": "show"
			};
			let dispBox = document.getElementById("disp-box");
			dispBox.className = toggle[dispBox.className];
		}


		function prev() {
			let indexBox = document.getElementById("disp-index");
			let index = sanatizeIndex(indexBox.value);
			indexBox.value = Math.max(0, index - 1);
			updateDisplay();
		}


		function next() {
			let indexBox = document.getElementById("disp-index");
			let index = sanatizeIndex(indexBox.value);
			indexBox.value = Math.min(segments.length - 1, index + 1);
			updateDisplay();
		}


		function updateDisplay() {
			let dispBox = document.getElementById("disp-box");
			let indexBox = document.getElementById("disp-index");
			dispBox.textContent = segments[sanatizeIndex(indexBox.value)];
		}


		function sanatizeIndex(value) {
			value = parseInt(value);
			if (isNaN(value))
				return 0;
			if (value === null)
				return 0;
			if (value < 0)
				return 0;
			if (value >= segments.length)
				return segments.length - 1;
			return value;
		}


		function setupControls() {
			let btnPrev = document.getElementById('btn-prev');
			// Controls already setup.
			if (btnPrev !== null && !btnPrev.disabled)
				return;
			let btnNext = document.getElementById('btn-next');
			let btnToggle = document.getElementById('btn-toggle-vis');
			let indexBox = document.getElementById('disp-index');

			btnPrev.addEventListener("click", prev);
			btnNext.addEventListener("click", next);
			btnToggle.addEventListener("click", toggleOpacity);
			indexBox.addEventListener("input", updateDisplay);

			[btnPrev, btnNext, btnToggle, indexBox]
				.map((e) => e.removeAttribute('disabled'));
		}

		setupControls();
		window.addEventListener('DOMContentLoaded', setupControls);
	}));
