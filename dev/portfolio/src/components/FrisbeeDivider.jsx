import React, { useEffect, useRef } from "react";

/**
 * An animated pixel-art frisbee that flies left → right, trailing a few
 * sparks. Drop it in wherever you would otherwise put a horizontal rule.
 *
 * <FrisbeeDivider />                 // on the green sections
 * <FrisbeeDivider tone="light" />    // on cream/white sections
 * <FrisbeeDivider height={120} />    // taller band
 */
const TONES = {
	dark: {
		trail: ["#fff8d8", "#fbcc00", "#c19a00", "#7d7a3f"],
		sparkle: "#fff8d8",
	},
	light: {
		trail: ["#123d24", "#1c6a37", "#4f9364", "#a9c9ad"],
		sparkle: "#fbcc00",
	},
};

const DISC = {
	outline: [16, 56, 34],
	rim: [251, 204, 0],
	rimLight: [255, 232, 134],
	rimDark: [204, 160, 0],
	face: [
		[255, 253, 244],
		[252, 245, 226],
		[240, 228, 201],
		[216, 201, 171],
	],
	tick: [24, 74, 44],
	emblem: [28, 106, 55],
};

const BAYER = [
	[0, 8, 2, 10],
	[12, 4, 14, 6],
	[3, 11, 1, 9],
	[15, 7, 13, 5],
];
const bayer = (x, y) => (BAYER[y & 3][x & 3] + 0.5) / 16;

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const mix = (a, b, t) => [
	Math.round(a[0] + (b[0] - a[0]) * t),
	Math.round(a[1] + (b[1] - a[1]) * t),
	Math.round(a[2] + (b[2] - a[2]) * t),
];

const FLIGHT = 4.2;
const PERIOD = 5.2;

const FrisbeeDivider = ({ height = 80, tone = "dark", className = "" }) => {
	const canvasRef = useRef(null);
	const wrapRef = useRef(null);

	useEffect(() => {
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		if (!wrap || !canvas) return;
		const ctx = canvas.getContext("2d");
		const palette = TONES[tone] || TONES.dark;

		let W = 240;
		let IH = 40;
		let clock = 0;
		let last = performance.now();
		let raf = 0;
		let visible = true;
		let trail = [];
		let sparkles = [];
		let discCanvas = document.createElement("canvas");
		let discCtx = discCanvas.getContext("2d");
		let discData = null;
		let discSize = 0;

		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let reduced = motion.matches;

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const cssW = Math.max(1, rect.width);
			const cssH = Math.max(1, rect.height);

			// Keep chunky pixels: ~2 CSS px per scene pixel, never finer than 1.
			const scale = Math.max(2, Math.round(cssH / 44));
			IH = Math.max(28, Math.round(cssH / scale));
			W = Math.max(120, Math.round(cssW / scale));

			canvas.width = W;
			canvas.height = IH;

			const rx = IH * 0.245;
			discSize = Math.ceil(rx * 2) + 6;
			discCanvas.width = discSize;
			discCanvas.height = discSize;
			discCtx = discCanvas.getContext("2d");
			discData = discCtx.createImageData(discSize, discSize);

			trail = [];
			sparkles = [];
			draw(0);
		};

		const discPos = (p) => {
			const travel = 1 - Math.pow(1 - p, 2.2);
			const x = -IH * 0.7 + (W + IH * 1.4) * travel;
			const lift = Math.sin(p * Math.PI);
			const y =
				IH * 0.56 - lift * IH * 0.2 +
				Math.sin(p * 23 + clock * 2.2) * IH * 0.012;
			return { x, y };
		};

		const drawDisc = (x, y, spin) => {
			const S = discSize;
			const rx = IH * 0.245;
			const ry = IH * 0.098;
			const tilt = -0.14 + Math.sin(clock * 1.9) * 0.05;
			const cosT = Math.cos(tilt);
			const sinT = Math.sin(tilt);
			const mid = S / 2;

			discData.data.fill(0);

			const setPx = (px, py, c) => {
				if (px < 0 || py < 0 || px >= S || py >= S) return;
				const i = (py * S + px) * 4;
				discData.data[i] = c[0];
				discData.data[i + 1] = c[1];
				discData.data[i + 2] = c[2];
				discData.data[i + 3] = 255;
			};

			for (let py = 0; py < S; py++) {
				for (let px = 0; px < S; px++) {
					const dx = px + 0.5 - mid;
					const dy = py + 0.5 - mid;
					const u = dx * cosT + dy * sinT;
					const v = -dx * sinT + dy * cosT;
					const d = (u * u) / (rx * rx) + (v * v) / (ry * ry);
					if (d > 1) continue;

					const rr = Math.sqrt(d);
					const vt = (v / ry + 1) / 2;
					let c;

					if (rr > 0.9) {
						/* dark outline keeps the disc readable on green or cream */
						c = DISC.outline;
					} else if (rr > 0.72) {
						/* yellow rim */
						if (vt < 0.3) c = DISC.rimLight;
						else if (vt > 0.74) c = DISC.rimDark;
						else c = DISC.rim;

						// small gloss glint on the upper-left rim
						if (vt < 0.26 && u < -rx * 0.28) c = DISC.face[0];
					} else {
						/* cream face, dithered into bands */
						const shade = clamp(
							Math.floor(vt * 3.4 + (bayer(px, py) - 0.5) * 1.1),
							0,
							3
						);
						c = DISC.face[shade];

						// specular sweep toward the upper left
						if (u < -rx * 0.08 && v < -ry * 0.1 && rr > 0.34 && rr < 0.7) {
							c = DISC.face[0];
						}

						// concentric groove
						if (rr > 0.52 && rr < 0.57) c = mix(c, DISC.face[2], 0.7);

						// center emblem
						if (Math.abs(u) < rx * 0.07 && Math.abs(v) < ry * 0.13) {
							c = DISC.emblem;
						}
					}
					setPx(px, py, c);
				}
			}

			// rim marks: they orbit with the spin, selling the rotation
			for (let k = 0; k < 3; k++) {
				const a = spin + (k * Math.PI * 2) / 3;
				const u = Math.cos(a) * rx * 0.81;
				const v = Math.sin(a) * ry * 0.81;
				const tx = Math.round(mid + (u * cosT - v * sinT));
				const ty = Math.round(mid + (u * sinT + v * cosT));
				setPx(tx, ty, DISC.tick);
				setPx(tx + 1, ty, DISC.tick);
			}

			discCtx.putImageData(discData, 0, 0);

			const ox = Math.round(x - S / 2);
			const oy = Math.round(y - S / 2);
			ctx.drawImage(discCanvas, ox, oy);
		};

		const spawnFX = (pos, dt) => {
			const nose = IH * 0.5;
			const count = Math.max(1, Math.round(dt * 200));
			for (let i = 0; i < count; i++) {
				trail.push({
					x: pos.x - nose + (Math.random() - 0.5) * IH * 0.26,
					y: pos.y + (Math.random() - 0.5) * IH * 0.12,
					life: 0,
					max: 0.26 + Math.random() * 0.34,
				});
			}
			if (Math.random() < 0.42) {
				sparkles.push({
					x: pos.x - nose - Math.random() * IH * 0.5,
					y: pos.y + (Math.random() - 0.5) * IH * 0.34,
					life: 0,
					max: 0.36 + Math.random() * 0.3,
				});
			}
		};

		const updateFX = (dt) => {
			for (const p of trail) {
				p.life += dt;
				p.x -= dt * IH * 0.55;
			}
			for (const s of sparkles) s.life += dt;
			trail = trail.filter((p) => p.life < p.max);
			sparkles = sparkles.filter((s) => s.life < s.max);
		};

		const drawFX = () => {
			for (const p of trail) {
				const k = p.life / p.max;
				const c = palette.trail[clamp(Math.floor(k * 4), 0, 3)];
				ctx.globalAlpha = 1 - k * 0.85;
				ctx.fillStyle = c;
				ctx.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
			}
			for (const s of sparkles) {
				const k = s.life / s.max;
				const a = 1 - k;
				ctx.globalAlpha = a;
				ctx.fillStyle = palette.sparkle;
				const x = Math.round(s.x);
				const y = Math.round(s.y);
				ctx.fillRect(x, y, 1, 1);
				if (a > 0.5) {
					if (k < 0.25) {
						ctx.fillRect(x - 1, y, 1, 1);
						ctx.fillRect(x + 1, y, 1, 1);
					}
					if (k < 0.4) {
						ctx.fillRect(x, y - 1, 1, 1);
						ctx.fillRect(x, y + 1, 1, 1);
					}
				}
			}
			ctx.globalAlpha = 1;
		};

		const draw = (dt) => {
			ctx.clearRect(0, 0, W, IH);

			const t = clock % PERIOD;
			const p = reduced ? 0.46 : t <= FLIGHT ? t / FLIGHT : null;

			if (p !== null) {
				const pos = discPos(p);
				if (!reduced) {
					spawnFX(pos, dt);
					updateFX(dt);
				}
				drawFX();
				drawDisc(pos.x, pos.y, reduced ? 0.8 : clock * 9);
			}
		};

		const frame = (now) => {
			raf = requestAnimationFrame(frame);
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;
			if (!visible || document.hidden || reduced) return;
			clock += dt;
			draw(dt);
		};

		const io = new IntersectionObserver(
			(entries) => {
				visible = entries[0]?.isIntersecting ?? true;
			},
			{ threshold: 0 }
		);
		io.observe(wrap);

		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		const onMotion = () => {
			reduced = motion.matches;
			clock = reduced ? FLIGHT * 0.46 : clock;
			if (reduced) draw(0);
		};
		motion.addEventListener("change", onMotion);

		resize();
		if (!reduced) raf = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
			ro.disconnect();
			motion.removeEventListener("change", onMotion);
		};
	}, [tone]);

	return (
		<div
			ref={wrapRef}
			aria-hidden="true"
			className={`pointer-events-none relative w-full select-none ${className}`}
			style={{ height }}
		>
			<canvas
				ref={canvasRef}
				className="block h-full w-full"
				style={{ imageRendering: "pixelated" }}
			/>
		</div>
	);
};

export default FrisbeeDivider;
