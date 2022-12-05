import React from 'react'

const PokemonData = ({
  id,
  name,
  image,
  type,
  height,
  weight,
  
}) => {
  const style = `thumb-container ${type}`;
  // const [show, setShow] = useState(false);
 
   
 
 
 return (
  <div className="pokemon-card">
    
        <h1>{name}</h1>
        weight:{weight} <br />
        height: {height}
        <img src={image} alt={name} />
        type :{type}
        <h2>hello</h2>
    
    </div>
  )
}

export default PokemonData