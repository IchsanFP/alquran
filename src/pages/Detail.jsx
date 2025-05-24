import { ChevronLeftIcon, ChevronRightIcon, BookOpenIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dropdown } from '../components/Dropdown';
import { PlayButton } from '../components/PlayButton';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AboutSurahPopup } from '../components/AboutSurahPopup';

export default function Detail() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [surah, setSurah] = useState(null);
    const [ayat, setAyat] = useState([]);
    const [selectedQori, setSelectedQori] = useState(null);
    const [selectedAyat, setSelectedAyat] = useState(1);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [showAboutPopup, setShowAboutPopup] = useState(false);
    const { namaLatin } = useParams();
    const ayatRefs = useRef({});

    const filterOptions = [
        { value: "01", label: "Abdullah-Al-Juhany" },
        { value: "02", label: "Abdul-Muhsin-Al-Qasim" },
        { value: "03", label: "Abdurrahman-as-Sudais" },
        { value: "04", label: "Ibrahim-Al-Dossari" },
        { value: "05", label: "Misyari-Rasyid-Al-Afasi" },
    ];

    useEffect(() => {
        const fetchSurahDetail = async () => {
            try {
                const listSurah = await axios.get('https://equran.id/api/v2/surat');
                const foundSurah = listSurah.data.data.find(s => s.namaLatin === namaLatin);
                
                if (foundSurah) {
                    const response = await axios.get(`https://equran.id/api/v2/surat/${foundSurah.nomor}`);
                    setSurah(response.data.data);
                    setAyat(response.data.data.ayat);
                    setSelectedQori(filterOptions[0]);
                    setSelectedAyat(1);
                    
                    // Scroll to top on initial load
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };
        
        fetchSurahDetail();

        return () => {
            if (currentAudio) {
                currentAudio.pause();
            }
        };
    }, [namaLatin]);

    const ayatOptions = Array.from({ length: surah?.jumlahAyat || 0 }, (_, i) => ({
        value: i + 1,
        label: `Ayat ${i + 1}`
    }));

    const scrollToAyat = (ayatNumber) => {
        const ayatElement = ayatRefs.current[ayatNumber];
        if (ayatElement) {
            ayatElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const handleAyatChange = (ayatNumber) => {
        setSelectedAyat(ayatNumber);
        setTimeout(() => {
            scrollToAyat(ayatNumber);
        }, 50);
    };

    const handlePlay = (ayatNumber, audioUrl) => {
        scrollToAyat(ayatNumber);

        if (currentlyPlaying === ayatNumber && isPlaying) {
            currentAudio.pause();
            setIsPlaying(false);
            setCurrentlyPlaying(null);
            return;
        }

        if (currentAudio) {
            currentAudio.pause();
        }

        const audio = new Audio(audioUrl);
        setCurrentAudio(audio);
        setCurrentlyPlaying(ayatNumber);
        setIsPlaying(true);

        audio.play();

        audio.onended = () => {
            setIsPlaying(false);
            setCurrentlyPlaying(null);
        };
    };

    const onFilterChange = (type, value) => {
        if (type === "type") {
            const selected = filterOptions.find(opt => opt.value === value);
            setSelectedQori(selected);
            if (currentAudio) {
                currentAudio.pause();
                setIsPlaying(false);
                setCurrentlyPlaying(null);
            }
        } else if (type === "ayat") {
            handleAyatChange(parseInt(value));
        }
    };

    if (!surah || !selectedQori) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        )
        // return <div className="m-auto justify-center flex flex-col items-center mt-28 mb-28 px-5 md:px-8 lg:px-16 gap-6">Loading...</div>;
    }

    return (
        <div className='m-auto justify-center flex flex-col items-center mt-28 mb-28 px-4 sm:px-6 md:px-8 lg:px-16 gap-6 max-w-6xl w-full'>
            {/* Back Button */}
            <div className='w-full'>
                <Link to="/" className="flex items-center gap-1 cursor-pointer text-sm text-twine-950 dark:text-twine-50 hover:underline w-fit">
                    <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-twine-950 dark:text-twine-50"/>
                    Kembali
                </Link>
            </div>

            {/* Surah Header */}
            <div className="bg-twine-200 dark:bg-twine-800 rounded-lg shadow-md p-4 sm:p-6 gap-4 flex flex-col w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 justify-between">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-twine-950 dark:text-twine-50 font-semibold text-lg sm:text-xl">{surah.namaLatin}</span>
                        <span className="text-twine-700 dark:text-twine-300 font-normal text-xs sm:text-sm">{surah.arti} • {surah.jumlahAyat} Ayat</span>
                    </div>
                    <div className="text-twine-950 dark:text-twine-50 font-semibold text-2xl sm:text-3xl self-end sm:self-auto font-arabic">{surah.nama}</div>
                </div>
                <div className="w-full h-[1px] bg-twine-600 dark:bg-twine-400"></div>
                <div className='text-twine-800 dark:text-twine-200 font-normal text-xs sm:text-sm'>{surah.tempatTurun} • {surah.jumlahAyat} Ayat</div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button 
                        onClick={() => handlePlay('full', surah.audioFull[selectedQori.value])}
                        className='w-full sm:w-fit flex gap-2 px-3 py-2 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs sm:text-sm transition-all duration-300 shadow-md'
                    >
                        {isPlaying && currentlyPlaying === 'full' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-twine-50" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-twine-50" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        )}
                        Putar Surah Penuh
                    </button>
                    <button 
                        onClick={() => setShowAboutPopup(true)}
                        className='w-full sm:w-fit flex gap-2 px-3 py-2 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs sm:text-sm transition-all duration-300 shadow-md'
                    >
                        <BookOpenIcon className='w-4 h-4 sm:w-5 sm:h-5 text-twine-50'/>
                        Tentang Surah {surah.namaLatin}
                    </button>
                </div>
            </div>

            {/* Navigation and Filter Controls */}
            <div className='w-full flex flex-col justify-center gap-4 lg:flex-row lg:justify-between lg:items-center'>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                    {surah.suratSebelumnya && (
                        <Link 
                            to={`/${surah.suratSebelumnya.namaLatin}`}
                            className='w-fit flex gap-2 px-3 py-2 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs sm:text-sm transition-all duration-300 shadow-md'
                        >
                            <ChevronLeftIcon className='w-4 h-4 sm:w-5 sm:h-5 text-twine-50'/>
                            {surah.suratSebelumnya.namaLatin}
                        </Link>
                    )}
                    {surah.suratSelanjutnya && (
                        <Link 
                            to={`/${surah.suratSelanjutnya.namaLatin}`}
                            className='w-fit flex gap-2 px-3 py-2 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs sm:text-sm transition-all duration-300 shadow-md'
                        >
                            {surah.suratSelanjutnya.namaLatin}
                            <ChevronRightIcon className='w-4 h-4 sm:w-5 sm:h-5 text-twine-50'/>
                        </Link>
                    )}
                </div>
                <div className='flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto'>
                    <div className='w-full sm:w-32 md:w-40'>
                        <Dropdown
                            options={ayatOptions}
                            selectedOption={ayatOptions.find(opt => opt.value === selectedAyat)}
                            onSelect={(option) => onFilterChange("ayat", option.value)}
                            placeholder="Pilih Ayat"
                        />
                    </div>
                    <div className='w-full sm:w-48 md:w-64'>
                        <Dropdown
                            options={filterOptions}
                            selectedOption={selectedQori}
                            onSelect={(option) => onFilterChange("type", option.value)}
                            placeholder="Pilih Qori"
                        />
                    </div>
                </div>
            </div>
            
            <div className='w-full mx-auto justify-center items-center'>
                <h1 className='text-twine-950 dark:text-twine-50 text-center text-2xl sm:text-3xl leading-tight font-arabic'>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
            </div>

            {/* Ayat List */}
            <div className='flex flex-col gap-4 items-center justify-center w-full'>                 
                {ayat.map((item) => (
                    <div 
                        key={item.nomorAyat} 
                        ref={(el) => (ayatRefs.current[item.nomorAyat] = el)}
                        className='flex gap-3 p-3 sm:p-4 bg-twine-50 dark:bg-twine-950 w-full shadow-lg rounded-lg'
                    >
                        <div className='flex flex-col gap-3 items-center'>
                            <div className='flex justify-center items-center rounded-full size-7 sm:size-8 bg-twine-400 font-medium text-xs sm:text-sm text-twine-50'>{item.nomorAyat}</div>
                            <PlayButton 
                                isPlaying={isPlaying && currentlyPlaying === item.nomorAyat} 
                                onClick={() => handlePlay(item.nomorAyat, item.audio[selectedQori.value])} 
                                size="sm"
                            />
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                             <div className='w-full'>
                                <h1 className='text-twine-950 dark:text-twine-50 text-2xl sm:text-3xl leading-tight text-right font-arabic'>
                                    {item.teksArab}
                                </h1>
                            </div>
                            <p className='text-twine-700 dark:text-twine-300 text-xs sm:text-sm'>{item.teksLatin}</p>
                            <span className="w-full h-[1px] bg-twine-600 dark:bg-twine-400"></span>
                            <p className='text-twine-800 dark:text-twine-200 text-xs sm:text-sm'>{item.teksIndonesia}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center w-full">
                {surah.suratSebelumnya && (
                    <Link 
                        to={`/${surah.suratSebelumnya.namaLatin}`}
                        className='w-fit flex gap-2 px-3 py-2 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs sm:text-sm transition-all duration-300 shadow-md'
                    >
                        <ChevronLeftIcon className='w-4 h-4 sm:w-5 sm:h-5 text-twine-50'/>
                        {surah.suratSebelumnya.namaLatin}
                    </Link>
                )}
                {surah.suratSelanjutnya && (
                    <Link 
                        to={`/${surah.suratSelanjutnya.namaLatin}`}
                        className='w-fit flex gap-2 px-3 py-2 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs sm:text-sm transition-all duration-300 shadow-md'
                    >
                        {surah.suratSelanjutnya.namaLatin}
                        <ChevronRightIcon className='w-4 h-4 sm:w-5 sm:h-5 text-twine-50'/>
                    </Link>
                )}
            </div>

            {/* About Surah Popup */}
            {showAboutPopup && (
                <AboutSurahPopup
                    surah={surah} 
                    filterOptions={filterOptions} 
                    onClose={() => setShowAboutPopup(false)}
                    handlePlay={handlePlay}
                />
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}