import { Route, Routes, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import ChatBox from "./components/ChatBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import { use, useState } from "react";
import { assets } from "./assets/assets";
import "./assets/prism.css";
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import {Toaster} from 'react-hot-toast'

const App = () => {
  const { user, loadingUser } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === "/loading"|| loadingUser) return <Loading></Loading>;

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"
          onClick={() => setIsMenuOpen(true)}
        />
      )}

      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
          <div className="flex h-screen w-screen">
            <SideBar
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            ></SideBar>
            <Routes>
              <Route path="/" element={<ChatBox></ChatBox>}></Route>
              <Route path="/credits" element={<Credits></Credits>}></Route>
              <Route
                path="/community"
                element={<Community></Community>}
              ></Route>
              {/* <Route path="/loading" element={<Loading />} /> */}
            </Routes>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
          <Login></Login>
        </div>
      )}
    </>
  );
};

export default App;
