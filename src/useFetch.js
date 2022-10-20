import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPendging, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataFetched = await (await fetch(url)).json()
                setData(dataFetched)
                setIsPending(false)
                setError(null)
            } catch (error) {
                setIsPending(false)
                setError(error.message)
            }
        }
        
        fetchData()
    }, [url])

    return {data, isPendging, error}
}

export default useFetch;