import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useTheme } from "./contexts/ThemeProvider";
import UserDetails from "./pages/UserDetail";

const App = () => {
  const { isDarkMode } = useTheme();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/user/:id",
      element: <UserDetails />,
    },
  ]);
  return (
    <main className={isDarkMode ? "dark" : "light"}>
      <Header />
      <div className="pt-20"></div>
      <RouterProvider router={router} />
      <Footer />
    </main>
  );
};

export default App;
