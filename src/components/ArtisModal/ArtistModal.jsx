import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ArtisModal = ({ id,setSong }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.post(`https://nf-hw-backend-4-production.up.railway.app/api/v5/u/artist/${id}`);
        console.log(resp.data, "DATA");
        setData(resp.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-4">
      {data ? (
        <div className="grid grid-cols-1 gap-4">
          {data.map((el) => (
            <div key={el._id} className="flex p-4 rounded-lg shadow-md cursor-pointer" onClick={()=>setSong(el)}>
              <img src={el.image} className="w-24 h-24 rounded-lg mr-4" alt={el.title} />
              <div>
                <p className="text-lg font-medium">{el.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ArtisModal;
