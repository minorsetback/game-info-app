import useGames from "../hooks/useGames";
import { useState, useEffect } from "react";
import "../styles/games.css"
import { Audio } from 'react-loader-spinner';

const Games = () => {
    const { games, isFetching, error, setPage, setName, setOrdering, setPlatform } = useGames()
    const [data, setData] = useState(games)
    const [input, setInput] = useState('')
    
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        "marginRight": "-50%",
        transform: "translate(-50%, -50%)"
    }
    
    const nextPage = () => {
        setPage(prev => prev + 1)
    }

    const search = () => {
        setData([])
        setName(input)
    }

    useEffect(() => {
        setData(games)
        if (data) {
            setData([...data, ...games])
        }
        //eslint-disable-next-line
    }, [games])

    if (isFetching) {
        return (
            <div style={ style }>
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                />
            </div>)
    }

    return (
        <div className="wrapper">
            <div className="inputWrapper">
                <input type="text" onChange={(e) => { setInput(e.target.value) }} />
                <button className="search" onClick={search}>Search</button>
            </div>
            <div className="inputWrapper">
                <button className="buttonFilter" onClick={() => { setData([]); setOrdering('') }}>dafault</button>
                <button className="buttonFilter" onClick={() => { setData([]); setOrdering('rating') }}>rating</button>
                <button className="buttonFilter" onClick={() => { setData([]); setOrdering('-rating') }}>-rating</button>
                <button className="buttonFilter" onClick={() => { setData([]); setOrdering('released') }}>released</button>
                <button className="buttonFilter" onClick={() => { setData([]); setOrdering('-released') }}>-released</button>
            </div>

            <div className="inputWrapper">
                <button className="buttonFilter" onClick={() => { setData([]); setPlatform('1,186,16,187,2,4,5') }}>all</button>
                <button className="buttonFilter" onClick={() => { setData([]); setPlatform('1') }}>Xbox One</button>
                <button className="buttonFilter" onClick={() => { setData([]); setPlatform('186') }}>Xbox Series S/X</button>
                <button className="buttonFilter" onClick={() => { setData([]); setPlatform('16') }}>PlayStation 3</button>
                <button className="buttonFilter" onClick={() => { setData([]); setPlatform('187') }}>PlayStation 5</button>
                <button className="buttonFilter" onClick={() => { setData([]); setPlatform('5') }}>mac</button>
                <button className="buttonFilter" onClick={() => { setData([]); setPlatform('4') }}>PC</button>

            </div>
            {data?.map((item, index) => {
                return (
                    <div key={index} className="container">
                        <div className="square">
                            <img src={item.background_image} className="mask" />
                            <div className="h1"> {item.name}</div>
                            <p>rating: {item.rating}</p>
                            <p>released: {item.released}</p>
                            <div><a href={`/game/${item.slug}`} className="button">Read More</a></div>
                        </div>
                    </div>
                )
            })}
            <button className="button" style={{ display: "block", margin: "0 auto", width: "150px" }} onClick={nextPage}>Load more</button>
        </div>
    )
}

export default Games
