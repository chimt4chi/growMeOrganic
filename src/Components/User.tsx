import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "./User.css";
import Departments from "./Departments";

function User() {
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 600 },
  ];

  return (
    <div className="user-container">
      <DataGrid rows={posts} columns={columns} autoHeight={true} pagination />
      <Departments />
    </div>
  );
}

export default User;
