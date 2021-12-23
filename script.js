import initCanvasAnimation from "./canvas.js";

const canvas = document.querySelector("#canvas1");
initCanvasAnimation(canvas);

// Project image gallery
(function projectImgGallery() {
	const images = document.querySelectorAll("[data-project-img]");
	images.forEach(img => {
		img.addEventListener("click", () => {
			const project = img.getAttribute("data-project-img");
			const imgSrc = img.querySelector("img").getAttribute("src");
			const currentImg = document.querySelector(
				`[data-current-img=${project}]`
			);
			currentImg.setAttribute("src", imgSrc);
		});
	});
})();

// Mobile toggler
(function handleMobileToggler() {
	const toggler = document.querySelector("[data-mobile_nav_toggler]");
	const mobileNav = document.querySelector("[data-mobile_nav]");
	const links = mobileNav.querySelectorAll("a");

	toggler.addEventListener("click", () => {
		mobileNav.classList.toggle("active");
	});

	links.forEach(link => {
		link.addEventListener("click", () => {
			mobileNav.classList.remove("active");
		});
	});
})();
