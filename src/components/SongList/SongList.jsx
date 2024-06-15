import React, { useEffect, useState } from "react";
import axios from "axios";
import Song from "../SongPlayer/Song";
import { toast } from "react-toastify";

const SongList = ({ id, info, setSong }) => {
    const [songs, setSongs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://nf-hw-backend-4-production.up.railway.app/api/v5/p/song/${id}`, {
                    params: {
                        limit: pageSize,
                        page: currentPage,
                    },
                });
                const filteredSongs = response.data.songs.filter(song => song !== null);
                setSongs(filteredSongs);
            } catch (error) {
                console.error("Error fetching songs:", error);
                toast.error("Failed to fetch songs.");
            }
        };

        fetchData();
    }, [id, currentPage, pageSize]);

    useEffect(() => {
        console.log("Songs:", songs);
    }, [songs]);

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div>
            {info && (
    <div className="flex items-center" >
        <img src={info.image} className="w-14 h-14 rounded-full" alt="Info Image" />
        <div className="ml-2">
            <p className="font-bold">{info.title}</p>
            <p>{info.description}</p>
        </div>
    </div>
)}


            {songs.map(song => (
                <Song key={song.id} song={song} setSong={setSong}/>
            ))}
            <div className="flex justify-between mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SongList;
