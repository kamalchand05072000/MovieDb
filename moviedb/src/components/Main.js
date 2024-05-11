import React, { useEffect, useState } from 'react';
import Card from './card';

const API_key = "&api_key=92baccb86abd2eb2ad7ac21333867ff7";
const base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc" + API_key;
const arr = ["Popular", "Top Rated", "Upcoming", "Single Movie"];

const Main = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(url_set)
            .then(res => res.json())
            .then(data => {
                setData(data.results);
            });
    }, [url_set]);

    const getData = (movieType) => {
        let newUrl;
        if (movieType === "Popular") {
            newUrl = base_url + "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc" + API_key;
        } else if (movieType === "Top Rated") {
            newUrl = base_url + "/movie/top_rated?language=en-US&page=1" + API_key;
        } else if (movieType === "Upcoming") {
            newUrl = base_url + "/movie/upcoming?language=en-US&page=1" + API_key;
        } else if (movieType === "Single Movie") {
            newUrl = base_url + "/movie/now_playing?language=en-US&page=1" + API_key;
        }
        setUrl(newUrl);
    };

    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            const searchUrl = base_url + "/search/movie?query=" + encodeURIComponent(search) + API_key;
            setUrl(searchUrl);
            setSearch('');
        }
    };

    return (
        <>
            <div className="header">
                <nav>
                    <div className='moviedb'>MovieDb</div>
                    <ul>
                        {arr.map((value, index) => (
                            <li key={index}>
                                <a href="#" onClick={() => getData(value)}>{value}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input
                            type="text"
                            placeholder="Movie Name"
                            className="inputText"
                            onChange={(e) => { setSearch(e.target.value) }}
                            value={search}
                            onKeyPress={searchMovie}
                        />
                        <button type="button" onClick={searchMovie}>Search</button>
                    </div>
                </form>
            </div>
            <div className="container">
                {movieData.length === 0 ? <p className="notfound">Not Found</p> : movieData.map((res, pos) => {
                    return (
                        <Card info={res} key={pos} />
                    );
                })}
            </div>
        </>
    );
};

export default Main;
