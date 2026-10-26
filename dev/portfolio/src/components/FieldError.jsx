import React from "react";

const FieldError = ({ errors, name }) => {
	const message = errors?.[name];
	if (!message) return null;

	return <p className="mt-1 text-sm text-lu-yellow">{message}</p>;
};

export default FieldError;
