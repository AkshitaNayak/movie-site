import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom';

export default function ActorCredits() {

    let url1 = "https://api.themoviedb.org/3/person/"
    let url2 = "/movie_credits?api_key=9cb497f8e2fc01b05d24a2ea0dc6d40e&language=en-US"

    let { id } = useParams()
    let [actorcredits, setActorCredits] = useState({})
    let [loading, setLoading] = useState(true)

    async function getActorCredits() {
        let response = await fetch(url1 + id + url2)
        let result = await response.json()
        console.log(result)
        setActorCredits(result)
        setLoading(false)
    }

    useEffect(() => {
        getActorCredits()
    }, [])
    return (
        <div className='max-w-7xl mx-auto mt-12'>
            {
                loading ? (<Loader />) :
                    (
                        <ShowActorCreditDetails actorcredits={actorcredits} />
                    )
            }
        </div>
    )
}


function ShowActorCreditDetails(props) {
    return (

        <>
            <div>
                <h1 className='text-5xl'>Featured Movies</h1>
            </div>

            <div className='flex flex-wrap'>
                {
                    props.actorcredits.cast.map((actorcredit) => {
                        return <ActorCreditCard actorcredit={actorcredit} key={actorcredit.id} />
                    })
                }
            </div>
        </>
    )
}

function ActorCreditCard(props) {
    return (
        <>
            <div className='mx-auto'>
                <div className='w-1/8 border border-transparent shadow-lg mr-4 mt-4 p-8 rounded-md 
                    flex flex-col justify-between hover:shadow-2xl hover:border hover:border-blue-600'>
                        <Link to={`/movie/${props.actorcredit.id}`}>
                        <img src={'https://image.tmdb.org/t/p/w500' + `${props.actorcredit.poster_path}`} className="h-64" />
                        <p>{props.actorcredit.original_title}</p>
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