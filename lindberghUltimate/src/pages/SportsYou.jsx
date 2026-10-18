import React from "react";

const SPORTSYOU_URL = "https://www.sportsyou.com";
const APP_STORE_URL = "https://apps.apple.com/app/sportsyou/id1179728982";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.sportsyou.app";
const ACCESS_CODE = "AZJQ-PPDT";

const SportsYou = () => {
	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9] py-16 px-6"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<h1 className="text-[#fbcc00] text-2xl md:text-3xl font-bold text-center mb-8">
					Stay &quot;In the Know&quot; by Joining our SportsYou Page
				</h1>
				<div className="flex flex-wrap justify-center gap-4 mb-12">
					<a
						href={SPORTSYOU_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-[#0d4a28] hover:bg-[#0a3d20] text-white font-bold py-3 px-6 rounded-lg transition-colors"
					>
						SportsYou Website
					</a>
					<a
						href={APP_STORE_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-[#0d4a28] hover:bg-[#0a3d20] text-white font-bold py-3 px-6 rounded-lg transition-colors"
					>
						Apple App Store
					</a>
					<a
						href={GOOGLE_PLAY_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-[#0d4a28] hover:bg-[#0a3d20] text-white font-bold py-3 px-6 rounded-lg transition-colors"
					>
						Google Play Store
					</a>
				</div>

				{/* Main invitation box */}
				<div className="bg-white text-[#1a1a1a] rounded-xl border-2 border-[#fbcc00] shadow-2xl overflow-hidden">
					{/* Top: logo + invite text */}
					<div className="p-8 pb-4 text-center border-b border-gray-200">
						<p className="text-orange-500 text-2xl font-bold tracking-tight">sportsYou</p>
						<p className="mt-4 text-gray-800">You&apos;ve been invited to join</p>
						<p className="text-xl font-bold text-gray-900 mt-1">Lindbergh Ultimate</p>
						<p className="text-gray-600 text-sm mt-2">
							Use your unique access code below and follow the instructions.
						</p>
					</div>

					{/* Access code */}
					<div className="px-8 py-6 flex justify-center">
						<div className="bg-gray-100 border-2 border-gray-300 rounded-lg px-8 py-4 text-center">
							<p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
								Access Code
							</p>
							<p className="text-2xl md:text-3xl font-bold text-gray-900 tracking-widest mt-1">
								{ACCESS_CODE}
							</p>
						</div>
					</div>

					{/* Two columns: Website | App */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 pt-4">
						{/* Join via Website */}
						<div>
							<h3 className="text-[#1c6a37] font-bold text-lg mb-4">Join via Website</h3>
							<div className="space-y-4">
								<div>
									<p className="font-bold text-gray-800 text-sm mb-1">New Users:</p>
									<ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
										<li>
											From your computer, phone, or tablet, visit{" "}
											<a
												href={SPORTSYOU_URL}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[#1c6a37] underline font-medium"
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
									<p className="font-bold text-gray-800 text-sm mb-1">Existing Users:</p>
									<ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
										<li>
											From your computer, phone, or tablet, go to{" "}
											<a
												href={SPORTSYOU_URL}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[#1c6a37] underline font-medium"
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
							<h3 className="text-[#1c6a37] font-bold text-lg mb-4">Join via App</h3>
							<div className="space-y-4">
								<div>
									<p className="font-bold text-gray-800 text-sm mb-1">New Users:</p>
									<ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
										<li>
											On mobile device download sportsYou app from the{" "}
											<a
												href={APP_STORE_URL}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[#1c6a37] underline font-medium"
											>
												App Store (iOS)
											</a>{" "}
											or{" "}
											<a
												href={GOOGLE_PLAY_URL}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[#1c6a37] underline font-medium"
											>
												Google Play Store (Android)
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
									<p className="font-bold text-gray-800 text-sm mb-1">Existing Users:</p>
									<ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
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
					<div className="border-t border-gray-200 bg-gray-50 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
						<p className="text-gray-600 text-sm flex items-center gap-2">
							<span className="text-orange-500 font-bold">SY</span>
							visit us at{" "}
							<a
								href={SPORTSYOU_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#1c6a37] underline font-medium"
							>
								www.sportsyou.com
							</a>{" "}
							or in the app stores
						</p>
						<div className="flex gap-4">
							<a
								href={APP_STORE_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-700 text-sm font-medium hover:text-[#1c6a37]"
							>
								Download on the App Store
							</a>
							<a
								href={GOOGLE_PLAY_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-700 text-sm font-medium hover:text-[#1c6a37]"
							>
								GET IT ON Google Play
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SportsYou;
