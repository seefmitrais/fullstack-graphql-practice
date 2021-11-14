import { Arg, Args, Query } from "type-graphql";
import { Movies } from "./types/Movies.type";
import {imdbApi} from '../services/external/imdbApi.service';
import { Movie } from "./types/Movie.type";
export class MovieResolver {
    
    @Query(()=>Movies)
    async searchMovies(@Arg('keyword') keyword:string):Promise<Movies> {
        const imdbApiService = new imdbApi();
        const movies:Movie[] = await imdbApiService.searchAll(keyword);
        return {
            movies
        };
    }
}