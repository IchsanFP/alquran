export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 border-4 border-twine-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-twine-700 dark:text-twine-300">Memuat...</span>
        </div>
    );
}