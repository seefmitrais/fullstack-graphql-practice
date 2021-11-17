import type { NextPage } from 'next'
import Head from 'next/head'
import {Layout} from '../components/Layout';
import { useMutation, useQuery } from 'urql';
import {Formik } from 'formik';
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { useContext, useState } from 'react';
import { toErrorMap } from '../utils/toErrorMap';
import { setAuth } from '../utils/authUtils';
import { useRouter } from 'next/router'
import { Guard } from '../components/Guard';
import { AppContext } from '../components/AppContext';

const Login: NextPage = () => {
    const router = useRouter();
    const [login] = useLoginMutation();
    const app = useContext(AppContext);

    return (
        <Guard type="guest">
        <Layout>
            <Head>
                <title>Honest Review - Movie/Series</title>
                <meta name="description" content="Honest Review of Movies and Series made by anyone on the internet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="md:w-screen mx-auto px-4 ">
                <div className="flex flex-col justify-center items-center mt-20">
                    <div className="w-full max-w-lg ">
                        <p className="my-5 px-8 text-2xl">Login</p>
                        <Formik
                            initialValues={{
                                email:'',
                                password:''
                            }}
                            onSubmit={async (values,{setErrors})=>{
                                try {
                                    const response = await login({
                                        variables:values
                                    }); 
                                    if(response.data?.login.errors){
                                        setErrors(toErrorMap(response.data?.login.errors));
                                    }else if(response.data?.login?.token && response.data?.login?.user){
                                        const {token,user}= response.data.login;
                                        app.dispatch({...app.globalState,...{auth:{token,user}}});
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                        >
                            {({handleSubmit, isSubmitting, handleChange, values,errors})=>(
                                <form className="bg-white px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                                            Email
                                        </label>
                                        <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && "border-red-500"}`} id="email" type="email" placeholder="Email" 
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                                            Password
                                        </label>
                                        <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password && "border-red-500"}`} id="password" type="password" placeholder="******************" 
                                            onChange={handleChange}
                                            value={values.password}
                                        />
                                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                    
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-flex items-center" type="submit" disabled={isSubmitting}>
                                            {
                                                isSubmitting &&
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            }
                                            
                                            Login
                                        </button>
                                    </div>
                                </form>
                            )} 
                        </Formik>
                        
                        <p className="text-center text-gray-500 text-xs">
                            &copy;{new Date().getFullYear()} Honest Review. All rights reserved.
                        </p>
                        </div>
                </div>
            </div>
        </Layout>
        </Guard>
    );
}

export default Login;