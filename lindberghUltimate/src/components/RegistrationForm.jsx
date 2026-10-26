// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";

const LindberghRegistrationForm = () => {
	const [formData, setFormData] = useState({
		athleteName: "",
		gradeLevel: "",
		gradeOther: "",
		school: "",
		schoolOther: "",
		genderDivision: "",
		divisionOther: "",
		shirtSize: "",
		athletePhone: "",
		athleteEmail: "",
		additionalEmail: "",
	});

	const [errors, setErrors] = useState({});

	const validate = () => {
		let newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

		if (!formData.athleteName)
			newErrors.athleteName = "Athlete name is required";
		if (!formData.gradeLevel)
			newErrors.gradeLevel = "Grade level is required";
		if (!formData.school) newErrors.school = "School selection is required";
		if (!formData.genderDivision)
			newErrors.genderDivision = "Gender division is required";
		if (!formData.shirtSize) newErrors.shirtSize = "Shirt size is required";

		if (!phoneRegex.test(formData.athletePhone))
			newErrors.athletePhone = "Use format: ###-###-####";
		if (!emailRegex.test(formData.athleteEmail))
			newErrors.athleteEmail = "Valid school email is required";

		// Additional email validation only if filled
		if (
			formData.additionalEmail &&
			!emailRegex.test(formData.additionalEmail)
		) {
			newErrors.additionalEmail = "Please enter a valid email address";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			console.log("Registration Data:", formData);
			alert("Registration submitted successfully!");
		}
	};

	const fieldStyle = {
		marginBottom: "25px",
		padding: "15px",
		border: "1px solid #ddd",
		borderRadius: "8px",
	};
	const labelStyle = {
		fontWeight: "bold",
		display: "block",
		marginBottom: "10px",
	};

	return (
		<div
			style={{
				backgroundColor: "#3e5c3e",
				padding: "40px 20px",
				minHeight: "100vh",
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					maxWidth: "640px",
					margin: "auto",
					backgroundColor: "#fff",
					padding: "40px",
					borderRadius: "8px",
					boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
				}}
			>
				<div
					style={{
						borderTop: "10px solid #4285f4",
						borderRadius: "4px 4px 0 0",
						marginTop: "-40px",
						marginHorizontal: "-40px",
					}}
				/>
				<h1 style={{ fontSize: "32px", marginTop: "20px" }}>
					2026 Lindbergh Ultimate Spring Registration
				</h1>
				<p style={{ color: "#666" }}>* Indicates required question</p>
				<hr style={{ margin: "20px 0" }} />

				{/* Athlete Name */}
				<div style={fieldStyle}>
					<label style={labelStyle}>
						Athlete's First & Last Name: *
					</label>
					<input
						type="text"
						style={{
							width: "100%",
							border: "none",
							borderBottom: "1px solid #ccc",
							padding: "8px 0",
						}}
						placeholder="Your answer"
						onChange={(e) =>
							setFormData({
								...formData,
								athleteName: e.target.value,
							})
						}
					/>
					{errors.athleteName && (
						<p style={{ color: "#d93025", fontSize: "12px" }}>
							{errors.athleteName}
						</p>
					)}
				</div>

				{/* Grade Level */}
				<div style={fieldStyle}>
					<label style={labelStyle}>
						Athlete's Current Grade Level: *
					</label>
					{["7th", "8th", "9th", "10th", "11th", "12th"].map(
						(grade) => (
							<div key={grade} style={{ margin: "8px 0" }}>
								<input
									type="radio"
									name="grade"
									value={grade}
									onChange={(e) =>
										setFormData({
											...formData,
											gradeLevel: e.target.value,
										})
									}
								/>{" "}
								{grade}
							</div>
						),
					)}
					{errors.gradeLevel && (
						<p style={{ color: "#d93025", fontSize: "12px" }}>
							{errors.gradeLevel}
						</p>
					)}
				</div>

				{/* Shirt Size */}
				<div style={fieldStyle}>
					<label style={labelStyle}>Athlete's Shirt Size: *</label>
					{["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
						<div key={size} style={{ margin: "8px 0" }}>
							<input
								type="radio"
								name="size"
								value={size}
								onChange={(e) =>
									setFormData({
										...formData,
										shirtSize: e.target.value,
									})
								}
							/>{" "}
							{size}
						</div>
					))}
					{errors.shirtSize && (
						<p style={{ color: "#d93025", fontSize: "12px" }}>
							{errors.shirtSize}
						</p>
					)}
				</div>

				{/* Phone Number */}
				<div style={fieldStyle}>
					<label style={labelStyle}>Athlete's Phone Number: *</label>
					<input
						type="text"
						placeholder="###-###-####"
						style={{
							width: "100%",
							border: "none",
							borderBottom: "1px solid #ccc",
							padding: "8px 0",
						}}
						onChange={(e) =>
							setFormData({
								...formData,
								athletePhone: e.target.value,
							})
						}
					/>
					{errors.athletePhone && (
						<p style={{ color: "#d93025", fontSize: "12px" }}>
							{errors.athletePhone}
						</p>
					)}
				</div>

				<button
					type="submit"
					style={{
						backgroundColor: "#3e5c3e",
						color: "white",
						padding: "12px 24px",
						border: "none",
						borderRadius: "4px",
						fontWeight: "bold",
						cursor: "pointer",
					}}
				>
					Submit Registration
				</button>
			</form>
		</div>
	);
};

export default LindberghRegistrationForm;
