import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import {tokenSubject} from '../utils/authUtils';
import { AppContext } from './AppContext';
interface GuardProps {
    type:"guest" | "auth"
};
export const Guard: React.FC<GuardProps> = ({children, type}) => {
    const router = useRouter();
    const {globalState} = useContext(AppContext);
    useEffect(() => {
        if(type == "guest"){
            if (globalState?.auth?.token) {
                router.push('/');
            }
        }else{
            if (!globalState?.auth?.token) {
                router.push('/login');
            }
        }
    }, [globalState]);
    return <>{children}</>;
}