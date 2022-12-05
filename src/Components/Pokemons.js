import React, { useEffect, useState } from "react";
import PokemonData from "./PokemonData";
import  "../css/pokemons.css";

const Pokemons = () => {
    


const [allPokemons, setAllPokemons] = useState([]);
const [filteredPokemons, setFilteredPokemons] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true)
const [loadPoke, setLoadPoke] = useState(
	"https://pokeapi.co/api/v2/pokemon?limit=10"
);
const getAllPokemons = async () => {
	const res = await fetch(loadPoke);
	const data = await res.json();
	setLoadPoke(data.next);

	function createPokemonObject(result) {
	result.forEach(async (pokemon) => {
		const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const data = await res.json();
        //   setAllPokemons((currentList) => [...currentList, data]);
          setFilteredPokemons((currentList)=>[...currentList,data]);
        
	});
    setAllPokemons(filteredPokemons);
	}
	createPokemonObject(data.results);
	await console.log("allPokemons \n",allPokemons);
    await console.log("filtered pokemon \n",filteredPokemons);
    setLoading(false);
};
useEffect(() => {
    getAllPokemons();
}, []);

const searchPokemon=()=>{
    const searchValue=search;    
    console.log(searchValue);
    const filteredValue= allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchValue.toLowerCase()));
    console.log("filtered value of pokemon -",filteredValue);
	setFilteredPokemons(filteredValue);
}
return (
	<div className="app-container">
        
        <div className="pokemon-head">
            <h1  id="pokemon-heading">Pokemon Kingdom</h1>
            <div className="search-pokemon">
                <input type="text" id="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button id="search-button" onClick={()=>searchPokemon()}>Search</button>
            </div>
        </div>
	<div className="pokemon-container">
		<div className="pokemon-cards-outer">
		
        {loading ? 
            <h2>Loading...</h2>
            :
            filteredPokemons.map((pokemon, index) => (
			<PokemonData
			id={pokemon.id}
			name={pokemon.name}
			image=
	{pokemon.sprites.other.dream_world.front_default}
			type={pokemon.types[0].type.name}
			key={index}
			height={pokemon.height}
			weight={pokemon.weight}
			
			/>
                ))
        }
		</div>
	</div>
		<button className="load-more"
		onClick={() => getAllPokemons()}>
		More Pokemons
		</button>
	</div>
);


}

export default Pokemons

