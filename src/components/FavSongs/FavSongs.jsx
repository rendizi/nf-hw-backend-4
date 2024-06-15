import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const FavSongs = () => {
    const [songs, setSongs] = useState(null)

    useEffect(()=>{
        const smt = async()=>{
            try{
            const resp = await axios.post("https://https://nf-hw-backend-4-production.up.railway.app/api/v5/u/liked",null,{headers:{'Authorization':localStorage.getItem("token")}})
            setSongs(resp)
        }
            catch(err){
                toast(err)
            }
        }
    },[])


    return (
        <div></div>
    )
}

export default FavSongs