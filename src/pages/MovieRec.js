import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function MovieRec() {

    let url1="https://api.themoviedb.org/3/movie/"
    let url2="/recommendations?api_key=9cb497f8e2fc01b05d24a2ea0dc6d40e&language=en-US&page=1"

    let { id } = useParams()

    let [movies, setMovies] = useState({})
    let [loading, setLoading] = useState(true)

    async function fetchMovies() {
        let response = await fetch(url1+id+url2)
        let result = await response.json()
        console.log(result)
        setMovies(result)
        setLoading(false)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

  return (
    <div>
        
        {
                loading ? (<Loader/>) :
                (
                    <>
                    <div className='wrapper'>
                        <ShowMovies movies={movies} />
                    </div>
                    </>
                )
            }

    </div>
  )
}


function ShowMovies(props){
    return(
        <>
        <div className='max-w-7xl mx-auto flex flex-wrap justify-between'>
            {
                props.movies.results.map((movie)=>{
                    return <MovieCard movie={movie} key={movie.id} />
                })
            }
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