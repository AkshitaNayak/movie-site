import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MovieCredits from '../components/MovieCredits'
import MovieRec from './MovieRec'


export default function Movie() {

  let { id } = useParams()
  let [movie, setMovie] = useState({})
  let [loading, setLoading] = useState(true)
  let url1 = "https://api.themoviedb.org/3/movie/"
  let url2 = "?api_key=9cb497f8e2fc01b05d24a2ea0dc6d40e&language=en-US"

  async function getMovieData() {
    let response = await fetch(url1 + id + url2)
    let result = await response.json()
    console.log(result)
    setMovie(result)
    setLoading(false)
  }

  useEffect(() => {
    getMovieData()
  }, [])

  return (
    <div className='max-w-7xl mx-auto mt-12'>
      {
        loading ? (<Loader />) :
          (
            <>
              <MovieDetails movie={movie} />
              
              <MovieCredits />
            </>
          )
      }
    </div>
  )
}


function MovieDetails(props) {
let bgUrl = 'https://image.tmdb.org/t/p/w500'+props.movie.backdrop_path
  return (
    <>
      <div className='flex
        bg-gray-300' 
       style={{
      backgroundImage: 'url('+bgUrl+')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
      >
        {/* <img src={'https://image.tmdb.org/t/p/w500'+`${props.movie.backdrop_path}` } className=""/> */}
        <div className='w-1/2 py-12'>
          <img src={'https://image.tmdb.org/t/p/w500' + `${props.movie.poster_path}`} className="h-96 mx-24" />
        </div>

        <div className='text-left w-2/3 py-12'>
          <h1 className='text-5xl cursor-pointer mt-10 text-yellow-600'>{props.movie.original_title}</h1>
          <p className='italic mt-10 text-white'>{props.movie.tagline}</p>
          <h3 className='font-bold mt-10 text-2xl text-yellow-600'>Overview</h3>
          <p className='mt-5 w-full text-xl text-white'>{props.movie.overview}</p>

          <Link to={`/movierec/${props.movie.id}`}>
          <p className='border rounded bg-violet-800 hover:bg-blue-400 text-white text-center px-5 py-3  mx-40 mt-10'>Similar Movie Recommendations</p>
          </Link>

         
        </div>
      </div>
    </>
  )
}


function Loader() {
  return (
    <>
      <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
        alt="Loading..."
        className="w-72 h-72 m-auto" />
    </>
  )
}


// https://api.themoviedb.org/3/movie/${id}?api_key=9cb497f8e2fc01b05d24a2ea0dc6d40e&language=en-US
