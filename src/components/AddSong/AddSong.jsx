import { useEffect, useState } from "react"
import SongSearch from "../SongSearch/SongSearch"
import { toast } from "react-toastify"
import axios from "axios"

const AddSong = ({playlistId}) => {
    const [song, setSong] = useState(null)

    useEffect(()=>console.log(song),[song])

    const add = async () => {
        try{
            const resp = await axios.post("https://nf-hw-backend-4-production.up.railway.app/api/v5/p/add",{songId: song._id,playlistId},
                {headers: {'Authorization': localStorage.getItem("token")}}
            )
            toast("success")
        }catch(err){
            toast(err)
        }
    }

    return (
        <div>
            {song && 
            <div className="justify-center align-center flex">
            <button className="btn btn-primary" onClick={add}>Add</button>
            </div>}

            <SongSearch setSong={setSong}/>
        </div>
    )
}

export default AddSong