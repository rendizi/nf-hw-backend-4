import React, { useState } from "react";
import { Artistsection } from "../../components/Artistsection";
import Header from "../../components/Header";
import { Playlistsection } from "../../components/PlaylistSection";
import Sidebar from "../../components/Sidebar";
import "./Home.css";
import { Footer } from "../../components/footer";
import { useEffect } from "react";
import axios from "axios";
import Upload from "../../components/Upload/Upload";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";
import SongList from "../../components/SongList/SongList";
import SongPlayer from "../../components/SongPlayer/SongPlayer";
import CreateArtist from "../../components/CreateArtist/CreateArtist";
import EditArtist from "../../components/EditArtist/EditArtist";
import ArtistsModal from "../../components/ArtistsModal/ArtistsModal";
import SongSearch from "../../components/SongSearch/SongSearch";
import AddSong from "../../components/AddSong/AddSong";

export const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [signedIn, setSignedIn] = useState(false)
  const [id, setId] = useState(null)
  const [info, setInfo] = useState(null)
  const [song, setSong] = useState(null)
  
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
          console.error("No refresh token found in localStorage");
          return;
        }

        const resp = await axios.post("https://nf-hw-backend-4-production.up.railway.app/api/v5/u/refresh-token", {
          token: refresh,
        });

        if (resp.status === 200) {
          localStorage.setItem("token", resp.data.accessToken);
          localStorage.setItem("refresh", resp.data.refreshToken);
          setSignedIn(true);
        } else if (resp.status === 401) {
          console.error("Unauthorized request - status 401");
        }
      } catch (error) {
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    };

    fetchToken();
  }, []);

  useEffect(()=>console.log(song),[song])

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} signedIn={signedIn}/>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} setId={setId} setSong={setSong} />
      <div className="bg-custom-section pt-28 md:pl-72 p-8">
        <Artistsection></Artistsection>
        <Playlistsection setId={setId} setInfo={setInfo} setSong={setSong}></Playlistsection>
        <Footer></Footer>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <SongList id={id} info={info} setSong={setSong
          }/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <Upload />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <CreatePlaylist />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <CreateArtist/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="my_modal_6" className="modal">
        <div className="modal-box">
          <ArtistsModal />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      
      
     
      <SongPlayer song={song}/>
    </div>
  );
};
