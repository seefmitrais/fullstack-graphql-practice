import { BehaviorSubject,} from 'rxjs';
import {RegisterMutation} from '../generated/graphql';
export const setAuth = async(authResponse:{token:RegisterMutation['register']['token'],user:RegisterMutation['register']['user']}) => {
    if(authResponse?.token && authResponse?.user){
        await localStorage.setItem('auth',JSON.stringify({
          token:authResponse?.token,
          user:authResponse?.user
        }));
    }
}

export const cleanAuth = async() => {
    await localStorage.clear();
}



export const tokenSubject  = new BehaviorSubject(process.browser && localStorage.getItem('auth'));
// export const userSubject  = new BehaviorSubject(process.browser && (JSON.parse(localStorage.getItem('user') ||) || undefined) );
