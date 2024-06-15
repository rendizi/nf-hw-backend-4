import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
const ArtisModal = ({id}) => {
    const [data, setData ] = useState(null)
    useEffect(()=>{
        const smt = async () => {
            try{
            const resp = await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/artist/${id}`)
            console.log(resp.data, "DATA")
            setData(resp.data)}
            catch(err){
                toast.error(err)
            }
        }
        smt()
    },[])
    return (
        <div>
            
        </div>
    )
}

export default ArtisModal