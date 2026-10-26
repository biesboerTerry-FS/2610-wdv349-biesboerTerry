import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
	faClipboardList,
	faEnvelope,
	faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="px-6 py-10 text-white border-t-2 border-lu-yellow bg-lu-dark font-body sm:px-10">
			<div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 md:items-center">
				<div>
					<h2 className="text-2xl font-bold tracking-wide outline-title">Get involved</h2>
					<p className="max-w-md mt-2 text-sm text-green-100">
						Join the Lindbergh Ultimate community and help grow the sport.
					</p>
				</div>

				<nav aria-label="Footer links">
					<ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-10">
						<li>
							<a
								className="inline-flex items-center gap-2 font-medium transition-colors hover:text-green-300"
								href="mailto:contact@example.com"
							>
								<FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
								Email us
							</a>
						</li>
						<li>
							<Link
								className="inline-flex items-center gap-2 font-medium transition-colors hover:text-green-300"
								to="/interest-form"
							>
								<FontAwesomeIcon icon={faClipboardList} aria-hidden="true" />
								Interest Form
							</Link>
						</li>
						<li>
							<Link
								className="inline-flex items-center gap-2 font-medium transition-colors hover:text-green-300"
								to="/admin"
							>
								<FontAwesomeIcon icon={faUserShield} aria-hidden="true" />
								Admin Panel
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
