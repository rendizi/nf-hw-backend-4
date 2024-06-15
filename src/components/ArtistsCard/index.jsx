import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EditArtist from "../EditArtist/EditArtist";

export const ArtistsCard = ({ title, description, imageUrl,_id }) => {
  return (
    <button
      className="bg-main-lg rounded-lg p-4 hover:bg-main-lgHover transition-all group"
    >
      <div className="mb-4 relative flex justify-center items-center" >
        <img
          src={imageUrl}
          alt="Artist"
          className="w-48 h-48 rounded-full drop-shadow-2xl"
        />
        <button className="p-3 text-3xl bg-main-green rounded-full text-gray absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ease-out bg-[#65D46E] text-black" 
        onClick={
          () => {
            try{
              document.getElementById("my_modal_5").show()
            }catch (err){
              console.error(err)
              toast(err)
            }
          }
        }
        >
          <RiEdit2Fill />
        </button>
      </div>
      <div>
        <h5 className="font-medium text-gray-100 mb-2">{title}</h5>
        <p className="text-gray-400 text-sm w-[18ch]">{description}</p>
      </div>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <EditArtist _id={_id}/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </button>
  );
};
