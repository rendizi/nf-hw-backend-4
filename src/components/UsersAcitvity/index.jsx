import React, { useEffect, useState } from "react";

export default function UsersActivity({socket}) {
  const [listensList, setListens] = useState([]);

  useEffect(() => {
    socket.on("listens-to", ({ username, listens }) => {
      const userExists = listensList.some((user) => user.username === username);
  
      if (userExists) {
          const updatedListens = listensList.map((user) =>
              user.username === username ? { ...user, title: listens.title, author: listens.author } : user
          );
          setListens(updatedListens);
      } else {
          setListens([...listensList, { username, title: listens.title, author: listens.author }]);
      }
  });
  
    

    socket.on("stop-listens-to", ({ username }) => {
      const updatedListens = listensList.filter((user) => user.username !== username);
      setListens(updatedListens);
    });

    return () => {
      socket.off("listens-to");
      socket.off("stop-listens-to");
    };
  }, [socket]); 

  useEffect(()=>{
    console.log(listensList)
  },[listensList])

  return (
    <div className="border-t border-gray-700 mt-8 pt-4">
      <h4 className="text-white text-lg font-bold mb-4">Users Activity</h4>
      <div className="flex flex-col gap-y-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
        {listensList.map((user, index) => (
          <div key={index}>
            <h5 className="text-white font-bold">{user.username}</h5>
            <p className="text-gray-400">{user.title} • {user.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
