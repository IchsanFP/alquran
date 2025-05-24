import { XMarkIcon } from '@heroicons/react/24/outline';

export const AboutSurahPopup = ({ surah, filterOptions, onClose, handlePlay }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div 
            className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50 p-4"
            // onClick={onClose}
             onClick={handleOverlayClick}
        >
            <div className="bg-twine-50 dark:bg-twine-950 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-twine-200 dark:border-twine-700 sticky top-0 bg-twine-100 dark:bg-twine-900 z-10">
                    <h3 className="text-lg font-semibold text-twine-950 dark:text-twine-50">
                        Tentang Surah {surah.namaLatin}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="cursor-pointer text-twine-950 dark:text-twine-50"
                        aria-label="Close popup"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Informasi Surah */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-twine-900 dark:text-twine-50 mb-2">Informasi Surah</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-twine-600 dark:text-twine-400">Nama Latin</span>
                                        <span className="font-medium text-twine-900 dark:text-twine-50">{surah.namaLatin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-twine-600 dark:text-twine-400">Nama Arab</span>
                                        <span className="font-medium text-xl text-twine-900 dark:text-twine-50">{surah.nama}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-twine-600 dark:text-twine-400">Arti</span>
                                        <span className="font-medium text-twine-900 dark:text-twine-50">{surah.arti}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-twine-600 dark:text-twine-400">Jumlah Ayat</span>
                                        <span className="font-medium text-twine-900 dark:text-twine-50">{surah.jumlahAyat}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-twine-600 dark:text-twine-400">Tempat Turun</span>
                                        <span className="font-medium text-twine-900 dark:text-twine-50">{surah.tempatTurun}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-twine-600 dark:text-twine-400">Nomor Surah</span>
                                        <span className="font-medium text-twine-900 dark:text-twine-50">{surah.nomor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Surah Terkait */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-twine-900 dark:text-twine-50 mb-2">Surah Terkait</h4>
                                <div className="space-y-3 text-sm">
                                    {surah.suratSebelumnya && (
                                        <div className="flex justify-between">
                                            <span className="text-twine-600 dark:text-twine-400">Surah Sebelumnya</span>
                                            <span className="font-medium text-twine-900 dark:text-twine-50">
                                                {surah.suratSebelumnya.namaLatin} (No. {surah.suratSebelumnya.nomor})
                                            </span>
                                        </div>
                                    )}
                                    {surah.suratSelanjutnya && (
                                        <div className="flex justify-between">
                                            <span className="text-twine-600 dark:text-twine-400">Surah Selanjutnya</span>
                                            <span className="font-medium text-twine-900 dark:text-twine-50">
                                                {surah.suratSelanjutnya.namaLatin} (No. {surah.suratSelanjutnya.nomor})
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium text-twine-900 dark:text-twine-50 mb-2">Audio Tersedia</h4>
                                <div className="space-y-2 text-sm">
                                    {filterOptions.map((qori) => (
                                        <div key={qori.value} className="flex justify-between items-center">
                                            <span className="text-twine-600 dark:text-twine-400">{qori.label}</span>
                                            <button 
                                                onClick={() => {
                                                    handlePlay('full', surah.audioFull[qori.value]);
                                                    onClose();
                                                }}
                                                // className="px-2 py-1 bg-twine-100 hover:bg-twine-200 dark:bg-twine-700 dark:hover:bg-twine-600 rounded text-xs"
                                                className='w-fit flex px-2 py-1 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs transition-all duration-300 shadow-md'
                                            >
                                                Putar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-twine-900 dark:text-twine-50 mb-2">Deskripsi Surah</h4>
                        <p className="text-sm text-twine-800 dark:text-twine-200 leading-relaxed">
                            {surah.deskripsi || 'Tidak ada deskripsi tambahan yang tersedia untuk surah ini.'}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end p-4 border-t border-twine-200 dark:border-twine-700 sticky bottom-0 bg-twine-100 dark:bg-twine-900">
                    <button
                        onClick={onClose}
                        className='w-fit flex gap-2 px-3 py-2 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs sm:text-sm transition-all duration-300 shadow-md'
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};