import { useEffect } from "react"

const Page = () => {
    useEffect(()=>{
        localStorage.removeItem("refresh")
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        window.location.href="/"
    },[])

    return (
        <div></div>
    )
}

export default Page