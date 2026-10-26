import React, { useState } from "react";
import { ApiError, submitInterestForm } from "../lib/api";
import FieldError from "../components/FieldError";

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

	const [status, setStatus] = useState("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const [fieldErrors, setFieldErrors] = useState({});

	const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

	const resetForm = () => {
		setForm({
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
		setStatus("idle");
		setErrorMessage("");
		setFieldErrors({});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("submitting");
		setErrorMessage("");
		setFieldErrors({});

		try {
			await submitInterestForm({
				studentName: form.studentName.trim(),
				grade: form.grade,
				gradeOther: form.gradeOther.trim(),
				division: form.division,
				divisionOther: form.divisionOther.trim(),
				school: form.school,
				schoolOther: form.schoolOther.trim(),
				studentPhone: form.studentPhone.trim(),
				studentEmail: form.studentEmail.trim(),
				parentPhone: form.parentPhone.trim(),
				parentEmail: form.parentEmail.trim(),
				interestLevel: form.interestLevel,
			});
			setStatus("success");
		} catch (error) {
			setErrorMessage(
				error instanceof ApiError
					? error.message
					: "Something went wrong. Please try again."
			);
			setFieldErrors(error instanceof ApiError ? error.fieldErrors : {});
			setStatus("error");
		}
	};

	const isSubmitting = status === "submitting";
	const submitLabel = isSubmitting ? "Submitting…" : "Submit";

	const labelClass = "mb-1 block font-body font-medium text-[#f9f9f9]";
	const inputClass =
		"w-full rounded-lg border-2 border-[#fbcc00]/50 bg-[#f9f9f9] px-4 py-2 font-body text-[#123d24] placeholder-[#1c6a37]/50 focus:border-[#fbcc00] focus:bg-white focus:outline-none";
	const requiredStar = <span className="text-lu-yellow">*</span>;

	return (
		<div
			className="min-h-screen px-4 py-10 bg-lu-green font-body text-lu-cream sm:px-6 sm:py-16"
		>
			<div className="max-w-4xl mx-auto">
				<h1 className="mb-2 text-2xl font-bold tracking-wide uppercase outline-title sm:text-3xl">
					Lindbergh Ultimate Quick Interest Form
				</h1>
				<p className="mb-2 text-base text-lu-cream sm:text-lg">
					Use this form to hear about high school, middle school, and youth ultimate opportunities.
				</p>
				<p className="mb-10 text-sm text-lu-cream/80">* Indicates required question</p>

				{status === "success" ? (
					<div className="flex flex-col gap-4 p-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
						<h2 className="text-2xl font-bold font-roboto text-lu-green">Thanks — we&apos;ve got it!</h2>
						<p className="text-lu-ink">
							Your interest form was submitted. A Lindbergh Ultimate coach will be in touch
							with next steps.
						</p>
						<button
							type="button"
							onClick={resetForm}
							className="px-6 py-2 font-bold transition-all rounded-full bg-lu-yellow text-lu-green hover:bg-lu-green hover:text-lu-yellow w-fit"
						>
							Submit another response
						</button>
					</div>
				) : (
				<form className="flex flex-col w-full gap-8" onSubmit={handleSubmit}>
					<div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
						<div className="flex flex-col min-w-0 gap-6 md:pr-10">
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
										className="accent-lu-yellow"
									/>
									<span className="text-lu-cream">{opt}</span>
								</label>
							))}
						</div>
						{form.grade === "Other" && (
							<input
								type="text"
								required
								value={form.gradeOther}
								onChange={(e) => update("gradeOther", e.target.value)}
								className={`${inputClass} mt-2`}
								placeholder="Specify grade"
							/>
						)}
						<FieldError errors={fieldErrors} name="grade" />
						<FieldError errors={fieldErrors} name="gradeOther" />
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
										className="accent-lu-yellow"
									/>
									<span className="text-lu-cream">{opt}</span>
								</label>
							))}
						</div>
						{form.division === "Other" && (
							<input
								type="text"
								required
								value={form.divisionOther}
								onChange={(e) => update("divisionOther", e.target.value)}
								className={`${inputClass} mt-2`}
								placeholder="Specify division"
							/>
						)}
						<FieldError errors={fieldErrors} name="division" />
						<FieldError errors={fieldErrors} name="divisions" />
						<FieldError errors={fieldErrors} name="divisionOther" />
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
										className="accent-lu-yellow"
									/>
									<span className="text-lu-cream">{opt}</span>
								</label>
							))}
						</div>
						{form.school === "Other" && (
							<input
								type="text"
								required
								value={form.schoolOther}
								onChange={(e) => update("schoolOther", e.target.value)}
								className={`${inputClass} mt-2`}
								placeholder="Specify school"
							/>
						)}
						<FieldError errors={fieldErrors} name="school" />
						<FieldError errors={fieldErrors} name="schoolOther" />
					</div>

						</div>

						<div className="flex flex-col min-w-0 gap-6 md:border-l-2 md:border-lu-yellow/70 md:pl-10">
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
						<FieldError errors={fieldErrors} name="studentPhone" />
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
						<FieldError errors={fieldErrors} name="studentEmail" />
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
						<FieldError errors={fieldErrors} name="parentPhone" />
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
						<FieldError errors={fieldErrors} name="parentEmail" />
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
										className="accent-lu-yellow"
									/>
									<span className="text-lu-cream">{opt}</span>
								</label>
							))}
						</div>
						<FieldError errors={fieldErrors} name="interestLevel" />
					</div>

						</div>
					</div>

					{status === "error" && errorMessage && (
						<div
							role="alert"
							className="px-4 py-3 border-2 rounded-lg border-lu-yellow bg-lu-yellow/10 text-lu-cream"
						>
							{errorMessage}
						</div>
					)}

					<button
						type="submit"
						disabled={isSubmitting}
						className="px-8 py-3 font-bold transition-all transform rounded-full shadow-lg bg-lu-yellow text-lu-green hover:bg-white hover:scale-105 w-fit disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
					>
						{submitLabel}
					</button>
				</form>
				)}
			</div>
		</div>
	);
};

export default QuickInterest;
