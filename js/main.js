document.addEventListener('DOMContentLoaded', () => {
	// ===== Utility Functions =====
	function closeAllModals() {
		document.querySelectorAll(".modal, .tiny-modal").forEach(modal => {
			modal.classList.remove("show");
			modal.style.display = "none";
		});
		document.body.classList.remove("modal-open");
	}

	function openModal(modal) {
		closeAllModals();
		if (!modal) return;
		modal.classList.add("show");
		modal.style.display = "block";
		document.body.classList.add("modal-open");
		userInteracted = true;
	}

	let userInteracted = false;

	// ===== Modals =====
	const interestModal = document.getElementById("interestModal");
	const callbackModal = document.getElementById("callbackModal");

	const requestCallBtn = document.getElementById("requestCallBtn");
	const interestBtns = document.querySelectorAll("#interestBtn1, #interestBtn2, #openInterest");
	const callbackBtns = document.querySelectorAll("#openCallback");
	const closeBtns = document.querySelectorAll(".modal .close, .tiny-modal .close");

	if (requestCallBtn) requestCallBtn.addEventListener("click", () => openModal(callbackModal));
	interestBtns.forEach(btn => btn.addEventListener("click", () => openModal(interestModal)));
	callbackBtns.forEach(btn => btn.addEventListener("click", () => openModal(callbackModal)));

	closeBtns.forEach(btn => {
		btn.addEventListener("click", (e) => {
			e.target.closest(".modal, .tiny-modal").classList.remove("show");
			e.target.closest(".modal, .tiny-modal").style.display = "none";
			document.body.classList.remove("modal-open");
		});
	});

	document.querySelectorAll(".modal, .tiny-modal").forEach(modal => {
		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				modal.classList.remove("show");
				modal.style.display = "none";
				document.body.classList.remove("modal-open");
			}
		});
	});

	setTimeout(() => {
		const anyOpen = document.querySelector(".modal.show, .tiny-modal.show");
		if (!anyOpen && !userInteracted && interestModal) {
			openModal(interestModal);
		}
	}, 10000);

	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeAllModals();
	});

	// ===== Lightbox =====
	const lightbox = document.getElementById("lightbox");
	const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
	const closeLightboxBtn = lightbox ? lightbox.querySelector(".close") : null;
	const prevBtn = lightbox ? lightbox.querySelector(".prev-btn") : null;
	const nextBtn = lightbox ? lightbox.querySelector(".next-btn") : null;

	// Supports both awards-gallery and all-images-gallery
	const galleryImages = Array.from(document.querySelectorAll(".awards-gallery img, .all-images-gallery img"));
	let currentIndex = 0;

	function openLightbox(index) {
		if (!lightbox) return;
		currentIndex = index;
		lightbox.style.display = "flex";
		lightboxImg.src = galleryImages[currentIndex].src;
	}

	function closeLightbox() {
		if (!lightbox) return;
		lightbox.style.display = "none";
	}

	function showPrev() {
		currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
		openLightbox(currentIndex);
	}

	function showNext() {
		currentIndex = (currentIndex + 1) % galleryImages.length;
		openLightbox(currentIndex);
	}

	if (galleryImages.length > 0 && lightboxImg) {
		galleryImages.forEach((img, index) => {
			img.addEventListener("click", () => openLightbox(index));
		});

		if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
		if (prevBtn) prevBtn.addEventListener("click", e => { e.stopPropagation(); showPrev(); });
		if (nextBtn) nextBtn.addEventListener("click", e => { e.stopPropagation(); showNext(); });

		lightbox.addEventListener("click", (e) => {
			if (e.target === lightbox) closeLightbox();
		});

		document.addEventListener("keydown", (e) => {
			if (lightbox.style.display === "flex") {
				if (e.key === "Escape") closeLightbox();
				if (e.key === "ArrowLeft") showPrev();
				if (e.key === "ArrowRight") showNext();
			}
		});
	}

	// ===== Form Validation =====
	const interestForm = document.getElementById("interestForm");
	if (interestForm) {
		interestForm.addEventListener("submit", function (e) {
			e.preventDefault();
			let valid = true;

			const name = document.getElementById("interestName").value.trim();
			const email = document.getElementById("interestEmail").value.trim();
			const nameError = document.getElementById("interestNameError");
			const emailError = document.getElementById("interestEmailError");

			nameError.textContent = "";
			emailError.textContent = "";

			if (!name) {
				nameError.textContent = "Name is required";
				valid = false;
			}

			if (!email || !/\S+@\S+\.\S+/.test(email)) {
				emailError.textContent = "Valid email is required";
				valid = false;
			}

			if (valid) {
				alert("Interest form submitted!");
				this.reset();
				closeAllModals();
			}
		});
	}

	const callbackForm = document.getElementById("callbackForm");
	if (callbackForm) {
		callbackForm.addEventListener("submit", function (e) {
			e.preventDefault();
			let valid = true;

			const phone = document.getElementById("callbackPhone").value.trim();
			const phoneError = document.getElementById("callbackPhoneError");

			phoneError.textContent = "";

			if (!phone || !/^[0-9]{10}$/.test(phone)) {
				phoneError.textContent = "Valid 10-digit phone number is required";
				valid = false;
			}

			if (valid) {
				alert("Callback requested!");
				this.reset();
				closeAllModals();
			}
		});
	}
});

// Slider for home
const slides = document.querySelectorAll('.bg-slide');
let currentSlide = 0;
const slideInterval = 7000;

function showSlide(index) {
	slides.forEach((slide, i) => {
		slide.classList.remove('active');
		if (i === index) {
			slide.classList.add('active');
		}
	});
}

function nextSlide() {
	currentSlide = (currentSlide + 1) % slides.length;
	showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, slideInterval);
