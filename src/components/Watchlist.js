import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getFromLocalStorage, removeFromLocalStorage } from "../localStrorage";
import { IMAGE_BASE_URL } from "../constant";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(getFromLocalStorage());

  const sort = ()=>{
    const customizedWatchlist = [...watchlist];

    customizedWatchlist.sort( (a,b) => {
      if(a.vote_average < b.vote_average){
        return 1;
      }
      else if( a.vote_average > b.vote_average){
        return -1;
      }
      return 0;
    });

    setWatchlist(customizedWatchlist);
  }

  const remove = (id)=>{
      removeFromLocalStorage(id);
      setWatchlist(getFromLocalStorage());
  }

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <button
          type="button"
          className=" self-start my-5 mx-[5%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={sort}
        >
          Sort By Rating
        </button>
        <div className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 h-[5rem]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Poster
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {watchlist.length === 0 ? (
                <div className="p-5 w-full text-xl font-medium">WatchList Empty !!</div>
              ) : (
                watchlist.map((movie) => {
                  let { title, vote_average, poster_path, id } = movie;

                  return (
                    <tr key={id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-xl">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src={IMAGE_BASE_URL + poster_path}
                          alt=""
                          className=" h-[200px] w-[200px] p-1 rounded-[30px]"
                        ></img>
                      </th>
                      <td className="px-6 py-4">{title}</td>
                      <td className="px-6 py-4">{vote_average.toFixed(1)}</td>
                      <td className=" px-6 py-4 text-[1.8rem] text-red-700  hover:text-[2.2rem]">
                          <FaTrash className="ml-[1.7rem]" onClick={() => remove(id)}/>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Watchlist;
