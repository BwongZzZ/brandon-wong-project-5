import './App.css';
import { Component, Fragment } from 'react';
import axios from 'axios';
import DisplayAnime from './DisplayAnime.js';

// State before changes are made in this.setState
class App extends Component {
  constructor() {
    super();
    this.state = {
      q: '',
      animeArray: [],
    }
  }

  // An event listener method to update the query (q) in this.state, which will then update the axios' params query (q), due to the function call of this.componentDidMount()
  handleOnInputChange = (event) => {
    // set event.target.value into a variable const query, and the event.target.value of the query in this.state will be updated to a new value when, this.setState is changed.
      // This event listener will update, once the text input event handler is updated with new text values.
    const query = event.target.value;
    this.setState({
      q: query
    })
  }

  handleOnSubmitChange = (event) => {
    event.preventDefault();
    // axios API gathering data    
    axios({
      method: 'GET',
      url: 'https://api.jikan.moe/v3/search/anime?q=',
      responseType: 'json',
      params: {
        // query is dynamic, due to it's relation in it's current State, before the this.setState alters the this.state.q
        q: this.state.q,
        type: 'tv',
        limit: 1
      }
    }).then((animeResponse) => {
      // console.log the 1st Object of the anime data  
      console.log(animeResponse.data.results[0]);

      this.setState({
        animeArray: animeResponse.data.results
      })
    })
  }


  render() {
    // destructuring this.state into the variable q, to be used in the input of the attribute value={q}
    // console.log(this.state.order_by)
    const { q } = this.state
    return(
      <Fragment >
          <header>
            <h1>Anime Seeker</h1>
          </header>
          <main className="backgroundImg">
            <section className="sectionWrapper">
            {/* form */}
              <form onSubmit={this.handleOnSubmitChange}>
                {/* search Input */}
                {/* this input will hold an event handler of onChange that will inform the method event listener handleOnInputChange to update the text info from this.state updated from the method event listener handleOnInputChange this.setState */}
                <input type="text" name="query" value={q} id="searchInput" placeholder="Search Anime" required onChange={this.handleOnInputChange} />
                <label htmlFor="searchInput" className="srOnly">Search Anime Television Show</label>
                {/* search button */}
                {/* this button will hold an event handler of onClick that will inform the method event listener handleOnButtonChange to update the search info this.state updated from the method event listener handleOnButtonChange this.setState */}
                <button value="submit">Search</button>
              </form>
              <ul>
                {
                  this.state.animeArray.map((animeShow) => {
                    return (
                      <DisplayAnime
                        key={animeShow.mal_id}
                        animeTitle={animeShow.title}
                        animeImage={animeShow.image_url}
                        animeAtlText={animeShow.title}
                        animeSynopsis={animeShow.synopsis}
                        animeEpisodes={animeShow.episodes}
                        animeScore={animeShow.score}
                        animeRated={animeShow.rated}
                      />
                    )
                  })
                }
              </ul>
            </section>
          </main>
          <footer>
            <p>&copy; Brandon Wong - Juno Collage</p>
          </footer>
      </Fragment>
    )
  }
}

export default App;
