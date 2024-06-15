import React from "react";
import { Link } from "react-router-dom";
import { PlaylistsCard } from "../PlaylistCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export const Playlistsection = ({ title }) => {
  const [playlists, setPlaylists] = useState([])
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const fetchPlaylistsAndSongs = async () => {
      try {
        const resp = await axios.get("https://nf-hw-backend-4-production.up.railway.app/api/v5/p/p/bibolmashina?limit=4");
        const fetchedPlaylists = resp.data;
        setPlaylists(fetchedPlaylists);

        const songsArray = await Promise.all(
          fetchedPlaylists.map(async (playlist) => {
            const songsResp = await axios.get(`https://nf-hw-backend-4-production.up.railway.app/api/v5/p/song/${playlist._id}`);
            return songsResp.data; // Assuming songs are returned as data
          })
        );

        setSongs((prev)=>[...prev,songsArray]);

      } catch (err) {
        toast(err.message || 'Something went wrong!');
      }
    };

    fetchPlaylistsAndSongs();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
          Какое то название плейлиста
        </Link>
        <Link
          to="/"
          className="text-sm font-bold tracking-[2px] hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {songs && songs.map((playlist, index) => (
          <PlaylistsCard
            key={index}
            title={playlist.title}
            description={playlist.description}
            imageUrl={playlist.image}
          />
        ))}
      </div>
    </div>
  );
};
