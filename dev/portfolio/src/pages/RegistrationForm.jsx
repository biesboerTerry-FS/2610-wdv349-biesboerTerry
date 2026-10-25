import React, { useState } from "react";
import { ApiError, submitRegistration } from "../lib/api";
import FieldError from "../components/FieldError";

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

	const [status, setStatus] = useState("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const [fieldErrors, setFieldErrors] = useState({});

	const resetForm = () => {
		setForm({
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
			await submitRegistration({
				athleteName: form.athleteName.trim(),
				grade: form.grade,
				gradeOther: form.gradeOther.trim(),
				school: form.school,
				schoolOther: form.schoolOther.trim(),
				division: form.division,
				divisionOther: form.divisionOther.trim(),
				shirtSize: form.shirtSize,
				phone: form.phone.trim(),
				schoolEmail: form.schoolEmail.trim(),
				additionalEmail: form.additionalEmail.trim(),
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
					2026 Lindbergh Ultimate Spring Registration
				</h1>
				<p className="mb-10 text-sm text-lu-cream/80">* Indicates required question</p>

				{status === "success" ? (
					<div className="flex flex-col gap-4 p-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
						<h2 className="text-2xl font-bold font-roboto text-lu-green">Registration received!</h2>
						<p className="text-lu-ink">
							Thanks for signing up for the 2026 season. We&apos;ll follow up by email with
							next steps, including payment and season details.
						</p>
						<button
							type="button"
							onClick={resetForm}
							className="px-6 py-2 font-bold transition-all rounded-full bg-lu-yellow text-lu-green hover:bg-lu-green hover:text-lu-yellow w-fit"
						>
							Register another athlete
						</button>
					</div>
				) : (
				<form className="flex flex-col w-full gap-8" onSubmit={handleSubmit}>
					<div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
						<div className="flex flex-col min-w-0 gap-6 md:pr-10">
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
						<FieldError errors={fieldErrors} name="divisionOther" />
					</div>

						</div>

						<div className="flex flex-col min-w-0 gap-6 md:border-l-2 md:border-lu-yellow/70 md:pl-10">
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
										className="accent-lu-yellow"
									/>
									<span className="text-lu-cream">{opt}</span>
								</label>
							))}
						</div>
						<FieldError errors={fieldErrors} name="shirtSize" />
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
						<FieldError errors={fieldErrors} name="phone" />
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
						<FieldError errors={fieldErrors} name="schoolEmail" />
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
						<FieldError errors={fieldErrors} name="additionalEmail" />
					</div>

					<p className="text-sm text-lu-cream/70">
						We only use this information for team communication and registration.
					</p>

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

export default RegistrationForm;
