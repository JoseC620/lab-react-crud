import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import { getAllShows } from "../../api/fetch"

import "./ShowsIndex.css";
import ShowListing from "./ShowListing"

export default function ShowsIndex() {
  const [loadingError, setLoadingError] = useState(false)
  const [shows,setShows] = useState([])

  const [allShows, setAllShows] = useState([])
  const [searchTitle, setSearchTitle] = useState("")

  useEffect(() => {
    getAllShows().then((response) => {
      setShows(response)
      setAllShows(response)
      setLoadingError(false)
    }).catch((error) => {
      setLoadingError(true)
    })
  }, [])

  function handleTextChange(event) {
    const title = event.target.value
    const result = title.length ? filterShows(title, allShows) : allShows
    setShows(result)
    setSearchTitle(title)
  }

  function filterShows(search, shows) {
    return shows.filter((show) => {
      return show.title.toLowerCase().match(search.toLowerCase())
    })
  } 


  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Shows</h2>
          <button>
            <Link to="/shows/new">Add a new show</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Shows:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="shows-index">
            {shows.map((show) => {
              return <ShowListing show={show} key={show.id}/>
            })}
          </section>
        </section>
      )}
    </div>
  );
}
