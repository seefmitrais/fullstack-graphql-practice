import axios from 'axios';
import { Movie } from '../../resolvers/types/Movie.type';
export class imdbApi {
    private api_key:string;
    private base_url:string='https://imdb-api.com/en/API';
    constructor(){
        this.api_key=process.env.IMDB_API_KEY;
    }

    public searchAll = async (keyword:string):Promise<Movie[]> => {
        return await axios.get(`${this.base_url}/SearchTitle/${this.api_key}/${keyword}`)
        .then((response)=>{
            if(Array.isArray(response.data.results)){
                let movies:Movie[] = [];
                    response.data.results.map((movie:any)=>{
                        movies.push({
                            id:movie.id,
                            title:movie.title,
                            description:movie.description,
                            image:movie.image,
                        });
                    });
                    return movies;
            }else{
                throw new Error(`error from ${this.base_url}`);
            }
        })
        .catch((error)=>{
            throw new Error(`error from ${this.base_url}`);
            return error;
        })
    }

}

