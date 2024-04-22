import { createContext, useEffect, useState } from "react";
import { apiKey } from "../config";
import axios from "axios";

const NewsContext = createContext();

const initialState = {
    data: [],
    isLoading: false,
    error: true,
    errorType: null,
    openFilters: false,
    search: '',
    from: '',
    to: ''
}


const NewsProvider = ({ children }) => {
    const [data, setData] = useState(initialState.data);
    const [isLoading, setIsLoading] = useState(initialState.isLoading);
    const [openFilter, setOpenFilter] = useState(initialState.openFilters);
    const [search, setSearchGlobal] = useState(initialState.search);
    const [from, setFromGlobal] = useState(initialState.from);
    const [to, setToGlobal] = useState(initialState.to);

    useEffect(() => {
        let endpoint = `https://newsapi.org/v2/everything?q=${search}&from=${from}&to=${to}&sortBy=popularity&apiKey=${apiKey}`
        if(search) {
                axios.get(endpoint)
                    .then(res => {
                        console.log(res);
                        setData(res.data.articles);
                    })
                    .catch(err => {
                        console.log(err);
                    })
        }

    }, [search, from, to])


    return (
        <NewsContext.Provider value={{ setData, setIsLoading, data, openFilter, setOpenFilter, setSearchGlobal, setFromGlobal, setToGlobal }}>
            {children}
        </NewsContext.Provider>
    )
}

export { NewsContext, NewsProvider };