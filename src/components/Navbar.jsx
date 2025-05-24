import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-5 md:px-8 lg:px-16 py-4 bg-twine-100 dark:bg-twine-900 shadow-sm fixed top-0 w-full z-50">
            {/* Kiri: Judul */}
            <div className="flex items-center text-lg sm:text-xl font-bold text-twine-950 dark:text-twine-50">
                Al-Quran Online
            </div>

            {/* Kanan: Toogle */}
            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
        </nav>
    );
}


