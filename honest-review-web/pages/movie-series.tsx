import { Layout } from "../components/Layout";
import Head from 'next/head';
import { NextPage } from "next";
import { Movie, useSearchMoviesLazyQuery, useSearchMoviesQuery } from "../generated/graphql";
import { SpinnerCenter } from "../components/common/SpinnerCenter";
import { useEffect, useState } from "react";
import { MovieCard } from "../components/common/MovieCard";

const MovieSeries:NextPage<{}> = ({}) =>{

    const [search,setSearch] = useState("");
    const [movies,setMovies] = useState<any[]>([]);
    const [getMovie,{loading,error,data}] = useSearchMoviesLazyQuery();
    
    const onChangeSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        await setSearch(value);
        if(value.trim().length > 0){
            getMovie({
                variables:{keyword:value}
            });
        }
    };
    useEffect(()=>{
        if(data?.searchMovies?.movies){
            console.log(data);
            setMovies(data?.searchMovies?.movies);
        }else{
            setMovies([]);
        }
    },[data]);
    return (
        <Layout>
            <Head>
                <title>Honest Review - Movie/Series</title>
                <meta name="description" content="Honest Review of Movies and Series made by anyone on the internet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-full min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
                <div className="flex flex-col w-6/12 mx-auto">
                    <h1 className="text-3xl mt-5">Search Movies / Series</h1>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3 mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 z-10
                        h-full
                        leading-snug
                        font-normal
                        absolute
                        text-center text-gray-400
                        absolute
                        bg-transparent
                        rounded
                        text-base
                        items-center
                        justify-center
                        w-8
                        pl-3
                        py-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            
                            onChange={(e)=>onChangeSearch(e)}
                            placeholder="Search"
                            className="
                            px-3
                            py-3
                            placeholder-gray-400
                            text-gray-600
                            relative
                            bg-white bg-white
                            rounded
                            text-sm
                            border border-gray-400
                            outline-none
                            focus:outline-none focus:ring
                            w-full
                            pl-10
                            "
                        />
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        {
                            loading &&
                            <SpinnerCenter />
                        }
                        {
                            movies.map((movie,index)=>
                                <MovieCard 
                                    key={index}
                                    id={movie.id}
                                    title={movie.title}
                                    image={movie.image}
                                    index={index}
                                />
                            )
                        }
                    </div>
                </div>
                
            </div>
        </Layout>
    );
} 

export default MovieSeries;