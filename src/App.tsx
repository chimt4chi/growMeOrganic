import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserForm from "./Components/UserForm";
import User from "./Components/User";
import { useEffect } from "react";

type Props = {};

function App({}: Props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserForm />,
    },
    {
      path: "/users",
      element: <User />,
    },
  ]);

  const storedName = localStorage.getItem("user_name");
  const storedEmail = localStorage.getItem("user_email");
  const storedPhone = localStorage.getItem("user_phone");

  useEffect(() => {
    if (storedEmail || storedName || storedPhone) {
      router.navigate("/users");
    }
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
