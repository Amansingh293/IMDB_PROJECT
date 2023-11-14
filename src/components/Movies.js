import { useState, useEffect } from "react";
import { API_KEY, IMAGE_BASE_URL } from "../constant.js";
import LoadingBar from "react-top-loading-bar";
import {
  isInLocalStrorage,
  addInLocalStorage,
  removeFromLocalStorage,
  getFromLocalStorage,
} from "../localStrorage.js";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [progress, setProgress] = useState(0);
  const [disabler, setDisabler] = useState(false);
  const [watchListUpdate, setWatchListUpdate] = useState(getFromLocalStorage());
  const [fetcherName , setFetcherName] = useState('getData');

  const trendingMovieApi = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageNumber}`;

  const searchMovieApi = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${pageNumber}&query=${searchVal}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWNkZjg2MGJlZTY2ZjZiYjIyNjNkNWQ2M2YyYWZlMyIsInN1YiI6IjY1M2JkYzRhNTkwN2RlMDEzOGUwZGI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ugFk-MLJggRNRJ_0w1yX8xd6EhpB5jaaH-QJelCl_ds",
    },
  };

  const getData = () => {
    setDisabler(true);
    fetch(trendingMovieApi, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error("error:" + err))
      .finally(() => {
        setProgress(100);
        setDisabler(false);
        setFetcherName('getData');
      });
  };

  function debounce(cb) {
    let timerId;
    return function () {
      clearTimeout(timerId);
      timerId = setTimeout(cb, 1000);
    };
  }

  const searchData = debounce(searchFetcher);

  function searchFetcher() {
    setPageNumber(1);
    fetch(searchMovieApi, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error("error:" + err))
      .finally(() => {
        setProgress(100);
        setFetcherName('searchData');
      });
  }

  const watchListHandler = (movie) => {

    if (isInLocalStrorage(movie.id)) {
      removeFromLocalStorage(movie.id);
    } else {
      addInLocalStorage(movie);
    }
    setWatchListUpdate(getFromLocalStorage());
  };


  const handleIncrementPageNumber = () => {
    if (pageNumber === 500) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  const handleDecrementPageNumber = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    if (searchVal !== "") {
      searchData();
    } else {
      getData();
    }
  }, [pageNumber, searchVal]);

  return (
    <div className="flex flex-col items-center py-[2%] relative">
      <LoadingBar
        color="#f11946"
        progress={progress}
        loaderSpeed={1000}
        height={4}
        transitionTime={400}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="text-[2rem]">Trending Movies </div>

      <input
        className="rounded-lg absolute right-[2%] top-[0.5%] md:top-[1%] lg:right-[2%] lg:top-[2.4%] w-[15vw] h-[2.2rem] text-center border-2 border-slate-500"
        placeholder="Search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />

      <div className="flex flex-wrap justify-start items-center gap-[4%] px-[8%] md:px-[4%] lg:px-[6%]">
        {(movies.length === 0) ? ( (fetcherName === 'searchData') ? <div style={{marginTop : '2rem' ,fontSize: '20px'}}>No Results Found !!</div> : <div style={{marginTop : '2rem' ,fontSize: '20px'}}>Loading.......</div>) : movies.map((movie) => {
          const { title = "", name = "", poster_path, id , vote_average } = movie;
          return (
            <div
              key={id}
              className="rounded-xl h-[20rem] w-[40vw] md:w-[28vw] lg:w-[14vw] bg-cover my-[4%] bg-slate-400 hover:scale-110 duration-300 relative"
              style={
                poster_path
                  ? { backgroundImage: `url(${IMAGE_BASE_URL}${poster_path})` }
                  : {
                      backgroundImage: `url(https://thumbs.dreamstime.com/b/tarnow-poland-april-imdb-logo-tablet-display-screen-mdb-online-database-information-related-to-films-television-216919295.jpg)`,
                    }
              }
            >
              <div className="flex justify-center items-center absolute bottom-0 h-auto bg-slate-200 opacity-[0.8] text-sm md:text-lg w-[100%] text-center rounded-b-xl p-2">
                {title || name}
              </div>

              <div
                className="absolute opacity-[0.8] bg-slate-600 h-[3rem] w-[3rem] top-0 right-0 text-center rounded-lg"
                onClick={() => watchListHandler({ title , name, poster_path, id , vote_average })}
              >
                <div
                  style={
                    isInLocalStrorage(id)
                      ? { color: "red", fontSize: "2rem" }
                      : { color: "white", fontSize: "2rem" }
                  }
                >
                  &#10084;
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-evenly items-center h-[10rem] w-[98vw]">
        <button
          disabled={disabler}
          onClick={handleDecrementPageNumber}
          className="border-2 rounded-xl hover:scale-110 duration-200 px-[1%] py-[0.5%] text-xl"
        >
          Prev
        </button>
        <p className="text-xl">{pageNumber}</p>
        <button
          disabled={disabler}
          onClick={() => {
            handleIncrementPageNumber();
            setProgress(20);
          }}
          className="border-2 rounded-xl hover:scale-110 duration-200 px-[1%] py-[0.5%] text-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;