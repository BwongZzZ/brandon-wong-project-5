const DisplayAnime = ({ animeTitle, animeImage, animeAtlText, animeSynopsis, animeEpisodes, animeScore, animeRated}) => {
    return (
        <li>
            <div>
                <h2>{animeTitle}</h2>
            </div>
            <div>
                <img src={animeImage} alt={animeAtlText} />
                <p><span>{animeSynopsis}</span></p>
            </div>
            <div className="paraInfo">
                <p>Episodes: {animeEpisodes}</p>
                <p>Score: {animeScore}/10</p>
                <p>Rated: {animeRated}</p>
            </div>
        </li>
    )
}

export default DisplayAnime;