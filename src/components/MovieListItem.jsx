import React from 'react';
import { Link } from 'react-router-dom';

const MovieListItem = (props) => {
  const { id, title, director, genre, metascore } = props.movie;

  return (
    <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900">
      <td className="pl-4">{title}</td>
      <td>{director}</td>
      <td>{genre}</td>
      <td className="text-center">{metascore}</td>
      <td className="p-2">
        <Link
          to={`/movies/${id}`}
          className="myButton bg-blue-600 hover:bg-blue-500 dark:bg-blue-200 dark:text-slate-800"
        >
          Detay
        </Link>
      </td>
    </tr>
  );
};

export default MovieListItem;
