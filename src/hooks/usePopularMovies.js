import { API_OPTION } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addPopularMovies } from '../utils/moviesSlice'

const usePopularMovies = () =>{
    const dispatch = useDispatch()
  const popularMovies = useSelector(store => store.movies.popularMovies)
  const getPopularMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTION
    )
    const json = await data.json()
    // console.log(json.results)
    dispatch(addPopularMovies(json.results))
  }
  useEffect(()=>{
    if(!popularMovies) getPopularMovies()
  },[])
}

  
export default usePopularMovies 