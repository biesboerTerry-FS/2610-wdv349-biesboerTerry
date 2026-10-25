import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppStoreIos, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

const SPORTSYOU_URL = "https://www.sportsyou.com";
const APP_STORE_URL = "https://apps.apple.com/us/app/sportsyou/id1186906455";
const GOOGLE_PLAY_URL =
	"https://play.google.com/store/apps/details?id=com.sportsyou.sportsYou";
const ACCESS_CODE = "AZJQ-PPDT";

const SportsYou = () => {
	return (
		<div
			className="min-h-screen px-4 py-10 bg-lu-green text-lu-cream sm:px-6 sm:py-16"
		>
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<h1 className="max-w-3xl mx-auto mb-8 text-2xl font-bold text-center outline-title sm:text-3xl md:text-4xl">
					Stay &quot;In the Know&quot; by Joining our SportsYou Page
				</h1>
				<div className="flex flex-wrap items-center justify-center gap-4 mb-12">
					<a
						href={SPORTSYOU_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-lu-deep hover:bg-[#0a3d20] text-white font-bold py-3 px-6 rounded-lg transition-colors"
					>
						SportsYou Website
					</a>
					<span className="text-sm font-medium font-roboto text-lu-cream/80">
						Download the app:
					</span>
					<a
						href={APP_STORE_URL}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Download on the App Store"
						title="Download on the App Store"
						className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-lu-deep text-white transition-colors hover:bg-[#0a3d20]"
					>
						<FontAwesomeIcon icon={faAppStoreIos} className="text-2xl" aria-hidden="true" />
					</a>
					<a
						href={GOOGLE_PLAY_URL}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Get it on Google Play"
						title="Get it on Google Play"
						className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-lu-deep text-white transition-colors hover:bg-[#0a3d20]"
					>
						<FontAwesomeIcon icon={faGooglePlay} className="text-2xl" aria-hidden="true" />
					</a>
				</div>

				{/* Main invitation box */}
				<div className="overflow-hidden border-2 shadow-2xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					{/* Top: logo + invite text */}
					<div className="p-5 pb-4 text-center border-b border-gray-200 sm:p-8">
						<p className="text-2xl font-bold tracking-tight text-orange-500">sportsYou</p>
						<p className="mt-4 text-gray-800">You&apos;ve been invited to join</p>
						<p className="mt-1 text-xl font-bold text-gray-900">Lindbergh Ultimate</p>
						<p className="mt-2 text-sm text-gray-600">
							Use your unique access code below and follow the instructions.
						</p>
					</div>

					{/* Access code */}
					<div className="flex justify-center px-4 py-6 sm:px-8">
						<div className="px-4 py-4 text-center bg-gray-100 border-2 border-gray-300 rounded-lg sm:px-8">
							<p className="text-sm font-medium tracking-wide text-gray-600 uppercase">
								Access Code
							</p>
							<p className="mt-1 text-2xl font-bold tracking-widest text-gray-900 md:text-3xl">
								{ACCESS_CODE}
							</p>
						</div>
					</div>

					{/* Two columns: Website | App */}
					<div className="grid grid-cols-1 gap-8 p-5 pt-4 sm:p-8 lg:grid-cols-2">
						{/* Join via Website */}
						<div>
							<h3 className="mb-4 text-lg font-bold text-lu-green">Join via Website</h3>
							<div className="space-y-4">
								<div>
									<p className="mb-1 text-sm font-bold text-gray-800">New Users:</p>
									<ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
										<li>
											From your computer, phone, or tablet, visit{" "}
											<a
												href={SPORTSYOU_URL}
												target="_blank"
												rel="noopener noreferrer"
												className="font-medium underline text-lu-green"
											>
												sportsyou.com
											</a>
										</li>
										<li>Click <strong>Get Started</strong> and enter your email</li>
										<li>Go to your email and click <strong>Confirm Your Email</strong></li>
										<li>
											Click <strong>Enter Access Code</strong> to enter code, then finish
											setting up your account
										</li>
									</ol>
								</div>
								<div>
									<p className="mb-1 text-sm font-bold text-gray-800">Existing Users:</p>
									<ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
										<li>
											From your computer, phone, or tablet, go to{" "}
											<a
												href={SPORTSYOU_URL}
												target="_blank"
												rel="noopener noreferrer"
												className="font-medium underline text-lu-green"
											>
												sportsyou.com
											</a>{" "}
											and log in
										</li>
										<li>In left column, click <strong>Join Team/Group.</strong></li>
										<li>
											Click <strong>Enter Access Code</strong> to enter code, then Join
											Team or Join Group
										</li>
									</ol>
								</div>
							</div>
						</div>

						{/* Join via App */}
						<div>
							<h3 className="mb-4 text-lg font-bold text-lu-green">Join via App</h3>
							<div className="space-y-4">
								<div>
									<p className="mb-1 text-sm font-bold text-gray-800">New Users:</p>
									<ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
										<li>
											On mobile device download sportsYou app from the{" "}
											<a
												href={APP_STORE_URL}
												target="_blank"
												rel="noopener noreferrer"
												aria-label="Download on the App Store"
												title="Download on the App Store"
												className="inline-flex align-middle transition-colors text-lu-green hover:text-lu-yellow"
											>
												<FontAwesomeIcon icon={faAppStoreIos} className="text-xl" aria-hidden="true" />
											</a>{" "}
											or{" "}
											<a
												href={GOOGLE_PLAY_URL}
												target="_blank"
												rel="noopener noreferrer"
												aria-label="Get it on Google Play"
												title="Get it on Google Play"
												className="inline-flex align-middle transition-colors text-lu-green hover:text-lu-yellow"
											>
												<FontAwesomeIcon icon={faGooglePlay} className="text-xl" aria-hidden="true" />
											</a>
										</li>
										<li>Open the sportsYou app and tap <strong>Create Account</strong></li>
										<li>
											Tap <strong>Enter Access Code</strong> to enter code, then finish set
											up
										</li>
									</ol>
								</div>
								<div>
									<p className="mb-1 text-sm font-bold text-gray-800">Existing Users:</p>
									<ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
										<li>On mobile device log in</li>
										<li>In bottom tray, tap <strong>Teams/Groups</strong></li>
										<li>Tap blue <strong>+</strong> button, then tap <strong>Join Team/Group</strong></li>
										<li>Enter access code and click Join</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					{/* Footer of box */}
					<div className="flex flex-col items-center justify-between gap-4 px-5 py-6 border-t border-gray-200 bg-gray-50 sm:flex-row sm:px-8">
						<p className="flex items-center gap-2 text-sm text-gray-600">
							<span className="font-bold text-orange-500">SY</span>
							visit us at{" "}
							<a
								href={SPORTSYOU_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium underline text-lu-green"
							>
								www.sportsyou.com
							</a>{" "}
							or in the app stores
						</p>
						<div className="flex items-center gap-4">
							<a
								href={APP_STORE_URL}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Download on the App Store"
								title="Download on the App Store"
								className="text-gray-700 transition-colors hover:text-lu-green"
							>
								<FontAwesomeIcon icon={faAppStoreIos} className="text-2xl" aria-hidden="true" />
							</a>
							<a
								href={GOOGLE_PLAY_URL}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Get it on Google Play"
								title="Get it on Google Play"
								className="text-gray-700 transition-colors hover:text-lu-green"
							>
								<FontAwesomeIcon icon={faGooglePlay} className="text-2xl" aria-hidden="true" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SportsYou;
