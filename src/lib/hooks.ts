import { useEffect, useState } from "react";

export const useDarkMode = () => {
	const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		document.body.classList.toggle('dark', isDarkMode);
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode(prevDarkMode => !prevDarkMode);
	}

	return {isDarkMode, toggleDarkMode, prefersDarkMode};
};