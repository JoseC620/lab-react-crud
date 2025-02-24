import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch"


import MovieListing from "./MovieListing"

export default function MoviesIndex() {
  const [loadingError, setLoadingError] = useState(false)
  const [movies,setMovies] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const [searchTitle, setSearchTitle] = useState("")

  useEffect(() => {
    getAllMovies().then((response) => {
      setMovies(response)
      setLoadingError(false)
      setAllMovies(response)
    }).catch((error) => {
      setLoadingError(true)
    })
  }, [])

  function handleTextChange(event) {
    const title = event.target.value
    const result = title.length ? filterShows(title, allMovies) : allMovies
    setMovies(result)
    setSearchTitle(title)
  }

  function filterShows(search, movies) {
    return movies.filter((movie) => {
      return movie.title.toLowerCase().match(search.toLowerCase())
    })
  } 


  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/movies/new">Add a new movie</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Movies:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="shows-index">
            {movies.map((movie) => {
              return <MovieListing movie={movie} key={movie.id}/>
            })}
          </section>
        </section>
      )}
    </div>
  );
}