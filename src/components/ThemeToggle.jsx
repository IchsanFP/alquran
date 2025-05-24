
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Cek preferensi user di local storage atau sistem
        const isDark = localStorage.getItem('darkMode') === 'true' || 
                        (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.documentElement.classList.toggle('dark', newMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-twine-950 dark:focus:ring-twine-50"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? (
                <SunIcon className="h-6 w-6 text-twine-50" />
            ) : (
                <MoonIcon className="h-6 w-6 text-twine-950" />
            )}
        </button>
    );
};



