import React, { useEffect, useState } from "react";
import { RiPlayFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const PlaylistsCard = ({ id, setSong }) => {
  const [songs, setSongs] = useState(null)

  useEffect(()=>{
    const sm = async() => {
      try{
        const resp = await axios.get(`https://nf-hw-backend-4-production.up.railway.app/api/v5/p/song/${id}`);
        const filteredSongs = resp.data.songs.filter(song => song !== null);
        setSongs(filteredSongs);
        console.log(filteredSongs,"FILTERED"); 
        
      }catch(err){  
        toast(err)
        console.log(err )
      }
    }
    sm()
  },[])

  useEffect(()=>{
    console.log(songs)
  },[songs])


  return (
    <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {songs && songs.map((el) => (
        <Link
          key={el.id} 
          to={``}
          className="bg-main-lg rounded-lg p-4 hover:bg-main-lgHover transition-all group w-60"
        >
<div className="mb-4 relative flex justify-center items-center" onClick={() => setSong(el)}>
<img
              src={el.image}
              alt="Album"
              className="w-48 h-48 rounded-xl drop-shadow-2xl"
            />
            <button className="p-3 text-3xl bg-main-green rounded-full text-gray absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ease-out bg-[#65D46E] text-black" >
              <RiPlayFill />
            </button>
          </div>
          <div>
            <h5 className="font-medium text-gray-100 mb-2">{el.title}</h5>
            <p className="text-gray-400 text-sm">{el.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
  
};
