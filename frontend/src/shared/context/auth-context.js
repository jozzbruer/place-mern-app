import { createContext} from 'react'

export const Authcontext = createContext({
    isLoggedIn: false, 
    login: () => {}, 
    logout: () => {}
})