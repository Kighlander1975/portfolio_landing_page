// modal-mail.js

document.addEventListener('DOMContentLoaded', function () {
	// --- Mail entschlüsseln & anzeigen ---
	function rot13(s) {
		return s.replace(/[a-zA-Z]/g, function (c) {
			return String.fromCharCode(
				(c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13)
					? c : c - 26
			);
		});
	}
	const encoded = "xnv.nxxreznaa@xvtuynaqre.qr";
	const mail = rot13(encoded);

	// Mail in alle vorgesehenen Container einfügen
	const mailContainers = ["mail", "impressumMail", "policyMail"];
	mailContainers.forEach(id => {
		const el = document.getElementById(id);
		if (el) {
			el.innerHTML = '<a href="mailto:' + mail + '">' + mail + '</a>';
		}
	});

	// Copy-Mail-Button
	const copyMailBtn = document.getElementById("copyMailBtn");
	if (copyMailBtn) {
		copyMailBtn.onclick = function () {
			navigator.clipboard.writeText(mail);

			// Feedback anzeigen
			const feedback = document.getElementById("copyFeedback");
			if (feedback) {
				feedback.style.opacity = "1";
				feedback.textContent = "E-Mail kopiert!";
				clearTimeout(feedback._timeout);
				feedback._timeout = setTimeout(() => {
					feedback.style.opacity = "0";
				}, 2000);
			}
		};
	}

	// --- Allgemeine Modal-Logik ---
	let currentOpenModal = null;

	// Öffnen-Links: <a data-modal="MODAL-ID">
	document.querySelectorAll('[data-modal]').forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const modalId = this.getAttribute('data-modal');
			const modal = document.getElementById(modalId);
			if (modal) {
				modal.hidden = false;
				currentOpenModal = modal;
				// Fokus auf Close-Button im Modal
				const closeBtn = modal.querySelector('.modal-close');
				if (closeBtn) closeBtn.focus();
			}
		});
	});

	// Schließen per Button (alle .modal-close)
	document.querySelectorAll('.modal-close').forEach(btn => {
		btn.addEventListener('click', function () {
			const modal = btn.closest('.modal-overlay');
			if (modal) {
				modal.hidden = true;
				if (modal === currentOpenModal) currentOpenModal = null;
			}
		});
	});

	// Schließen per Escape
	window.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && currentOpenModal && !currentOpenModal.hidden) {
			currentOpenModal.hidden = true;
			currentOpenModal = null;
		}
	});

	// Schließen durch Klick auf Overlay (außerhalb des Modals)
	document.querySelectorAll('.modal-overlay').forEach(modal => {
		modal.addEventListener('click', function (e) {
			if (e.target === modal) {
				modal.hidden = true;
				if (modal === currentOpenModal) currentOpenModal = null;
			}
		});
	});
});
