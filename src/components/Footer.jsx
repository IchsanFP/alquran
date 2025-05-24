export default function Footer() {
    return (
        <footer className="mt-12 py-6 border-t border-twine-300 dark:border-twine-700">
            <div className="mx-auto text-center">
                <p className="text-twine-600 dark:text-twine-400 text-sm">
                    © 2025 Al-Quran Online
                </p>
                
                <p className="text-twine-500 dark:text-twine-500 text-xs mt-1">
                    Dibuat oleh <a 
                        href="https://www.instagram.com/ichsanfadhlika/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline font-medium"
                    >
                        Ichsan Fadhlika Pagestu
                    </a>
                </p>
                
                <p className="text-twine-400 dark:text-twine-600 text-xs mt-1">
                    Data dari{" "}
                    <a 
                        href="https://equran.id" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-twine-800 dark:hover:text-twine-300 underline"
                    >
                        EQuran.id API
                    </a>
                </p>
            </div>
        </footer>
    );
}