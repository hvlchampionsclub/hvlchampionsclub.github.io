document.addEventListener('DOMContentLoaded', () => {
	const interestModal = document.getElementById("interestModal");
	const callbackModal = document.getElementById("callbackModal");

	const requestCallBtn = document.getElementById("requestCallBtn");
	const interestBtns = document.querySelectorAll("#interestBtn1, #interestBtn2");
	const closeBtns = document.querySelectorAll(".modal .close, .tiny-modal .close");

	let userInteracted = false;

	function closeAllModals() {
		document.querySelectorAll(".modal, .tiny-modal").forEach(modal => {
			modal.classList.remove("show");
		});
		document.body.classList.remove("modal-open");
	}

	function openModal(modal) {
		closeAllModals();
		modal.classList.add("show");
		document.body.classList.add("modal-open");
		userInteracted = true;
	}

	if (requestCallBtn) {
		requestCallBtn.addEventListener("click", () => openModal(callbackModal));
	}
	interestBtns.forEach(btn => {
		btn.addEventListener("click", () => openModal(interestModal));
	});

	closeBtns.forEach(btn => {
		btn.addEventListener("click", (e) => {
			e.target.closest(".modal, .tiny-modal").classList.remove("show");
			document.body.classList.remove("modal-open");
		});
	});

	document.querySelectorAll(".modal, .tiny-modal").forEach(modal => {
		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				modal.classList.remove("show");
				document.body.classList.remove("modal-open");
			}
		});
	});

	setTimeout(() => {
		const anyOpen = document.querySelector(".modal.show, .tiny-modal.show");
		if (!anyOpen && !userInteracted) {
			openModal(interestModal);
		}
	}, 10000);

	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeAllModals();
		}
	});
});