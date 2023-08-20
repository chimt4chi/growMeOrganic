import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

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
    { field: "title", headerName: "Title", width: 550 },
    { field: "body", headerName: "Body", width: 1500 },
  ];

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="user-container">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            style={{ color: "white" }}
            rows={posts}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
          <Departments />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default User;
