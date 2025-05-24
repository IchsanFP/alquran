import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const SearchBar = ({ onSearch, searchTerm = "" }) => {
    const [query, setQuery] = useState(searchTerm);

    useEffect(() => {
        setQuery(searchTerm);
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery); // langsung panggil pencarian setiap ketik
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    // onChange={(e) => setQuery(e.target.value)}
                    onChange={handleChange}
                    placeholder="Cari surah berdasarkan nama, arti, atau nomor..."
                    className="w-full text-sm px-3 py-2 pr-12 rounded-lg border border-twine-300 dark:border-twine-700 bg-twine-200 dark:bg-twine-900 text-twine-950 dark:text-twine-50 focus:outline-none focus:ring-2 focus:ring-twine-400 transition-all duration-300"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-twine-500 dark:text-twine-400 hover:text-twine-700 dark:hover:text-twine-300 transition-colors duration-300"
                >
                    <MagnifyingGlassIcon className="w-5 h-5"/>
                </button>
            </div>
        </form>
    );
    };