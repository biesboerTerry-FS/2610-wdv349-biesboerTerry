import React, { useState } from "react";

const GRADE_OPTIONS = ["6th", "7th", "8th", "9th", "10th", "11th", "12th", "Other"];
const DIVISION_OPTIONS = ["Boys", "Girls", "Mixed", "Other"];
const SCHOOL_OPTIONS = [
	"Lindbergh High School",
	"Sperreng Middle School",
	"Truman Middle School",
	"Other",
];
const INTEREST_OPTIONS = [
	"Definitely playing",
	"Probably playing",
	"Undecided/just checking things out",
];

const QuickInterest = () => {
	const [form, setForm] = useState({
		studentName: "",
		grade: "",
		gradeOther: "",
		division: "",
		divisionOther: "",
		school: "",
		schoolOther: "",
		studentPhone: "",
		studentEmail: "",
		parentPhone: "",
		parentEmail: "",
		interestLevel: "",
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
					Lindbergh Ultimate Quick Interest Form
				</h1>
				<p className="text-[#f9f9f9] text-lg mb-2">
					Use this form to hear about high school, middle school, and youth ultimate opportunities.
				</p>
				<p className="text-[#f9f9f9]/80 text-sm mb-10">* Indicates required question</p>

				<form
					className="flex flex-col gap-8"
					onSubmit={(e) => {
						e.preventDefault();
						// Add your submit logic (e.g. send to API or Google Form)
					}}
				>
					{/* Student First and Last Name */}
					<div>
						<label className={labelClass}>
							Student First and Last Name: {requiredStar}
						</label>
						<input
							type="text"
							required
							value={form.studentName}
							onChange={(e) => update("studentName", e.target.value)}
							className={inputClass}
							placeholder="First and Last Name"
						/>
					</div>

					{/* School Grade */}
					<div>
						<label className={labelClass}>
							School Grade? If elementary please specify in &quot;other.&quot; {requiredStar}
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

					{/* Division interested in */}
					<div>
						<label className={labelClass}>
							Which of the following divisions are you most interested in? {requiredStar}
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

					{/* What school do you attend */}
					<div>
						<label className={labelClass}>
							What school do you attend? If elementary, private, or your current school does not
							have an ultimate program, please specify in &quot;other.&quot; {requiredStar}
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

					{/* Best phone # for student */}
					<div>
						<label className={labelClass}>
							Best phone # for student: ###—###—### {requiredStar}
						</label>
						<input
							type="tel"
							required
							value={form.studentPhone}
							onChange={(e) => update("studentPhone", e.target.value)}
							className={inputClass}
							placeholder="###—###—###"
						/>
					</div>

					{/* Best email for student */}
					<div>
						<label className={labelClass}>
							Best email for student: {requiredStar}
						</label>
						<input
							type="email"
							required
							value={form.studentEmail}
							onChange={(e) => update("studentEmail", e.target.value)}
							className={inputClass}
							placeholder="student@example.com"
						/>
					</div>

					{/* Best phone # for parent */}
					<div>
						<label className={labelClass}>
							Best phone # for parent (leave blank if same as above): ###—###—###
						</label>
						<input
							type="tel"
							value={form.parentPhone}
							onChange={(e) => update("parentPhone", e.target.value)}
							className={inputClass}
							placeholder="###—###—###"
						/>
					</div>

					{/* Best email for parent */}
					<div>
						<label className={labelClass}>
							Best email for parent (leave blank if same as above):
						</label>
						<input
							type="email"
							value={form.parentEmail}
							onChange={(e) => update("parentEmail", e.target.value)}
							className={inputClass}
							placeholder="parent@example.com"
						/>
					</div>

					{/* Interest level */}
					<div>
						<label className={labelClass}>
							What is your interest level in playing? {requiredStar}
						</label>
						<div className="flex flex-col gap-2">
							{INTEREST_OPTIONS.map((opt) => (
								<label key={opt} className="flex items-center gap-2 cursor-pointer">
									<input
										type="radio"
										name="interestLevel"
										value={opt}
										required
										checked={form.interestLevel === opt}
										onChange={() => update("interestLevel", opt)}
										className="accent-[#fbcc00]"
									/>
									<span className="text-[#f9f9f9]">{opt}</span>
								</label>
							))}
						</div>
					</div>

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

export default QuickInterest;
