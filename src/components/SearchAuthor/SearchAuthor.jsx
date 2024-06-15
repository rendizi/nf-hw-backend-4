import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const SearchAuthor = ({setAuthorL}) => {
    const [author, setAuthor] = useState('')
    const [result, setResult] = useState(null)

    const searchAuthor = async () => {
        try{
        const resp = await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/search?query=${author}&limit=1`)
        setResult(resp.data[0])
        setAuthorL(result._id)
    }
        catch(err){
            toast(err)
        }
    }   

    return (
        <div>
            <label class="label">
                <span class="label-text">Author</span>
            </label>
            <div class="flex items-center space-x-4">
                <input type="text" placeholder="Type here" class="input input-bordered max-w-xs" onChange={(e)=>setAuthor(e.target.value)}/>
                <button class="btn btn-primary" onClick={searchAuthor}>Search</button>
            </div>
            {result && (
    <div className="flex items-center space-x-4 mt-5">
        <div className="avatar">
            <div className="w-12  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={result.profileImage} alt="User avatar" />
            </div>
        </div>
        <p>{result.username}</p>
    </div>
)}

        </div>

    )
}

export default SearchAuthor