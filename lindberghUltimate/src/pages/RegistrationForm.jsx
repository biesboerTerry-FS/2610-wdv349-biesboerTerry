import React, { useState } from "react";

const GRADE_OPTIONS = ["7th", "8th", "9th", "10th", "11th", "12th", "Other"];
const SCHOOL_OPTIONS = [
	"Lindbergh High School",
	"Sperreng Middle School",
	"Truman Middle School",
	"Other",
];
const DIVISION_OPTIONS = ["Boys", "Gxrls", "Other"];
const SHIRT_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

const RegistrationForm = () => {
	const [form, setForm] = useState({
		athleteName: "",
		grade: "",
		gradeOther: "",
		school: "",
		schoolOther: "",
		division: "",
		divisionOther: "",
		shirtSize: "",
		phone: "",
		schoolEmail: "",
		additionalEmail: "",
	});

	const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

	const labelClass = "block text-[#f9f9f9] font-medium mb-1";
	const inputClass =
		"w-full max-w-md px-4 py-2 rounded-lg border-2 border-[#fbcc00]/50 bg-white/5 text-[#f9f9f9] placeholder-[#f9f9f9]/50 focus:border-[#fbcc00] focus:outline-none";
	const requiredStar = <span className="text-[#fbcc00]">*</span>;

	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9] py-16 px-6"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			<div className="max-w-2xl mx-auto">
				<h1 className="text-[#fbcc00] text-3xl font-bold uppercase tracking-wide mb-2">
					2026 Lindbergh Ultimate Spring Registration
				</h1>
				<p className="text-[#f9f9f9]/80 text-sm mb-10">* Indicates required question</p>

				<form
					className="flex flex-col gap-8"
					onSubmit={(e) => {
						e.preventDefault();
						// Add your submit logic (e.g. send to API or Google Form)
					}}
				>
					{/* Athlete's First & Last Name */}
					<div>
						<label className={labelClass}>
							Athlete&apos;s First &amp; Last Name: {requiredStar}
						</label>
						<input
							type="text"
							required
							value={form.athleteName}
							onChange={(e) => update("athleteName", e.target.value)}
							className={inputClass}
							placeholder="First and Last Name"
						/>
					</div>

					{/* Athlete's Current Grade Level */}
					<div>
						<label className={labelClass}>
							Athlete&apos;s Current Grade Level: {requiredStar}
						</label>
						<div className="flex flex-wrap gap-4">
							{GRADE_OPTIONS.map((opt) => (
								<label key={opt} className="flex items-center gap-2 cursor-pointer">
									<input
										type="radio"
										name="grade"
										value={opt}
										checked={form.grade === opt}
										onChange={() => update("grade", opt)}
										className="accent-[#fbcc00]"
									/>
									<span className="text-[#f9f9f9]">{opt}</span>
								</label>
							))}
						</div>
						{form.grade === "Other" && (
							<input
								type="text"
								value={form.gradeOther}
								onChange={(e) => update("gradeOther", e.target.value)}
								className={`${inputClass} mt-2`}
								placeholder="Specify grade"
							/>
						)}
					</div>

					{/* Athlete's School */}
					<div>
						<label className={labelClass}>
							Athlete&apos;s School: {requiredStar}
						</label>
						<div className="flex flex-col gap-2">
							{SCHOOL_OPTIONS.map((opt) => (
								<label key={opt} className="flex items-center gap-2 cursor-pointer">
									<input
										type="radio"
										name="school"
										value={opt}
										checked={form.school === opt}
										onChange={() => update("school", opt)}
										className="accent-[#fbcc00]"
									/>
									<span className="text-[#f9f9f9]">{opt}</span>
								</label>
							))}
						</div>
						{form.school === "Other" && (
							<input
								type="text"
								value={form.schoolOther}
								onChange={(e) => update("schoolOther", e.target.value)}
								className={`${inputClass} mt-2`}
								placeholder="Specify school"
							/>
						)}
					</div>

					{/* Athlete's Desired Gender Division */}
					<div>
						<label className={labelClass}>
							Athlete&apos;s Desired Gender Division: {requiredStar}
						</label>
						<div className="flex flex-wrap gap-4">
							{DIVISION_OPTIONS.map((opt) => (
								<label key={opt} className="flex items-center gap-2 cursor-pointer">
									<input
										type="radio"
										name="division"
										value={opt}
										checked={form.division === opt}
										onChange={() => update("division", opt)}
										className="accent-[#fbcc00]"
									/>
									<span className="text-[#f9f9f9]">{opt}</span>
								</label>
							))}
						</div>
						{form.division === "Other" && (
							<input
								type="text"
								value={form.divisionOther}
								onChange={(e) => update("divisionOther", e.target.value)}
								className={`${inputClass} mt-2`}
								placeholder="Specify division"
							/>
						)}
					</div>

					{/* Athlete's Shirt Size */}
					<div>
						<label className={labelClass}>
							Athlete&apos;s Shirt Size: {requiredStar}
						</label>
						<div className="flex flex-wrap gap-4">
							{SHIRT_OPTIONS.map((opt) => (
								<label key={opt} className="flex items-center gap-2 cursor-pointer">
									<input
										type="radio"
										name="shirtSize"
										value={opt}
										required
										checked={form.shirtSize === opt}
										onChange={() => update("shirtSize", opt)}
										className="accent-[#fbcc00]"
									/>
									<span className="text-[#f9f9f9]">{opt}</span>
								</label>
							))}
						</div>
					</div>

					{/* Athlete's Phone Number */}
					<div>
						<label className={labelClass}>
							Athlete&apos;s Phone Number: {requiredStar}
						</label>
						<input
							type="tel"
							required
							value={form.phone}
							onChange={(e) => update("phone", e.target.value)}
							className={inputClass}
							placeholder="###—###—###"
						/>
					</div>

					{/* Athlete's School Email */}
					<div>
						<label className={labelClass}>
							Athlete&apos;s School Email: {requiredStar}
						</label>
						<input
							type="email"
							required
							value={form.schoolEmail}
							onChange={(e) => update("schoolEmail", e.target.value)}
							className={inputClass}
							placeholder="student@lindberghschools.ws"
						/>
					</div>

					{/* Optional additional email */}
					<div>
						<label className={labelClass}>
							Optional: additional athlete email if desired or if not enrolled in the Lindbergh
							School District:
						</label>
						<input
							type="email"
							value={form.additionalEmail}
							onChange={(e) => update("additionalEmail", e.target.value)}
							className={inputClass}
							placeholder="email@example.com"
						/>
					</div>

					<p className="text-[#f9f9f9]/70 text-sm">
						Never submit passwords through Google Forms.
					</p>

					<button
						type="submit"
						className="bg-[#fbcc00] text-[#1c6a37] font-bold py-3 px-8 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg w-fit"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default RegistrationForm;
