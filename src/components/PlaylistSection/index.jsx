import React from "react";
import { Link } from "react-router-dom";
import { PlaylistsCard } from "../PlaylistCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import AddSong from "../AddSong/AddSong";


export const Playlistsection = ({ setId, setInfo, setSong }) => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const fetchPlaylistsAndSongs = async () => {
      try {
        const resp = await axios.get("https://nf-hw-backend-4-production.up.railway.app/api/v5/p/p");
        const fetchedPlaylists = resp.data;
        setPlaylists(fetchedPlaylists);

      } catch (err) {
        toast(err.message || 'Something went wrong!');
      }
    };

    fetchPlaylistsAndSongs();
  }, []);

  const showSongs = (el) => {
    try{
      setInfo({ title: el.title, description: el.description, image: el.image });
      setId(el._id)
      document.getElementById("my_modal_1").show()
    }catch (err){
      toast(err)
    }
  }

  return (
    <div className="mb-8">
      {playlists && playlists.map((el, index) => 
      <div>      <div className="flex items-center justify-between mb-8" key={index}>
      <Link to="/" className="text-2xl font-bold text-white hover:underline">
        {el.title}
      </Link>
      <div>
      <button
      onClick={()=>{
        try{
          document.getElementById(el._id).show()
        }catch (err){
          toast(err)
        }
      }}
        className="text-sm font-bold tracking-[2px] hover:underline"
      >
        Add new
      </button>
      <button
      onClick={()=>showSongs(el)}
        className="text-sm font-bold tracking-[2px] hover:underline ml-5"
      >
        Show all
      </button>
      </div>
    </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <PlaylistsCard
            key={el._id}
            id={el._id}
            setSong={setSong}
          />
      </div>
      <dialog id={el._id} className="modal">
        <div className="modal-box">
            <AddSong playlistId={el._id}/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      </div>
      
      )}
      
    </div>
  );
};
