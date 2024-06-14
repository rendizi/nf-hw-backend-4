import React, { useState } from "react";
import { Artistsection } from "../../components/Artistsection";
import Header from "../../components/Header";
import { Playlistsection } from "../../components/PlaylistSection";
import Sidebar from "../../components/Sidebar";
import "./Home.css";
import { Footer } from "../../components/footer";
import { useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [signedIn, setSignedIn] = useState(false)

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

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} signedIn={signedIn}/>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-custom-section pt-28 md:pl-72 p-8">
        <Artistsection></Artistsection>
        <Playlistsection></Playlistsection>
        <Playlistsection></Playlistsection>
        <Playlistsection></Playlistsection>
        <Playlistsection></Playlistsection>
        <Footer></Footer>
      </div>
    </div>
  );
};
