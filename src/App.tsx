import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useTheme } from "./contexts/ThemeProvider";

const App = () => {
  const { isDarkMode } = useTheme();
  return (
    <main
      className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}
    >
      <Header />
      <div className="pt-12"></div>
      <Home />
      <Footer />
    </main>
  );
};

export default App;
