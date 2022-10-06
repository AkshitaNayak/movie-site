import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom';


export default function MovieCredits() {

    let url1 = "https://api.themoviedb.org/3/movie/"
    let url2 = "/credits?api_key=9cb497f8e2fc01b05d24a2ea0dc6d40e"


    let { id } = useParams()
    let [credits, setCredits] = useState({})
    let [loading, setLoading] = useState(true)

    async function getCredits() {
        let response = await fetch(url1 + id + url2)
        let result = await response.json()
        console.log(result)
        setCredits(result)
        setLoading(false)
    }

    useEffect(() => {
        getCredits()
    }, [])
    return (
        <div className='max-w-7xl mx-auto mt-12'>

            {
                loading ? (<Loader />) :
                    (
                        <ShowCreditDetails credits={credits} />
                    )
            }



        </div>
    )
}

function ShowCreditDetails(props) {
    return (
        <>
        <div>
            <h1 className='text-5xl'>Cast</h1>
        </div>
            <div className='flex flex-wrap'>

                {
                    props.credits.cast.map((credit) => {
                        return <CreditsCard credit={credit} key={credit.id} />
                    })
                }

            </div>
        </>
    )
}


function CreditsCard(props) {
    return (
        <>
            <div className='mx-auto'>
                
                <div className='w-1/7 border border-transparent shadow-lg mr-4 mt-4 p-8 rounded-md 
                    flex flex-col justify-between hover:shadow-2xl hover:border hover:border-blue-600'>
                    <Link to={`/actor/${props.credit.id}`}>
                    <p>{props.credit.name}</p>
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