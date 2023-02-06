import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: ()=>{},
    setToken: ()=>{}
})

const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        name: 'mahdi'
    })
    const [token, _setToken] = useState(null);

    const setToken = (token) =>{
        _setToken(token)
        if (token){
            localStorage.setItem('ACCESS_TOKEN' , token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    return(
        <StateContext.Provider value={{
                user,
                token,
                setToken,
                setUser
        }}>
            {children}
        </StateContext.Provider>
    )
};
export default ContextProvider;
export const useStateContext = () => useContext(StateContext)
