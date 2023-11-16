import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex bg-slate-900 h-[5rem] md:h-[4rem] justify-start items-center relative text-lg box-border ">

      <div className="text-white flex justify-evenly text-lg md:justify-evenly w-[50vw] md:w-[20vw] md:text-xl ">
        <NavLink to="/">Movies</NavLink>
        <NavLink to="/watchlist">WatchList</NavLink>
      </div>


    </div>
  );
};

export default Header;
