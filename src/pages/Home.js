import React from 'react'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import toast from 'react-hot-toast';

export default function Home() {
    let url = "https://api.themoviedb.org/3/movie/popular?api_key=9cb497f8e2fc01b05d24a2ea0dc6d40e&language=en-US&page=1"

    let searchUrl1 = "https://api.themoviedb.org/3/search/movie?api_key=9cb497f8e2fc01b05d24a2ea0dc6d40e&language=en-US&query="
    let searchUrl2 = "&page=1&include_adult=false"

    let [movies, setMovies] = useState([])
    let [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    async function fetchMovies() {
        let response = await fetch(url)
        let result = await response.json()
        console.log(result)
        setMovies(result)
        setLoading(false)
    }

    async function searchMovies() {
        let response = await fetch(searchUrl1 + searchTerm + searchUrl2)
        let result = await response.json()
        console.log(result)
        setMovies(result)
        setLoading(false)
    }

    function handleSearch(event) {
        event.preventDefault();
        console.log(searchTerm)
        if (searchTerm === "") {
            // window.alert("Please enter a movie");
            toast.error("Enter a movie...")
            return 
                
            
        } else {

        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])


    return (
        <div>
            {
                loading ? (<Loader />) :
                    (
                        <>

                            <div>

                                <form onSubmit={handleSearch} className='flex text-center space-x-3 justify-center items-center mt-4 mb-4 ml-2 mr-2'>
                                    <input className="border border-transparent border-violet-600 rounded-xl px-3 py-1 hover:shadow-2xl hover:border hover:border-blue-300" type="text" placeholder="Search any movie" value={searchTerm} onChange={(event) => {
                                        setSearchTerm(event.target.value)
                                    }}></input>
                                    <button onClick={searchMovies} type="submit" className='bg-violet-600 rounded-lg px-3 py-1 hover:bg-blue-300 text-gray-200'>Search</button>
                                </form>

                            </div>

                            <div className='wrapper'>
                                <ShowMovies movies={movies} />
                            </div>
                        </>
                    )
            }

        </div>
    )
}



function ShowMovies(props) {
    return (
        <>
            <div className='max-w-7xl mx-auto flex flex-wrap justify-between'>
                {
                    props.movies.results.map((movie) => {
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