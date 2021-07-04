import React from "react";
import axios from "axios";
import Movie from "./Movie";
//component의 데이터를 바꾸기

class App extends React.Component {
  constructor(props) {
    super(props); //super 키워드는 부모 오브젝트의 함수를 호출할 때 사용됩니다.
    this.state = {
      count: 0,
      isLoading: true,
      movies: [],
    };
  }

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.nomadcoders1.now.sh/list_movies.json"
    );
    //es6 문법
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    console.log(movies[1]);
    return (
      <div>
        {isLoading
          ? "Loading.."
          : movies.map((movie) => {
              console.log(movie);
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                ></Movie>
              );
            })}
      </div>
    );
  }
}
//this.add()가 아닌 이유는 click시에만 함수를 호출하기 때문이다. this.add()면 항시 호출이 되어서 이렇게 코드를 작성하지 않는다.

export default App;
