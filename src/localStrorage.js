export const getFromLocalStorage = () => {
  let movieArr;

  if (localStorage.getItem("movies") === null) {
    movieArr = [];
  } else {
    movieArr = JSON.parse(localStorage.getItem("movies"));
  }
  console.log(movieArr);
  return movieArr;
};

export const isInLocalStrorage = (id) => {
  let savedArr = getFromLocalStorage();

  if (savedArr.find((movie) => movie.id === id)) {
    return true;
  } else {
    return false;
  }
};

export const addInLocalStorage = (movie) => {
  let savedArr = getFromLocalStorage();

  if (isInLocalStrorage(movie.id)) {
    return;
  }
  savedArr.push(movie);

  setLocalStorage(savedArr);

  return;
};

export const removeFromLocalStorage = (id) => {
  let savedArr = getFromLocalStorage();

  const index = savedArr.findIndex((movieObj) => movieObj.id === id);

  if (index !== -1) {
    savedArr.splice(index, 1);
  }
  setLocalStorage(savedArr);

  return;
};

export const setLocalStorage = (savedArr) => {
  let moviesArr = JSON.stringify(savedArr);
  localStorage.setItem("movies", moviesArr);
  return;
};
