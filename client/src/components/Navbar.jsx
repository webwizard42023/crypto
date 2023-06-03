import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";

const redirect = (t) => {
  if(t == 'Market') window.location = "https://ethereumprice.org/";
  else if(t == 'Exchange') window.location = "https://goerli.etherscan.io/address/0x8a9dc02046081d40f69c6e29ee76e49a3528cc1f";
}

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`} onClick={() => {redirect(title)}}>{title}</li>
);
//Test Commemet

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="py-2 px-5 mx-4 rounded-full cursor-pointer bg-gradient-to-r from-blue-300 to-blue-500 hover:from-sky-400 hover:via-rose-400 hover:to-lime-400"
           onClick={() => { window.location.href = "http://localhost:5173/aboutus" }}>
          About us
        </li>

      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange"].map(
              (item, index) => <NavBarItem key={item + index} title={item}  classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;