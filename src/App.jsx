import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page2 from "./pages/mainPage";
import { ProductPage } from "./pages/productPage";
import { UserNav } from "./pages/UserNav";
import { Login } from "./pages/Login";
import { ManageItem } from "./pages/manageItem";
import { ProtectedBypass } from "./component/ProtectedBypass";
import { AdminNav } from "./pages/AdminNav";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserNav />,
    children: [
      {
        path: "",
        element: <Page2 />,
      },
      {
        path: "products/:productId",
        element: <ProductPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manageItem",
    element: <AdminNav />,
    children: [
      {
        path: "",
        element: (
          <ProtectedBypass>
            <ManageItem />
          </ProtectedBypass>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
