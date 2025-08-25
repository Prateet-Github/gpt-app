import { Route, Routes, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import ChatBox from "./components/ChatBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import { use, useState } from "react";
import { assets } from "./assets/assets";
import "./assets/prism.css";
import Loading from "./pages/Loading";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === "/loading") return <Loading></Loading>;

  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"
          onClick={() => setIsMenuOpen(true)}
        />
      )}

      <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
        <div className="flex h-screen w-screen">
          <SideBar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          ></SideBar>
          <Routes>
            <Route path="/" element={<ChatBox></ChatBox>}></Route>
            <Route path="/credits" element={<Credits></Credits>}></Route>
            <Route path="/community" element={<Community></Community>}></Route>
            {/* <Route path="/loading" element={<Loading />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
