import axios from "axios";

async function pokemonApi ({queryKey}) {
  console.log(queryKey)
  const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${queryKey[1]}`)
  return data
}

export default pokemonApi