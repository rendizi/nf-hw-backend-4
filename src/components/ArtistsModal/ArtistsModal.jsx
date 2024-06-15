import { useEffect, useState } from "react";
import axios from "axios";
import { BiTrophy } from "react-icons/bi";
import { toast } from "react-toastify";

const ArtistsModal = () => {
    const [artists, setArtists] = useState(null);
    const [page, setPage] = useState(1); 
    const [limit, setLimit] = useState(4); 
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/search?page=${page}&limit=${limit}&query=${query}`);
                console.log(resp.data, "Data Received"); 
                setArtists(resp.data);
            } catch (err) {
                console.error("Failed to fetch artists:", err); 
            }
        };

        fetchData();
    }, [page, limit]); 

    const fetchDataAnother = async () => {
        try {
            const resp = await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/search?page=${page}&limit=${limit}&query=${query}`);
            console.log(resp.data, "Data Received"); 
            setArtists(resp.data);
        } catch (err) {
            console.error("Failed to fetch artists:", err); 
        }
    };

    const handleCardClick = (artistId) => {
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
            <input type="text" placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <button className="btn btn-primary" onClick={fetchDataAnother}>FInd</button>
            {artists && artists.map((artist) => (
                <button key={artist._id} className="flex rounded-lg shadow-md p-4 w-full max-w-md cursor-pointer" onClick={()=>{
                    try{
                        document.getElementById("my_modal_6").close()
                        document.getElementById(`another-${artist._id}`).show()
                    }catch (err){
                        toast.error(err)
                    }
                }}>
                    <img className="w-20 h-20 rounded-md object-cover" src={artist.profileImage} alt={artist.username} />
                    <div className="ml-4 w-2/3">
                        <p className="text-lg font-semibold mb-2">{artist.username}</p>
                        <p className="text-sm">{artist.bio}</p>
                    </div>
                </button>
            ))}
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePrevPage}
                    disabled={page <= 1} 
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
