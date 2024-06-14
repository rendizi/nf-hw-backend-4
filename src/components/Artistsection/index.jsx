import React from "react";
import { Link } from "react-router-dom";
import { ArtistsCard } from "../ArtistsCard";
import "./Artistsection.css";
import axios from "axios"
import { useState, useEffect } from "react";

export const Artistsection = ({ title }) => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.post("https://nf-hw-backend-4-production.up.railway.app/api/v5/u/search");
        setArtists(response.data); 
      } catch (error) {
        console.error("Error fetching artists data:", error);
      }
    };

    fetchArtists();
  }, []); 

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
          Popular artists
        </Link>
        <Link
          to="/"
          className="text-sm font-bold tracking-[2px] hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {artists && artists.map((artist, index) => (
          <ArtistsCard
            key={index}
            title={artist.username}
            description={artist.bio}
            imageUrl={artist.profileImage}
          />
        ))}
      </div>
    </div>
  );
};
