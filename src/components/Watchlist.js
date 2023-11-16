import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { getFromLocalStorage, removeFromLocalStorage } from "../localStrorage";
import { IMAGE_BASE_URL } from "../constant";

const Watchlist = () => {
  const genreButtonRef = useRef(null);

  const [watchlist, setWatchlist] = useState(getFromLocalStorage());

  const [genreOfCurrentWatchList, setGenreOfCurrentWatchList] = useState([]);

  const [updatedGenreWatchList, setUpdatedGenreWatchList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const sort = () => {
    const customizedWatchlist = [...watchlist];

    customizedWatchlist.sort((a, b) => {
      if (a.vote_average < b.vote_average) {
        return 1;
      } else if (a.vote_average > b.vote_average) {
        return -1;
      }
      return 0;
    });

    setWatchlist(customizedWatchlist);
  };

  const genresPresent = () => {
    let currentWatchList = [...watchlist];

    let genreSet = new Set();
    genreSet.add("All");
    currentWatchList.forEach((movie) => {
      let genres = movie.genre_ids;

      genres.forEach((genre) => {
        if (!genreSet.has(genre)) {
          genreSet.add(genre);
        }
      });
    });
    setGenreOfCurrentWatchList([...genreSet]);
  };

  const handleGenreSelection = (selectedGenre) => {
    genreButtonRef.current.textContent = selectedGenre;

    if (selectedGenre === "All") {
      setUpdatedGenreWatchList([]);
      return;
    }

    let updatedWatchList = [...watchlist];

    updatedWatchList = updatedWatchList.filter(({ genre_ids }) => {
      if (genre_ids.includes(selectedGenre)) {
        return true;
      }

      return false;
    });
    console.log(updatedWatchList);

    setUpdatedGenreWatchList(updatedWatchList);
  };

  const remove = (id) => {
    removeFromLocalStorage(id);
    setWatchlist(getFromLocalStorage());
  };

  useEffect(() => {
    genresPresent();
  }, [watchlist]);

  return (
    <>
      <div
        className="flex flex-col items-center w-full"
        onClick={() => (isOpen ? setIsOpen(false) : {})}
      >
        <div className="flex justify-end items-center w-[100%] px-20 py-5">
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="flex justify-between w-[5rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
              ref={genreButtonRef}
            >
              All
              {isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
            </button>

            <div
              id="dropdown"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-[2.9rem] z-1 transition-transform "
              style={isOpen ? { display: "inherit" } : { display: "none" }}
            >
              {genreOfCurrentWatchList.map((genre, index) => {
                return (
                  <ul
                    key={index}
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <h3
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={(e) =>
                          handleGenreSelection(e.target.textContent)
                        }
                      >
                        {genre}
                      </h3>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className=" self-start mx-[5%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={sort}
          >
            Sort By Rating
          </button>
        </div>

        <div className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
          {watchlist.length === 0 ? (
            <div className="p-5 w-full text-xl font-medium">
              WatchList Empty !!
            </div>
          ) : (
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
                    Genre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {(updatedGenreWatchList.length === 0
                  ? watchlist
                  : updatedGenreWatchList
                ).map((movie) => {
                  let { title, vote_average, poster_path, id, genre_ids } =
                    movie;
                  let genresPresent = genre_ids.join(" , ");
                  return (
                    <tr
                      key={id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-xl"
                    >
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

                      <td className="px-6 py-4">{genresPresent}</td>

                      <td className=" px-6 py-4 text-[1.8rem] text-red-700  hover:text-[2.2rem]">
                        <FaTrash
                          className="ml-[1.7rem]"
                          onClick={() => remove(id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Watchlist;
