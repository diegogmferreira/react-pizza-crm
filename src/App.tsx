import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.crm" />
      <RouterProvider router={router} />
     </HelmetProvider>
  )
}