export const pokemonData = async (count , category) => {
    
    const response = await fetch(`https://pokeapi.co/api/v2/type/${category}`);
    const data = await response.json();

    const pokemonCount = data.pokemon.slice(0, count);

    const detailedPromise = pokemonCount.map(async (p) => {
        const res = await fetch(p.pokemon.url);
        return await res.json()
    });

    const finalData = await Promise.all(detailedPromise);
    return finalData;
}


