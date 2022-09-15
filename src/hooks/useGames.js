import { useState, useEffect } from "react"
import axios from "axios"

const useGames = () => {
    const baseURL = 'https://api.rawg.io/api'

    const [games, setGames] = useState()
    const [isFetching, setIsFetching] = useState()
    const [error, setError] = useState()
    const [page, setPage] = useState(1)
    const [name, setName] = useState()
    const [ordering, setOrdering] = useState('')
    const [platform, setPlatform] = useState('1,186,16,187,2,4,5')

    useEffect(() => {
        getGames()
        //eslint-disable-next-line
    }, [page, name, ordering, platform])

    const getGames = async () => {
        try {
            setIsFetching(true)
            let res;
            if (name) {
                res = await axios.get(`${baseURL}/games?page=${page}&search=${name}&platforms=${platform}&ordering=${ordering}&key=${process.env.REACT_APP_RAWG_API_KEY}`)
            } else {
                res = await axios.get(`${baseURL}/games?page=${page}&platforms=${platform}&ordering=${ordering}&key=${process.env.REACT_APP_RAWG_API_KEY}`)
            }
            if (res.status === 200) {
                setIsFetching(false)
                setGames(res.data.results)

            } else {
                setError(res.detail)
                setIsFetching(false)
            }
        } catch {
            setError("Something wrong")
            setIsFetching(false)
        }
    }

    const getGame = async (slug) => {
        try {
            setIsFetching(true)
            const res = await axios.get(`${baseURL}/games/${slug}?key=${process.env.REACT_APP_RAWG_API_KEY}`)
            if (res.status === 200) {
                setIsFetching(false)
                return res
            } else {
                setError(res.detail)
                setIsFetching(false)
            }
        } catch {
            setError("Something wrong")
            setIsFetching(false)
        }
    }

    return {
        games,
        isFetching,
        error,
        setPage,
        getGame,
        setName,
        setOrdering,
        setPlatform
    }
}



export default useGames