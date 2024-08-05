import React from 'react'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies)
    if(!movies) return

    const mainMovies = movies[0]
    // console.log(mainMovies)

    const {original_title, overview, id} = mainMovies
    
  return (
    <>
    <VideoTitle title={original_title} overview={overview} />
    <VideoBackground movieId={id} />
    </>
  )
}

export default MainContainer