import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FavSongs = () => {
  const [songs, setSongs] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5; // Fixed to 5 per page

  const fetchLikedSongs = async (page, limit) => {
    try {
      const response = await axios.post(
        `https://nf-hw-backend-4-production.up.railway.app/api/v5/u/liked?page=${page}&limit=${limit}`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setSongs(response.data);
      console.log(response.data, "FAVS");
    } catch (error) {
      toast.error("Failed to fetch liked songs.");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchLikedSongs(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Favorite Songs</h2>
      {songs ? (
        <div>
          <ul>
            {songs.map((song) => (
              <li key={song._id} className="flex items-center mb-4">
                <img
                  src={song.songId.image}
                  alt={song.songId.title}
                  className="w-20 h-20 mr-4 rounded"
                />
                <div className="ml-5">
                  <h3 className="text-lg font-bold">{song.songId.title}</h3>
                  <p className="text-gray-600">By: {song.songId.author}</p>
                </div>
              </li>
            ))}
          </ul>
          {/* Example of pagination controls */}
          <div>
            <button onClick={() => handlePageChange(page - 1)}>Previous Page</button>
            <button className="ml-5" onClick={() => handlePageChange(page + 1)}>Next Page</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FavSongs;
