import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../constant";

const Banner = () => {
  const [moviesImage, setMoviesImage] = useState([]);

  const trendingMovieApi = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWNkZjg2MGJlZTY2ZjZiYjIyNjNkNWQ2M2YyYWZlMyIsInN1YiI6IjY1M2JkYzRhNTkwN2RlMDEzOGUwZGI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ugFk-MLJggRNRJ_0w1yX8xd6EhpB5jaaH-QJelCl_ds",
    },
  };

  const getData = () => {
    fetch(trendingMovieApi, options)
      .then((res) => res.json())
      .then((data) => {
        return setMoviesImage(data.results.slice(0,4));
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap h-[50vh] md:h-[75vh] w-full overflow-hidden ">
        {moviesImage.length === 0 ? (
          <div className="loaderParent">
            <div className="loader"></div>
          </div>
        ) : (
          moviesImage.map((movie, i) => {
            const { poster_path, title } = movie;
            return (
              <div
                key={title + i}
                className="relative w-[50%] md:w-[25%]  h-[100%]"
              >
                <img
                  src={IMAGE_BASE_URL + poster_path}
                  alt=""
                  className="h-[100%] w-[100%]"
                ></img>
                <div className="absolute text-sm md:text-2xl text-white bottom-0 p-2 w-[100%] h-[auto] md:h-[10%] opacity-[0.7] bg-slate-800 flex items-center justify-center">
                  {title}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Banner;
