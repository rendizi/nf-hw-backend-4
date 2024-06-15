import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EditArtist = ({_id}) => {
    const [bio, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setLoading] = useState(false); 

    const handleUpload = async (e) => {
        e.preventDefault();

        const url = `https://nf-hw-backend-4-production.up.railway.app/api/v5/u/${_id}`;

        const formData = new FormData();
        formData.append("profileImage", imageFile);
        formData.append("bio", bio)

        try {
            setLoading(true); 

            const response = await axios.put(url, formData);

            if (response.status === 200) {
                toast("Upload successful!");
                setDescription("");
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

    const handleDelete = () => {
        
    }

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm bg-base-100">
                    <form className="card-body" onSubmit={handleUpload}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input
                                type="text"
                                placeholder="description"
                                className="input input-bordered"
                                value={bio}
                                onChange={(e) => setDescription(e.target.value)}
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
                                {isLoading ? 'Loading...' : 'Update'}
                            </button>
                            <button
                                type="button"
                                className={`btn btn-error mt-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Delete'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditArtist;
