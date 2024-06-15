import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

const CreateArtist = () => {
    const [username, setUsername] = useState('')

    const sendReq = async(e) => {
        e.preventDefault()
        try{
            const resp = await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/artist`,{username,password:"l"})
            toast("Success")
            console.log("Success")
        }
        catch (err){
            toast(err)
        }
    }

    return (
        <div>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card shrink-0 w-full max-w-sm bg-base-100">
      <form className="card-body" onSubmit={sendReq}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="username" className="input input-bordered" required onChange={(e)=>setUsername(e.target.value)}/>
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

export default CreateArtist