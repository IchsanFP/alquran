import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
export const Dropdown = ({ options, selectedOption, onSelect, placeholder = "Pilih..." }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (option) => {
		onSelect(option);
		setIsOpen(false);
	};

	return (
		<div className="relative items-center" ref={dropdownRef}>
			<button
				type="button"
				onClick={toggleDropdown}
				className="flex text-sm cursor-pointer items-center justify-between w-full px-3 py-2 rounded-lg border border-twine-500 dark:border-twine-700 bg-twine-500 dark:bg-twine-700 text-twine-50 focus:outline-none focus:ring-2 focus:ring-twine-600 dark:focus:ring-twine-400 transition-all duration-300"
			>
				<span>{selectedOption ? selectedOption.label : placeholder}</span>
				<ChevronDownIcon className={`w-5 h-5 ml-3 ${isOpen ? "transform rotate-180" : ""}`}/>
			</button>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 rounded-lg shadow-lg bg-twine-50 dark:bg-twine-950 border border-twine-200 dark:border-twine-700 overflow-hidden transition-all duration-300">
					<ul className="py-1 max-h-60 overflow-auto text-sm text-twine-950 dark:text-twine-50">
						{options.map((option) => (
							<li
								key={option.value}
								onClick={() => handleSelect(option)}
								className={`px-4 py-2 cursor-pointer hover:bg-twine-100 dark:hover:bg-twine-800 transition-colors duration-200 ${
								selectedOption?.value === option.value
									? "bg-twine-200 dark:bg-twine-700"
									: ""
								}`}
							>
								{option.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};