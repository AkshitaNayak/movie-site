import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard(props) {
  return (
    <div className='w-1/6 border border-transparent shadow-lg mr-4 mt-4 p-8 rounded-md 
    flex flex-col justify-between hover:shadow-2xl hover:border hover:border-blue-600'>
        <Link to={`/movie/${props.movie.id}`}>
        <img src={'https://image.tmdb.org/t/p/w500'+`${props.movie.poster_path}` } />
        <p>{props.movie.title}</p>
        </Link>
        <p>{props.movie.release_date}</p>
    </div>
  )
}
