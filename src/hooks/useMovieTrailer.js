import { API_OPTION } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { addTrailerVideos } from '../utils/moviesSlice'

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch()

    const getMovieTrailer = async() =>{
        
        const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', API_OPTION)
        const json = await data.json()

        const filterData = json.results.filter((video) => video.type ==='Trailer')
        const trailer = filterData.length ? filterData[0] : json.results[0]
       
        dispatch(addTrailerVideos(trailer))
    }

    useEffect(() => {
        getMovieTrailer();
    }, []);

}

export default useMovieTrailer