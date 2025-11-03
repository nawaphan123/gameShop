import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page2 from "./pages/mainPage";
import { ProductPage } from "./pages/productPage";
import { Root } from "./pages/Root";
import { Login } from "./pages/Login";
import { TestRESTAPI } from "./pages/testRESTAPI";
import { ManageItem } from "./pages/manageItem";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Page2 />,
      },
      {
        path: "products/:productId",
        element: <ProductPage />,
      },
      {
        path: "manageItem",
        element: <ManageItem />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "test",
        element: <TestRESTAPI />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
  // return <Login />;
}

export default App;
