import React from "react";
import circle from "../assets/circle.png";
import coachOne from "../assets/coach-1.jpg";
import coachTwo from "../assets/coach-2.jpg";
import coachThree from "../assets/coach-3.jpg";
import coachFour from "../assets/coach-4.jpg";

const COACHES = [
	{ name: "Morgan Blake", role: "Boys Ultimate Coach", image: coachTwo },
	{ name: "Taylor \"T\" Quinn", role: "Gxrls Team Coach", image: coachOne },
	{ name: "Casey \"Brooks\" Brooks", role: "Boys Team Coach", image: coachThree },
	{ name: "Jordan Ellis", role: "Gxrls Team Coach", image: coachFour },
];

// PDFs and cover previews are stored in public/docs. Update these paths if the documents change.
const INTEREST_MEETING_SLIDES_URL = "/docs/Flyers-Info-Meeting-Slides-2026.pdf";
const INTEREST_MEETING_SLIDES_COVER =
	"/docs/Flyers-Info-Meeting-Slides-2026-cover.png";
const SEASON_INFO_PACKET_URL =
	"/docs/Lindbergh-Ultimate-2026-Season-Letter-to-Families.pdf";
const SEASON_INFO_PACKET_COVER =
	"/docs/Lindbergh-Ultimate-2026-Season-Letter-to-Families-cover.png";

const DocumentActions = ({ href, downloadName }) => (
	<div className="flex flex-wrap items-center gap-2">
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="rounded-full border border-lu-green/30 px-3 py-1.5 text-sm font-bold text-lu-green transition-colors hover:border-lu-green hover:bg-lu-green/5"
		>
			Open PDF
		</a>
		<a
			href={href}
			download={downloadName}
			className="rounded-full bg-lu-green px-3 py-1.5 text-sm font-bold text-lu-cream transition-colors hover:bg-lu-deep"
		>
			Download PDF
		</a>
	</div>
);

const DocumentCard = ({ href, downloadName, cover, coverAlt, title, meta }) => (
	<div className="overflow-hidden border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream">
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Open ${title} in a new tab`}
			className="flex items-center justify-center p-4 transition-colors bg-white h-80 hover:bg-lu-yellow/10"
		>
			<img
				src={cover}
				alt={coverAlt}
				loading="lazy"
				className="object-contain max-w-full max-h-full"
			/>
		</a>
		<div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t-2 border-lu-yellow/30">
			<p className="text-sm text-lu-ink/70">{meta}</p>
			<DocumentActions href={href} downloadName={downloadName} />
		</div>
	</div>
);

const HighSchool = () => {
	return (
		<div
			className="min-h-screen bg-lu-green text-lu-cream"
		>
			{/* Hero */}
			<section className="relative flex items-center justify-center w-full overflow-hidden h-70 md:h-100">
				<div
					className="absolute inset-0 bg-center bg-cover opacity-80"
					style={{
						backgroundImage: `url(${circle})`,
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 px-4 text-5xl font-bold tracking-widest text-center uppercase hero-title drop-shadow-lg md:text-6xl lg:text-7xl">
					High School
				</h1>
			</section>

			{/* Meet the Coaches */}
			<section className="max-w-5xl px-6 py-12 mx-auto">
				<div className="py-4 mb-10 border-2 rounded-lg bg-lu-green border-lu-yellow">
					<h2 className="text-xl font-bold tracking-wide text-center uppercase outline-title sm:text-2xl">
						Meet the Coaches
					</h2>
				</div>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
					{COACHES.map((coach, i) => (
						<div
							key={i}
							className="overflow-hidden text-center border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink"
						>
							<div
								className="w-full mx-auto bg-center bg-cover aspect-square max-w-60 bg-lu-deep"
								style={{ backgroundImage: `url(${coach.image})` }}
							/>
							<div className="p-4">
								<p className="text-lg font-bold font-roboto text-lu-green">{coach.name}</p>
								<p className="text-sm font-body text-lu-ink/70">{coach.role}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* 2026 Interest Meeting Slides */}
			<section className="max-w-4xl px-6 py-12 mx-auto border-t border-lu-yellow/30">
				<h2 className="mb-6 text-xl font-bold outline-title sm:text-2xl">
					2026 Interest Meeting Slides
				</h2>
				<DocumentCard
					href={INTEREST_MEETING_SLIDES_URL}
					downloadName="Flyers-Info-Meeting-Slides-2026.pdf"
					cover={INTEREST_MEETING_SLIDES_COVER}
					coverAlt="Preview of the 2026 Lindbergh Ultimate interest meeting slides"
					title="2026 Interest Meeting Slides"
					meta="Flyers Info Meeting Slides 2026 · PDF · 12 pages"
				/>
			</section>

			{/* 2026 Season Info Packet */}
			<section className="max-w-4xl px-6 py-12 mx-auto border-t border-lu-yellow/30">
				<h2 className="mb-6 text-xl font-bold outline-title sm:text-2xl">
					2026 Season Info Packet
				</h2>
				<DocumentCard
					href={SEASON_INFO_PACKET_URL}
					downloadName="Lindbergh-Ultimate-2026-Season-Letter-to-Families.pdf"
					cover={SEASON_INFO_PACKET_COVER}
					coverAlt="Preview of the Lindbergh Ultimate 2026 season letter to families"
					title="2026 Season Info Packet"
					meta="Lindbergh Ultimate 2026 Season Letter to Families · PDF · 5 pages"
				/>
			</section>

			{/* Footer contact */}
			<section className="max-w-4xl px-6 py-12 mx-auto text-center border-t border-lu-yellow/30">
				<div className="max-w-2xl p-5 mx-auto border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					<p>
						Have a question about the team? Email us at{" "}
						<a
							href="mailto:contact@example.com"
							className="font-bold text-lu-green hover:underline"
						>
							contact@example.com
						</a>
					</p>
				</div>
			</section>
		</div>
	);
};

export default HighSchool;
