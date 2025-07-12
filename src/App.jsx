import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EMP_Provider } from "./empDetails/empProvide";
import { AppLayout } from "./layout/AppLayout";
import { ErrorPage404 } from "./ErrorPage404";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
])



export const App  = () => {
  return (
    <>
      <EMP_Provider>
        <RouterProvider router={router} />
      </EMP_Provider>
    </>
  )
}
