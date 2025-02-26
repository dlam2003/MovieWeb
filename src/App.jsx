import { useEffect, useState } from 'react'
import Banner from './Component/Banner'
import Header from './Component/Header'
import MoviesList from './Component/MoviesList'
import MovieSearch from './Component/MovieSearch'
import { MovieProvider } from './Context/ProviderMovie'

function App() {
  const [movie, setMovie] = useState([])
  const [top_rate_mv, setTop_rate_mv] = useState([])
  const [MvSearch, setMvSearch] = useState([])

  const HandleSearch = async (searchVal) =>{
    setMvSearch([])
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`;
      
      const options = {
        method: 'GET', 
        headers: {
          accept: 'application/json',
          Authorization : `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      const res = await fetch(url, options);
      const data = await res.json();
      console.log(searchVal)
      console.log(data)
      
      setMvSearch(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    const fetmovie = async () =>{
      
      const url = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      const url_top_rate  = 'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1';
      
      const options = {
        method: 'GET', 
        headers: {
          accept: 'application/json',
          Authorization : `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      const [res1, res2] = await Promise.all([
        fetch(url,options),
        fetch(url_top_rate, options)
      ])

      const Popular = await res1.json()
      const Top_rate = await res2.json()

      setMovie(Popular.results);
      setTop_rate_mv(Top_rate.results);
    };

    fetmovie();
  }, [])
  return (
    <>
      <MovieProvider>
        <div className="bg-black pb-2">
          <Header onSearch={HandleSearch} onHome={setMvSearch}/>
          <Banner/>
          {MvSearch.length > 0 ? <MovieSearch title={'Ket qua tim kiem'} data={MvSearch}/> : (<>
            <MoviesList title={'Phim hot'} data = {movie}/>
            <MoviesList title={'Phim de cu'} data = {top_rate_mv}/>
          </>)} 
        </div>
      </MovieProvider>
    </>
  )
}

export default App
