import React from 'react';
import { Link } from 'react-router-dom';

const MovieHeader = () => {
  return (
    <div className="flex justify-between items-center shadow rounded-md bg-white p-2 pl-3 my-2 dark:bg-zinc-800 ">
      <h2 className="text-zinc-600 dark:text-gray-200">IMDB Movie Database</h2>
      <div className="flex items-center gap-2">
        <Link
          to="/movies"
          className="myButton  bg-blue-600 hover:bg-blue-500 dark:bg-blue-200 dark:hover:bg-blue-400 dark:text-slate-800"
        >
          Tüm filmler
        </Link>
        <Link
          to="/movies/add"
          className="myButton bg-green-600 hover:bg-green-500 dark:bg-green-200 dark:hover:bg-green-400 dark:text-slate-800"
        >
          <i className="material-icons text-sm">&#xE147;</i>
          <span>Yeni film ekle</span>
        </Link>
      </div>
    </div>
  );
};

export default MovieHeader;
