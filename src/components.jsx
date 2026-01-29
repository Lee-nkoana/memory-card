import { useState, useEffect } from "react";

function Cards(){
    const [getPokemonData, setPokemonData] = useState([]);
    const [getLoading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([])


    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
                const data = await response.json();

                const details = await Promise.all(
                    data.results.map(async (e) => {
                        const res = await fetch(e.url);
                        return res.json();
                    })
                );

                setPokemonData(details);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchPokemonData();
    })

    function handleClick(cardID){
        setClickedCards(prevClicked => {
            if(prevClicked.includes(cardID)){
                setScore(0);
                return[];
            }
        })

        setScore(prevScore => {
            const newScore = prevScore+1;
            setHighScore(highScore => Math.max(highScore, newScore));
            return newScore
        })
        return[...prevClicked, cardID]

    }

    if (getLoading == true) return (<> <p> Data is still loading...</p> </>);

    return (
        <>
            <Header score={score} highScore={highScore}/>
            <div style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap:"12px"}}>
                {getPokemonData.map((e) => (
                    <div key={e.id} style={{textAlign: "center"}} onClick={handleClick}>
                        <img src={e.sprites.front_default} alt={e.name} />
                        <p>{e.name}</p>
                    </div>
                ))}
            </div>
        </>
            
    );
}

function Header({ score, highScore }){
    return(
        <div className="headerDesign">
            <h3>
                Score: {score}
            </h3>
            <h3>
                highScore: {highScore}
            </h3>
        </div>
    )

}

// export {Cards, Header}
export {Header, Cards}