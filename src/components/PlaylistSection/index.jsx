import React from "react";
import { Link } from "react-router-dom";
import { PlaylistsCard } from "../PlaylistCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export const Playlistsection = ({ title }) => {
  const [playlists, setPlaylists] = useState([])
  useEffect(()=>{
    const some = async() => {
      try{
    const resp = await axios.get("https://nf-hw-backend-4-production.up.railway.app/api/v5/p/p/bibolmashina?limit=4")
    setPlaylists(resp.data)
    }catch (err){
      toast(err)
    }
    }
    some()

  },[])

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
        {playlists && playlists.map((playlist, index) => (
          <PlaylistsCard
            key={index}
            title={playlist.title}
            description={playlist.description}
            imageUrl={playlist.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
