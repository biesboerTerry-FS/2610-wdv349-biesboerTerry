// eslint-disable-next-line no-unused-vars
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-[#123d24] px-6 py-10 text-white sm:px-10">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-wide">Get involved</h2>
					<p className="mt-2 max-w-md text-sm text-green-100">
						Join the Lindbergh Ultimate community and help grow the sport.
					</p>
				</div>

				<nav aria-label="Footer links">
					<ul className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
						<li>
							<a
								className="inline-flex items-center gap-2 font-medium transition-colors hover:text-green-300"
								href="mailto:lindberghultimate@gmail.com"
							>
								<FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
								Email us
							</a>
						</li>
						<li>
							<Link
								className="font-medium transition-colors hover:text-green-300"
								to="/interest-form"
							>
								Interest Form
							</Link>
						</li>
						<li>
							<a
								className="inline-flex items-center gap-2 font-medium transition-colors hover:text-green-300"
								href="https://www.instagram.com/lindberghultimate/"
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
								Follow us on Instagram
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
