import React, { useState } from "react";

const LindberghInterestForm = () => {
	const [formData, setFormData] = useState({
		studentName: "",
		schoolGrade: "",
		gradeOther: "",
		divisions: [],
		divisionOther: "",
		schoolAttended: "",
		schoolOther: "",
		studentPhone: "",
		studentEmail: "",
		parentPhone: "",
		parentEmail: "",
		interestLevel: "",
	});

	const [errors, setErrors] = useState({});

	const validate = () => {
		let newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

		if (!formData.studentName)
			newErrors.studentName = "Student name is required";
		if (!formData.schoolGrade)
			newErrors.schoolGrade = "Grade selection is required";
		if (!formData.divisions.length)
			newErrors.divisions = "Select at least one division";
		if (!formData.schoolAttended)
			newErrors.schoolAttended = "School choice is required";
		if (!formData.interestLevel)
			newErrors.interestLevel = "Interest level is required";

		if (!phoneRegex.test(formData.studentPhone))
			newErrors.studentPhone = "Format: ###-###-####";
		if (!emailRegex.test(formData.studentEmail))
			newErrors.studentEmail = "Valid email is required";

		// Optional Parent fields validation if filled
		if (formData.parentPhone && !phoneRegex.test(formData.parentPhone))
			newErrors.parentPhone = "Format: ###-###-####";
		if (formData.parentEmail && !emailRegex.test(formData.parentEmail))
			newErrors.parentEmail = "Valid email is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleCheckbox = (value) => {
		const updatedDivisions = formData.divisions.includes(value)
			? formData.divisions.filter((item) => item !== value)
			: [...formData.divisions, value];
		setFormData({ ...formData, divisions: updatedDivisions });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			console.log("Form Submitted Successfully:", formData);
			alert("Form submitted!");
		}
	};

	return (
		<div
			style={{
				backgroundColor: "#3e5c3e",
				padding: "20px",
				fontFamily: "Arial, sans-serif",
				color: "#000",
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					maxWidth: "600px",
					margin: "auto",
					backgroundColor: "#fff",
					padding: "30px",
					borderRadius: "8px",
				}}
			>
				<h1
					style={{
						borderTop: "10px solid #fbbc04",
						paddingTop: "10px",
					}}
				>
					Lindbergh Ultimate Quick Interest Form
				</h1>
				<p>
					Use this form to hear about high school, middle school, and
					youth ultimate opportunities.
				</p>
				<hr />

				{/* Student Name */}
				<div className="field-group">
					<label>Student First and Last Name: *</label>
					<input
						type="text"
						placeholder="Your answer"
						onChange={(e) =>
							setFormData({
								...formData,
								studentName: e.target.value,
							})
						}
					/>
					{errors.studentName && (
						<span style={{ color: "red" }}>
							{errors.studentName}
						</span>
					)}
				</div>

				{/* School Grade */}
				<div className="field-group">
					<label>School Grade? *</label>
					{["6th", "7th", "8th", "9th", "10th", "11th", "12th"].map(
						(grade) => (
							<div key={grade}>
								<input
									type="radio"
									name="grade"
									value={grade}
									onChange={(e) =>
										setFormData({
											...formData,
											schoolGrade: e.target.value,
										})
									}
								/>{" "}
								{grade}
							</div>
						),
					)}
					{errors.schoolGrade && (
						<span style={{ color: "red" }}>
							{errors.schoolGrade}
						</span>
					)}
				</div>

				{/* Divisions - Multi Select */}
				<div className="field-group">
					<label>Which divisions are you interested in? *</label>
					{["Boys", "Girls", "Mixed"].map((div) => (
						<div key={div}>
							<input
								type="checkbox"
								onChange={() => handleCheckbox(div)}
							/>{" "}
							{div}
						</div>
					))}
					{errors.divisions && (
						<span style={{ color: "red" }}>{errors.divisions}</span>
					)}
				</div>

				{/* Contact Info */}
				<div className="field-group">
					<label>Best phone # for student: *</label>
					<input
						type="text"
						placeholder="###-###-####"
						onChange={(e) =>
							setFormData({
								...formData,
								studentPhone: e.target.value,
							})
						}
					/>
					{errors.studentPhone && (
						<span style={{ color: "red" }}>
							{errors.studentPhone}
						</span>
					)}
				</div>

				<div className="field-group">
					<label>Best email for student: *</label>
					<input
						type="email"
						placeholder="Your answer"
						onChange={(e) =>
							setFormData({
								...formData,
								studentEmail: e.target.value,
							})
						}
					/>
					{errors.studentEmail && (
						<span style={{ color: "red" }}>
							{errors.studentEmail}
						</span>
					)}
				</div>

				{/* Interest Level */}
				<div className="field-group">
					<label>What is your interest level in playing? *</label>
					{[
						"Definitely playing",
						"Probably playing",
						"Undecided",
					].map((level) => (
						<div key={level}>
							<input
								type="radio"
								name="interest"
								value={level}
								onChange={(e) =>
									setFormData({
										...formData,
										interestLevel: e.target.value,
									})
								}
							/>{" "}
							{level}
						</div>
					))}
					{errors.interestLevel && (
						<span style={{ color: "red" }}>
							{errors.interestLevel}
						</span>
					)}
				</div>

				<button
					type="submit"
					style={{
						backgroundColor: "#3e5c3e",
						color: "white",
						padding: "10px 20px",
						border: "none",
						borderRadius: "4px",
						marginTop: "20px",
						cursor: "pointer",
					}}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default LindberghInterestForm;
