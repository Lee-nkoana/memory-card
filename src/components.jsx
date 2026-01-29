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
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
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
    }, []);

    const shufflePokemonData = () => {
        const shuffled = [...getPokemonData];
        for (let i = shuffled.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setPokemonData(shuffled);
    }

    function handleClick(cardID){
        if (clickedCards.includes(cardID)){
            setClickedCards([]);
            setScore(0);
            shufflePokemonData();
            return;
        }

        setClickedCards(prev => [...prev, cardID]);


        setScore(prev => {
            const next = prev + 1;
            setHighScore(highScore => Math.max(highScore, next));
            return next;
        });

        shufflePokemonData();
    }

    if (getLoading == true) return (<> <p> Loading cards...</p> </>);

    return (
        <div id="main">
            <Header score={score} highScore={highScore}/>
            <p>This is a memory based game. Your objective is to click on every Pokemon tile at least once without reclicking a tile.</p>
            <div style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap:"12px"}}>
                {getPokemonData.map((e) => (
                    <div key={e.id} style={{textAlign: "center"}} onClick={() => handleClick(e.id)}>
                        <img src={e.sprites.front_default} alt={e.name} />
                        <p>{e.name}</p>
                    </div>
                ))}
            </div>
        </div>
            
    );
}

function Header({ score, highScore }){
    return(
        <div className="headerDesign">
            <h1>
                Score: {score}
            </h1>
            <h1>
                highScore: {highScore}
            </h1>
        </div>
    )

}

// export {Cards, Header}
export {Header, Cards}