const initCanvasAnimation = canvas => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const ctx = canvas.getContext("2d");
	const particlesArr = [];
	let hue = 0;

	const mouse = {
		x: undefined,
		y: undefined,
	};

	document.body.addEventListener("click", e => {
		mouse.x = e.x;
		mouse.y = e.y;
		for (let i = 0; i <= 5; i++) {
			particlesArr.push(new Particle());
		}
	});

	document.body.addEventListener("mousemove", e => {
		mouse.x = e.x;
		mouse.y = e.y;
		for (let i = 0; i <= 1; i++) {
			particlesArr.push(new Particle());
		}
	});

	class Particle {
		constructor() {
			this.x = mouse.x;
			this.y = mouse.y;
			this.size = Math.random() * 3;
			this.speedX = Math.random() * 3 - 1.5;
			this.speedY = Math.random() * 3 - 1.5;
			this.color = `hsl(${hue},100%, 50%)`;
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;
			if (this.size > 0.2) this.size -= 0.1;
		}

		draw() {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	class Symbol {
		constructor(x, y, fontSize, canvasHeight) {
			this.x = x;
			this.y = y;
			this.fontSize = fontSize;
			this.canvasHeight = canvasHeight;
			this.characters =
				"アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			this.symbol = "";
		}

		draw(context) {
			this.symbol = this.characters.charAt(
				Math.floor(Math.random() * this.characters.length)
			);
			context.fillText(
				this.symbol,
				this.x * this.fontSize,
				this.y * this.fontSize
			);
			if (this.y * this.fontSize > this.canvasHeight) {
				this.y = Math.random() * -30;
			} else {
				this.y += 1;
			}
		}
	}

	class Effect {
		constructor(canvas) {
			this.canvasWidth = canvas.width;
			this.canvasHeight = canvas.height;
			this.fontSize = 24;
			this.columns = this.canvasWidth / this.fontSize;
			this.symbolsArr = [];

			this.#initialize();
		}
		#initialize() {
			for (let i = 0; i < this.columns; i++) {
				this.symbolsArr.push(
					new Symbol(i, 0, this.fontSize, this.canvasHeight)
				);
			}
		}

		resize(width, height) {
			this.canvasWidth = width;
			this.canvasHeight = height;
			this.columns = this.canvasWidth / this.fontSize;
			this.symbolsArr = [];
			this.#initialize();
		}
	}

	const effect = new Effect(canvas);
	let lastTime = 0;
	const fps = 30;
	const nextFrame = 1000 / fps;
	let timer = 0;

	const animate = timeStamp => {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;

		hue++;
		handleParticles();

		if (timer > nextFrame) {
			timer = 0;

			ctx.fillStyle = "rgba(0,0,0,0.3)";
			ctx.textAlign = "center";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			// ctx.fillStyle = "#c79426";
			ctx.fillStyle = "blue";
			ctx.font = effect.fontSize + "px monospace";
			effect.symbolsArr.forEach(symbol => symbol.draw(ctx));
		} else {
			timer += deltaTime;
		}

		requestAnimationFrame(animate);
	};

	animate(0);

	window.addEventListener("resize", () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		effect.resize(canvas.width, canvas.height);
	});

	function handleParticles() {
		for (let i = 0; i < particlesArr.length; i++) {
			particlesArr[i].update();
			particlesArr[i].draw();
			for (let j = i; j < particlesArr.length; j++) {
				const dx = particlesArr[i].x - particlesArr[j].x;
				const dy = particlesArr[i].y - particlesArr[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 100) {
					ctx.beginPath();
					ctx.strokeStyle = particlesArr[i].color;
					ctx.lineWidth = particlesArr[i].size / 10;
					ctx.moveTo(particlesArr[i].x, particlesArr[i].y);
					ctx.lineTo(particlesArr[j].x, particlesArr[j].y);
					ctx.stroke();
				}
			}
			if (particlesArr[i].size < 0.3) particlesArr.splice(i, 1);
		}
	}
};

export default initCanvasAnimation;
