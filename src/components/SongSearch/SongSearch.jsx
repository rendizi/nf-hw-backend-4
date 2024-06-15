import { useState } from "react";
import axios from "axios";

const SongSearch = ({setSong}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const url = `https://nf-hw-backend-4-production.up.railway.app/api/v5/s/search?query=${query}&limit=5`;
            const response = await fetch(url);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
      const handleDelete = async (id) => {
        try {
            const url = `https://nf-hw-backend-4-production.up.railway.app/api/v5/s/${id}`;
            await axios.delete(url);
            handleSearch();
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };
    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 rounded-lg">
            <input
                className="w-full border-2 border-gray-200 p-2 rounded-md"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query"
            />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-2"
                onClick={handleSearch}
            >
                Search
            </button>
    
            <div className="mt-4">
                {results.map((song) => (
                    <div key={song._id} className="mb-4 p-4 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer">
                        <img className="w-20 h-20 rounded-lg" src={song.image} alt={song.title} />
                        <div>
                            <h3 className="text-xl font-semibold">{song.title}</h3>
                            <p className="text-gray-600">By: {song.author.username}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(song._id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md ml-auto"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default SongSearch;
