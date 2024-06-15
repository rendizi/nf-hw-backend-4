import { useState } from "react";
import SearchAuthor from "../SearchAuthor/SearchAuthor";
import { toast } from "react-toastify";
import axios from "axios";

const Upload = () => {
    const [author, setAuthorL] = useState(null);
    const [title, setTitle] = useState("");
    const [songFile, setSongFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setLoading] = useState(false); 
    const [uploadProgress, setUploadProgress] = useState(0);
const [totalUploadSize, setTotalUploadSize] = useState(0);


    const handleUpload = async (e) => {
        e.preventDefault();

        if (author === null) {
            toast("Choose author first(or try to press search for the second time)");
            return;
        }

        const uploadUrl = `https://nf-hw-backend-4-production.up.railway.app/api/v5/s/publish?title=${title}&author=${author}`;

        const formData = new FormData();
        formData.append("song", songFile);
        formData.append("songPreview", imageFile);

        try {
            setLoading(true); 

            const response = await axios.post(uploadUrl, formData, {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percentCompleted = Math.round((loaded * 100) / total);
                    setUploadProgress(percentCompleted);
                    setTotalUploadSize(total);
                },
            });
            

            if (response.status === 200) {
                toast("Upload successful!");
                setTitle("");
                setSongFile(null);
                setImageFile(null);
            } else {
                toast("Upload failed.");
            }
        } catch (error) {
            toast("Error during upload:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm bg-base-100">
                    <form className="card-body" onSubmit={handleUpload}>
                        <SearchAuthor setAuthorL={setAuthorL} />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="title"
                                className="input input-bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <label className="label">
                                <span className="label-text">Song (.mp3)</span>
                            </label>
                            <input
                                type="file"
                                accept="audio/mp3"
                                className="file-input file-input-bordered file-input-success w-full max-w-xs"
                                onChange={(e) => setSongFile(e.target.files[0])}
                                required
                            />
                            <label className="label">
                                <span className="label-text">Preview image (.png)</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered file-input-success w-full max-w-xs"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                required
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && (
    <div className="mt-4">
        <p>Uploading...</p>
        <progress className="progress" value={uploadProgress} max="100">
            {uploadProgress}%
        </progress>
        <p>
            {uploadProgress}% completed ({(totalUploadSize / 1000000).toFixed(2)} MB)
        </p>
    </div>
)}

        </div>
    );
};

export default Upload;
