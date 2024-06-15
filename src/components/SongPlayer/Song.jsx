import React from "react";

const Song = ({ song, setSong }) => {
    return (
        song && (
<div className="p-4 rounded-lg shadow-md max-w-lg mx-auto flex items-center space-x-4" onClick={()=>setSong(song)}>
                <img
                    src={song.image}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Song cover"
                />
                <div className="flex-1">
                    <h2 className="text-white text-xl font-semibold">{song.title}</h2>
                    <p className="text-gray-300">by {song.author}</p>
                </div>
            </div>
        )
    );
};

export default Song;
