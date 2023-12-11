import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from '@env'

const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);


    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query, page: page.toString() },
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setData([])
        setIsLoading(true)
        try {
            const response = await axios.request(options);
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            alert("There is an error!")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            fetchData()
        } else if (direction === 'right') {
            setPage(page + 1)
            fetchData()
        }
    }

    return { data, isLoading, error, refetch, handlePagination, page }
}


export default useFetch
