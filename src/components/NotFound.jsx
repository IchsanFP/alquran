import { Link } from 'react-router-dom';

export default function NotFound({ message = 'Halaman tidak ditemukan' }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold text-twine-800 dark:text-twine-200">404</h1>
            <p className="text-lg text-twine-700 dark:text-twine-300">{message}</p>
            <Link 
                to="/" 
                className="px-4 py-2 bg-twine-500 text-white rounded hover:bg-twine-600 transition-colors"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
}