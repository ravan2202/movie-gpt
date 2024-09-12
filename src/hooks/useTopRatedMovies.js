import { API_OPTION } from '../utils/constants'
import { useDispatch , useSelector} from 'react-redux'
import { useEffect } from 'react'
import { addTopRatedMovies } from '../utils/moviesSlice'

const useTopRatedMovies = () =>{
    const dispatch = useDispatch()
    const topRatedMovies = useSelector(store => store.movies.topRatedMovies)
  const getTopRatedMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTION
    )
    const json = await data.json()
    // console.log(json.results)
    dispatch(addTopRatedMovies(json.results))
  }
  useEffect(()=>{
    if(!topRatedMovies)getTopRatedMovies()
  },[])
}

  
export default useTopRatedMovies