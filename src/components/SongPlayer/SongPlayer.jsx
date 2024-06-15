import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { io } from "socket.io-client";

const SongPlayer = ({ song, socket}) => {
    const [liked, setLiked] = useState(false); 
    const [audioKey, setAudioKey] = useState(""); 

    useEffect(() => {
        if (song) {
            setAudioKey(song._id);
            socket.emit("send-listens-to", localStorage.getItem("token") | "",
                {listens: {
                    username: localStorage.getItem("username"),
                    title: song.title,
                    author: song.author
                }
            });
            
            return () => {
                socket.emit("send-stop-listens-to", localStorage.getItem("token"));
            };
        }
    }, [song]);
    

    const handleLike = async () => {
        try {
            if (!liked) {
                await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/like/${song._id}`, null, { headers: { Authorization: localStorage.getItem("token") }});
            } else {
                await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/unlike/${song._id}`, null, { headers: { Authorization: localStorage.getItem("token") }});
            }
            setLiked(!liked); 
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        song && (
            <div className="fixed bottom-0 right-0 bg-gray-800 text-white p-4 flex items-center space-x-4">
                <img
                    src={song.image}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Song cover"
                />
                <div className="flex-1">
                    <h2 className="text-white text-xl font-semibold">{song.title}</h2>
                    <p className="text-gray-300">by {song.author}</p>
                </div>
                <audio key={audioKey} controls className="flex-1 ml-4" autoPlay>
                    <source src={song.song} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <button onClick={handleLike} className="text-white focus:outline-none">
                    {liked ? (
                        <FontAwesomeIcon icon={solidHeart} /> 
                    ) : (
                        <FontAwesomeIcon icon={regularHeart} />
                    )}
                </button>
            </div>
        )
    );
};

export default SongPlayer;
