import initCanvasAnimation from "./canvas.js";
const GEOLOCATION_API_KEY = "c77fbeed277844f6984cac026a86b03f";
const BASE_API_URL = "https://portfolio-api123.herokuapp.com/";

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

// Track users that visit this page
(function trackUsers() {
	document.addEventListener("DOMContentLoaded", async () => {
		try {
			const res = await fetch(
				`https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API_KEY}`
			);
			const data = await res.json();
			addDataToDatabase(data);
		} catch (error) {
			console.log(error);
		}
	});

	async function addDataToDatabase(data) {
		const data1 = data;
		try {
			const res = await fetch(`${BASE_API_URL}/api/visits`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(data1),
			});
			const data = await res.json();
		} catch (error) {
			console.log(error);
		}
	}
})();
