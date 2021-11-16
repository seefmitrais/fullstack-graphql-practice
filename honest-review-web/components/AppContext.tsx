import React, {useState, useEffect, createContext, useReducer, Context} from "react"

export interface AuthInterface {
    token:string,
    user:any
}

export interface GlobalState {
    auth:AuthInterface
};

interface ContextInterface {
    globalState: GlobalState;
    dispatch: React.Dispatch<any>;
  }
const AppContext: Context<ContextInterface> = createContext({} as ContextInterface);

const InitialState = JSON.parse(process.browser && localStorage.getItem("GlobalState") as any) || {};
const  AppContextProvider:React.FC = ({children}) => {
    const [globalState, dispatch] = useState(InitialState);
     
    // Local Storage: setting & getting data
    useEffect(() => {
        localStorage.setItem('GlobalState',JSON.stringify(globalState));
    }, [globalState])
    
    return (
        <AppContext.Provider value={{globalState,dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export {AppContextProvider, AppContext}