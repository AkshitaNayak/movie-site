import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActorCredits from '../components/ActorCredits'

export default function Actor() {

    let url1 = "https://api.themoviedb.org/3/person/"
    let url2 = "?api_key=9cb497f8e2fc01b05d24a2ea0dc6d40e&language=en-US"

    let { id } = useParams()
    let [actor, setActor] = useState({})
    let [loading, setLoading] = useState(true)

    async function getActorData(){
        let response = await fetch(url1 + id + url2)
        let result = await response.json()
        console.log(result)
        setActor(result)
        setLoading(false)
    }

    useEffect(() => {
        getActorData()
    }, [])

  return (
    <div className='max-w-7xl mx-auto mt-12'>

        {
            loading ? (<Loader/>):
            (
                <>
                <ShowActorDetails actor={actor}/>

                <ActorCredits/>
                </>
            )
        }

    </div>
  )
}


function ShowActorDetails(props){
    return(
        <>
        <div className='flex bg-grey-300'>
            <div className='w-1/2 py-12'>
            <img src={'https://image.tmdb.org/t/p/w500' + `${props.actor.profile_path}`}
             className="h-96 mx-24" />
                
            </div>

            <div className='text-left w-2/3 py-12'>
            <h1 className='text-5xl cursor-pointer mt-10'>{props.actor.name}</h1>
            <h3 className='font-bold mt-10 text-2xl'>Biography</h3>
            <p className='mt-5 w-full text-xl text-amber-900'>{props.actor.biography}</p>
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