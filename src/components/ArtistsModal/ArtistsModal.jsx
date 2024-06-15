import { useEffect, useState } from "react";
import axios from "axios";

const ArtistsModal = () => {
    const [artists, setArtists] = useState(null);
    const [page, setPage] = useState(1); // Initialize page number
    const [limit, setLimit] = useState(10); // Initialize limit

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/search?page=${page}&limit=${limit}`);
                console.log(resp.data, "Data Received"); // Ensure you see the data in console
                setArtists(resp.data);
            } catch (err) {
                console.error("Failed to fetch artists:", err); // Log error
            }
        };

        fetchData();
    }, [page, limit]); // Effect depends on page and limit

    const handleCardClick = (artistId) => {
        // Handle click action
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {artists && artists.map((artist) => (
                <div key={artist._id} className="flex rounded-lg shadow-md p-4 w-full max-w-md cursor-pointer">
                    <img className="w-20 h-20 rounded-md object-cover" src={artist.profileImage} alt={artist.username} />
                    <div className="ml-4 w-2/3">
                        <p className="text-lg font-semibold mb-2">{artist.username}</p>
                        <p className="text-sm">{artist.bio}</p>
                    </div>
                </div>
            ))}
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePrevPage}
                    disabled={page <= 1} // Disable previous button if on the first page
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ArtistsModal;
