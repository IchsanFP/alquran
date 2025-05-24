import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import axios from 'axios'

export default function Home() {
    const [surahs, setSurahs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await axios.get('https://equran.id/api/v2/surat')
                setSurahs(response.data.data)
            } catch (error) {
                console.error('Error fetching data:', error)
                setError('Gagal memuat data surah. Silakan coba lagi.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchSurahs()
    }, [])

    const filteredSurahs = surahs.filter((surah) =>
        surah.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.arti.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.nomor.toString().includes(searchTerm)
    )

    const handleSearch = (query) => {
        setSearchTerm(query);
        setIsTyping(query.length > 0);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <p className="text-red-500 text-lg">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-twine-500 text-white rounded hover:bg-twine-600"
                >
                    Muat Ulang
                </button>
            </div>
        )
    }

    return (
        <div className="m-auto justify-center flex flex-col item-center my-28 px-5 md:px-8 lg:px-16">
            {/* Header */}
            <header className="w-full mb-8 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-twine-800 dark:text-twine-100 mb-2">
                    Al-Quran Online
                </h1>
                <p className="text-twine-600 dark:text-twine-400 text-sm sm:text-base">
                    Baca dan dengarkan Al-Quran dengan mudah
                </p>
            </header>
            
            {/* Search Bar */}
            <div className="mb-4 text-center">
                <SearchBar onSearch={handleSearch} searchTerm={searchTerm}/>
                {isTyping && (
                    <p className="text-xs text-twine-600 dark:text-twine-400 mt-1">
                        Ditemukan {filteredSurahs.length} hasil pencarian
                    </p>
                )}
            </div>

            {/* Surah */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSurahs.length > 0 ? (
                    filteredSurahs.map((surah) => (
                        <Link to={`/${surah.namaLatin}`} key={surah.nomor}>
                            <div className="bg-twine-200 dark:bg-twine-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-twine-700 dark:hover:shadow-twine-300 transition-shadow">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="flex gap-4">
                                        <div className="flex justify-center items-center size-10 bg-twine-400 dark:bg-twine-600 rounded-full font-semibold text-sm text-twine-50">
                                            {surah.nomor}
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-twine-950 dark:text-twine-50 font-semibold text-sm sm:text-base">
                                                {surah.namaLatin}
                                            </span>
                                            <span className="text-twine-700 dark:text-twine-300 font-normal text-xs">
                                                {surah.arti} • {surah.jumlahAyat} Ayat
                                            </span>
                                        </div>
                                    </div>
                                    <h1 className="text-twine-950 dark:text-twine-50 font-semibold text-lg md:text-xl font-arabic">
                                        {surah.nama}
                                    </h1>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="text-twine-600 dark:text-twine-400 mb-4">
                            <FaceFrownIcon className="h-12 w-12 mx-auto"/>
                        </div>
                        <p className="text-twine-600 dark:text-twine-400">
                            Tidak ditemukan surah dengan nama "<span className="font-medium">{searchTerm}</span>"
                        </p>
                        
                        <button 
                            onClick={() => setSearchTerm('')}
                            // onClick={() => {
                            //     setSearchTerm('');
                            //     setIsTyping(false);
                            // }}
                            className='mx-auto mt-4 w-fit flex gap-2 px-3 py-2 justify-center items-center font-medium rounded-lg cursor-pointer bg-twine-500 hover:bg-twine-600 dark:bg-twine-700 dark:hover:bg-twine-800 text-twine-50 text-xs sm:text-sm transition-all duration-300 shadow-md'
                        >
                            Reset Pencarian
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}