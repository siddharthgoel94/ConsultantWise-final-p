import React, { createContext, useState } from 'react'

export const Logincontext = createContext(null);
export const Usercontext = createContext(false);

const Contextprovider = ({ children }) => {

    const [account, setAccount] = useState("");
    const [userType, setUserType] = useState(false);

    return (
        <>
            <Logincontext.Provider value={{ account, setAccount,userType,setUserType }}>
                {children}
            </Logincontext.Provider>
            {/* <Usercontext.Provider value={{ userType, setUserType }}>
                {children}
            </Usercontext.Provider> */}
        </>
    )
}

export default Contextprovider;