import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const DEFAULT_WORDS = [
	{ text: "Friendly", weight: 5 },
	{ text: "Driven", weight: 5 },
	{ text: "Spirited", weight: 6 },
	{ text: "Vibrant", weight: 5 },
	{ text: "Fun", weight: 6 },
	{ text: "Effort", weight: 4 },
	{ text: "Hardworking", weight: 5 },
	{ text: "Joy", weight: 4 },
	{ text: "Challenging", weight: 3 },
	{ text: "Resilient", weight: 5 },
	{ text: "Perseverant", weight: 3 },
	{ text: "Welcoming", weight: 6 },
	{ text: "Inclusive", weight: 5 },
	{ text: "Exciting", weight: 4 },
	{ text: "Passion", weight: 5 },
	{ text: "Friendship", weight: 6 },
	{ text: "Tight-knit", weight: 4 },
	{ text: "Determination", weight: 4 },
	{ text: "Awesome", weight: 4 },
	{ text: "Communication", weight: 4 },
	{ text: "Unique", weight: 3 },
	{ text: "Discipline", weight: 4 },
];

const FEATURED_WORD = "Lindbergh Ultimate";

const PALETTE = {
	green: "#1c6a37",
	dark: "#123d24",
	deep: "#0d4a28",
	yellow: "#fbcc00",
	cream: "#f9f9f9",
	ink: "#1a1a1a",
};

// Every style pairs a readable font color with a contrasting palette color
// that wraps the word.
const WORD_STYLES = [
	{ font: PALETTE.yellow, surround: PALETTE.dark },
	{ font: PALETTE.cream, surround: PALETTE.dark },
	{ font: PALETTE.dark, surround: PALETTE.yellow },
	{ font: PALETTE.ink, surround: PALETTE.yellow },
	{ font: PALETTE.yellow, surround: PALETTE.deep },
	{ font: PALETTE.cream, surround: PALETTE.deep },
	{ font: PALETTE.deep, surround: PALETTE.yellow },
	{ font: PALETTE.green, surround: PALETTE.cream },
	{ font: PALETTE.dark, surround: PALETTE.cream },
	{ font: PALETTE.deep, surround: PALETTE.cream },
	{ font: PALETTE.ink, surround: PALETTE.cream },
	{ font: PALETTE.yellow, surround: PALETTE.ink },
];

const SIZE_JITTERS = [0.82, 0.9, 1, 1.1, 1.18];
const COLLISION_PADDING = 1;
const SAFE_MARGIN = 2;

function mulberry32(seed) {
	let value = seed;
	return () => {
		value |= 0;
		value = (value + 0x6d2b79f5) | 0;
		let result = Math.imul(value ^ (value >>> 15), 1 | value);
		result = (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result;
		return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
	};
}

function hashText(text) {
	let hash = 2166136261;
	for (let index = 0; index < text.length; index += 1) {
		hash ^= text.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}

function getWordStyle(text, seed, variant) {
	const index = (hashText(`${text}-${variant}`) + seed) % WORD_STYLES.length;
	return WORD_STYLES[index];
}

function getBaseSize(word, minFont, maxFont, minWeight, maxWeight, seed) {
	const sizeIndex = (hashText(`${word.text}-${word.variant}`) + seed) % SIZE_JITTERS.length;
	const weightRatio =
		maxWeight === minWeight
			? 0.5
			: (word.weight - minWeight) / (maxWeight - minWeight);
	const baseSize = minFont + weightRatio * (maxFont - minFont);
	return Math.round(baseSize * SIZE_JITTERS[sizeIndex]);
}

function getFeaturedConfig(width) {
	const fontSize =
		width < 640
			? Math.max(26, Math.min(34, width * 0.1))
			: Math.max(34, Math.min(48, width * 0.06));
	const lines = width < 640 ? ["Lindbergh", "Ultimate"] : [FEATURED_WORD];
	return { fontSize, lines };
}

function expandWords(words, copies) {
	return words
		.filter((word) => word.text !== FEATURED_WORD)
		.flatMap((word) =>
			Array.from({ length: copies }, (_, variant) => ({
				...word,
				variant,
				key: `${word.text}-${variant}`,
			}))
		);
}

function WordCloudBackdrop() {
	return (
		<div aria-hidden="true" className="word-cloud-backdrop">
			<span className="word-cloud-blob word-cloud-blob--yellow" />
			<span className="word-cloud-blob word-cloud-blob--emerald" />
			<span className="word-cloud-blob word-cloud-blob--cream" />
			<span className="word-cloud-vignette" />
		</div>
	);
}

function layoutCloud(words, width, height, seed, fontsReady) {
	if (!width || !height || !fontsReady) return [];

	const context = document.createElement("canvas").getContext("2d");
	if (!context) return [];

	const measure = (text, fontSize) => {
		context.font = `700 ${fontSize}px Graduate, Georgia, serif`;
		return context.measureText(text).width;
	};

	const random = mulberry32(seed);
	const orderedWords = [...words].sort(
		(first, second) =>
			second.weight - first.weight || first.text.localeCompare(second.text)
	);
	const weights = words.map((word) => word.weight);
	const minWeight = Math.min(...weights);
	const maxWeight = Math.max(...weights);
	const minFont = width < 380 ? 7 : width < 640 ? 9 : 11;
	const maxFont = width < 380 ? 18 : width < 640 ? 22 : 28;

	const placedWords = [];
	const occupied = [];
	const centerX = width / 2;
	const centerY = height / 2;

	// Keep every word inside a rounded rectangle so the yellow border never
	// cuts a word off.
	const shapeLeft = SAFE_MARGIN;
	const shapeTop = SAFE_MARGIN;
	const shapeRight = width - SAFE_MARGIN;
	const shapeBottom = height - SAFE_MARGIN;
	const shapeWidth = shapeRight - shapeLeft;
	const shapeHeight = shapeBottom - shapeTop;
	const shapeRadius = Math.min(16, Math.min(shapeWidth, shapeHeight) / 2);
	const innerLeft = shapeLeft + shapeRadius;
	const innerRight = shapeRight - shapeRadius;
	const innerTop = shapeTop + shapeRadius;
	const innerBottom = shapeBottom - shapeRadius;

	const insideShape = (x, y) => {
		if (x < shapeLeft || x > shapeRight || y < shapeTop || y > shapeBottom) {
			return false;
		}
		const nearestX = Math.max(innerLeft, Math.min(x, innerRight));
		const nearestY = Math.max(innerTop, Math.min(y, innerBottom));
		const dx = x - nearestX;
		const dy = y - nearestY;
		return dx * dx + dy * dy <= shapeRadius * shapeRadius;
	};

	const fitsShape = (candidate) =>
		insideShape(candidate.left, candidate.top) &&
		insideShape(candidate.right, candidate.top) &&
		insideShape(candidate.left, candidate.bottom) &&
		insideShape(candidate.right, candidate.bottom);

	const featured = getFeaturedConfig(width);
	const featuredWidth =
		Math.min(
			width * 0.9,
			Math.max(...featured.lines.map((line) => measure(line, featured.fontSize))) + 16
		);
	const featuredHeight = featured.fontSize * featured.lines.length * 1.05 + 12;
	const featuredZone = {
		left: (width - featuredWidth) / 2 - 4,
		top: (height - featuredHeight) / 2 - 4,
		right: (width + featuredWidth) / 2 + 4,
		bottom: (height + featuredHeight) / 2 + 4,
	};

	const intersects = (first, second) =>
		!(
			first.right < second.left ||
			first.left > second.right ||
			first.bottom < second.top ||
			first.top > second.bottom
		);

	const collides = (candidate) =>
		intersects(candidate, featuredZone) || occupied.some((area) => intersects(candidate, area));

	const getMetrics = (word, fontSize) => {
		const padX = Math.max(3, Math.round(fontSize * 0.22));
		const padY = Math.max(1, Math.round(fontSize * 0.1));
		return {
			padX,
			padY,
			wordWidth: measure(word.text, fontSize) + padX * 2,
			wordHeight: fontSize * 1.2 + padY * 2,
		};
	};

	const tryPlacement = (word, x, y, fontSize, style) => {
		const metrics = getMetrics(word, fontSize);
		const candidate = {
			left: x - COLLISION_PADDING,
			top: y - COLLISION_PADDING,
			right: x + metrics.wordWidth + COLLISION_PADDING,
			bottom: y + metrics.wordHeight + COLLISION_PADDING,
		};

		if (!fitsShape(candidate) || collides(candidate)) {
			return null;
		}

		return {
			candidate,
			placement: {
				...word,
				x,
				y,
				fontSize,
				...metrics,
				...style,
			},
		};
	};

	for (const word of orderedWords) {
		const style = getWordStyle(word.text, seed, word.variant);
		const baseSize = getBaseSize(
			word,
			minFont,
			maxFont,
			minWeight,
			maxWeight,
			seed
		);
		let placement = null;

		for (let shrink = 0; shrink <= 16 && !placement; shrink += 1) {
			const fontSize = Math.max(minFont - 3, baseSize - shrink);

			for (let step = 0; step < 1200; step += 1) {
				const angle = random() * Math.PI * 2 + step * 0.55;
				const radius = step * 1.8;
				const jitterX = (random() - 0.5) * 4;
				const jitterY = (random() - 0.5) * 4;
				const metrics = getMetrics(word, fontSize);
				const x = centerX + Math.cos(angle) * radius - metrics.wordWidth / 2 + jitterX;
				const y = centerY + Math.sin(angle) * radius - metrics.wordHeight / 2 + jitterY;
				const result = tryPlacement(word, x, y, fontSize, style);

				if (result) {
					placement = result.placement;
					occupied.push(result.candidate);
					break;
				}
			}
		}

		// Small words can fall into gaps that the spiral misses. A dense grid scan
		// guarantees every submitted word appears in the cloud.
		if (!placement) {
			const fontSize = Math.max(6, minFont - 3);
			const metrics = getMetrics(word, fontSize);

			for (
				let y = SAFE_MARGIN;
				y <= height - metrics.wordHeight - SAFE_MARGIN && !placement;
				y += 4
			) {
				for (
					let x = SAFE_MARGIN;
					x <= width - metrics.wordWidth - SAFE_MARGIN;
					x += 4
				) {
					const result = tryPlacement(word, x, y, fontSize, style);
					if (result) {
						placement = result.placement;
						occupied.push(result.candidate);
						break;
					}
				}
			}
		}

		if (placement) placedWords.push(placement);
	}

	return placedWords;
}

function createLayout(words, width, height, seed, fontsReady) {
	if (!width || !height || !fontsReady) return [];

	const desiredCopies = width < 480 ? 2 : 3;

	for (let copies = desiredCopies; copies >= 2; copies -= 1) {
		const cloudWords = expandWords(words, copies);
		const layout = layoutCloud(cloudWords, width, height, seed, fontsReady);
		if (layout.length === cloudWords.length) return layout;
	}

	return [];
}

export default function WordCloud({ words = DEFAULT_WORDS, className = "" }) {
	const containerRef = useRef(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [seed, setSeed] = useState(2026);
	const [fontsReady, setFontsReady] = useState(false);

	useEffect(() => {
		let active = true;

		const loadFonts = async () => {
			try {
				// The cloud measures text before its own words are in the DOM, so
				// explicitly load the display face instead of relying on ready alone.
				await document.fonts?.load('700 16px "Graduate"');
				await document.fonts?.ready;
			} catch {
				// Fall back to the serif stack if the webfont cannot load.
			} finally {
				if (active) setFontsReady(true);
			}
		};

		loadFonts();
		return () => {
			active = false;
		};
	}, []);

	useLayoutEffect(() => {
		const element = containerRef.current;
		if (!element) return undefined;

		const updateDimensions = () => {
			const width = element.clientWidth;
			const height = element.clientHeight;
			setDimensions((current) =>
				current.width === width && current.height === height
					? current
					: { width, height }
			);
		};

		updateDimensions();
		const observer = new ResizeObserver(updateDimensions);
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	const layout = useMemo(
		() =>
			createLayout(
				words,
				dimensions.width,
				dimensions.height,
				seed,
				fontsReady
			),
		[words, dimensions.width, dimensions.height, seed, fontsReady]
	);

	const featured = useMemo(
		() => getFeaturedConfig(dimensions.width || 320),
		[dimensions.width]
	);

	const accessibleLabel = useMemo(
		() =>
			`${FEATURED_WORD} word cloud with repeated words families use to describe the program: ${words
				.map((word) => word.text)
				.join(", ")}.`,
		[words]
	);

	return (
		<div className={className}>
			<div
				ref={containerRef}
				role="img"
				aria-label={accessibleLabel}
				data-testid="word-cloud"
				className="relative w-full mt-6 overflow-hidden border-2 isolate h-150 rounded-2xl border-lu-yellow sm:h-125"
			>
				<WordCloudBackdrop />

				<div
					aria-hidden="true"
					className="absolute inset-0 flex flex-col items-center justify-center font-bold text-center pointer-events-none select-none font-display"
					style={{
						color: PALETTE.deep,
						fontSize: `${featured.fontSize}px`,
						lineHeight: 1.05,
						opacity: 0.32,
						zIndex: 1,
					}}
				>
					{featured.lines.map((line) => (
						<span key={line} className="whitespace-nowrap">
							{line}
						</span>
					))}
				</div>

				{layout.length === 0 && (
					<span
						aria-hidden="true"
						className="absolute inset-0 z-20 flex items-center justify-center text-sm text-lu-cream/55"
					>
						Building word cloud…
					</span>
				)}

				{layout.map((word) => (
					<span
						key={word.key}
						aria-hidden="true"
						className="absolute z-10 block font-bold transition-all duration-500 ease-out rounded-full shadow-sm whitespace-nowrap font-display hover:brightness-110"
						style={{
							left: word.x,
							top: word.y,
							padding: `${word.padY}px ${word.padX}px`,
							color: word.font,
							backgroundColor: word.surround,
							fontSize: `${word.fontSize}px`,
							lineHeight: 1,
							zIndex: 10,
						}}
					>
						{word.text}
					</span>
				))}
			</div>

			<div className="flex flex-col items-center gap-3 mt-4 sm:flex-row sm:justify-between">
				<p className="text-xs text-center text-lu-cream/55 sm:text-left">
					Repeated words from families, surrounding our name.
				</p>
				<button
					type="button"
					aria-label="Shuffle word sizes, colors, and layout"
					data-testid="word-cloud-shuffle"
					onClick={() => setSeed((current) => current + 1)}
					className="px-4 py-2 text-sm font-bold transition-colors border rounded-full border-lu-yellow/60 text-lu-yellow hover:bg-lu-yellow hover:text-lu-green"
				>
					Shuffle cloud
				</button>
			</div>
		</div>
	);
}
