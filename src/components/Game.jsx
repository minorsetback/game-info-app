import { useEffect, useState } from "react"
import useGames from "../hooks/useGames";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import "../styles/game.css"
import { Audio } from 'react-loader-spinner';

const Game = () => {
    const [game, setGame] = useState();
    const { isFetching, error, getGame } = useGames()
    let { slug } = useParams();

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        "marginRight": "-50%",
        transform: "translate(-50%, -50%)"
    }

    useEffect(() => {
        const get = async () => {
            setGame(await getGame(slug))
        }
        get()
    }, [])

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
            <img src={game?.data.background_image} className="image" />
            <h1 className="title">{game?.data.name}</h1>
            <p className="text">rating {game?.data.rating}</p>
            <p className="text">released {game?.data.released}</p>

            {parse(String(game?.data.description))}
            <a className="button" href={game?.data.website}>Website</a>
        </div>
    )
}

export default Game