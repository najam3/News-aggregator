import { createContext, useState } from "react";

const NewsContext = createContext();

const initialState = {
    data: [],
    isLoading: false,
    error: true,
    errorType: null
};


const NewsProvider = ({ children }) => {
    const [data, setData] = useState(initialState.data);
    const [isLoading, setIsLoading] = useState(initialState.isLoading);

    
    return (
        <NewsContext.Provider value={{setData, setIsLoading, data}}>
            {children}
        </NewsContext.Provider>
    )
}

export { NewsContext, NewsProvider };