import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

const CreatePlaylist = () => {
    const [noLogin, setNoLogin] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(()=>{
        const sme = async () => {
            const token = localStorage.getItem("token")
            try{
                await axios.post("https://nf-hw-backend-4-production.up.railway.app/api/v5/u/protected", null, {
                    headers: { Authorization: `${token}` }
                });
                setNoLogin(false)
            }catch (err){
                setNoLogin(true)
        }}
        sme()
    },[])

    const sendReq = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        try{
            await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/p/create`,{title,description}, {headers:{Authorization: token}})
            toast("Success")
            console.log("Success")
        }
        catch (err){
            toast(err)
        }
    }

    return (
        noLogin ? 
        <div><p>signInFirst</p></div> : 
        <div>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card shrink-0 w-full max-w-sm bg-base-100">
      <form className="card-body" onSubmit={sendReq}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" placeholder="title" className="input input-bordered" required onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input type="text" placeholder="description" className="input input-bordered" required onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    )
}

export default CreatePlaylist