import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function UsersActivity({socket}) {
  const [listens, setListens] = useState([]);

  useEffect(() => {
    socket.on("listens-to", ({ username, title, author }) => {
      console.log("listen", username )
      const userExists = listens.some((user) => user.username === username);

      if (userExists) {
        const updatedListens = listens.map((user) =>
          user.username === username ? { ...user, title, author } : user
        );
        setListens(updatedListens);
      } else {
        setListens([...listens, { username, title, author }]);
      }
    });

    socket.on("stop-listens-to", ({ username }) => {
      const updatedListens = listens.filter((user) => user.username !== username);
      setListens(updatedListens);
    });

    return () => {
      socket.off("listens-to");
      socket.off("stop-listens-to");
    };
  }, []); 

  return (
    <div className="border-t border-gray-700 mt-8 pt-4">
      <h4 className="text-white text-lg font-bold mb-4">Users Activity</h4>
      <div className="flex flex-col gap-y-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
        {listens.map((user, index) => (
          <div key={index}>
            <h5 className="text-white font-bold">{user.username}</h5>
            <p className="text-gray-400">{user.title} • {user.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
