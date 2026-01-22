import { pokemonData } from './fetchData.js'

const searchBtn = document.getElementById('getBtn');

searchBtn.addEventListener('click', async () => {

    const countInput = document.getElementById('cardCount');
    const categorySelect = document.getElementById('category');
    const container = document.getElementById('pokemon-container');

    const count = countInput.value;
    const type = categorySelect.value;
    if (!count || !type) {
        alert("Bhai, ginti aur type dono daalo!");
        return;
    }

    container.innerHTML = '<h2>Loading...</h2>';

    try {

        const maal = await pokemonData(count, type);
    
        renderCards(maal);

        countInput.value = ''; 
        categorySelect.selectedIndex = 0; 
    } catch (error) {
        container.innerHTML = '<h2>Kuch gadbad ho gayi!</h2>';
    }
});

const renderCards = (pokemonArray) => {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = '';

    pokemonArray.forEach((p) => {
        const card = document.createElement('div');
        card.classList = ('pokemon-card')
        
 
        const gifUrl = p.sprites.other.showdown.front_default;
        const backupUrl = p.sprites.other['official-artwork'].front_default;

        card.innerHTML = `
            <div>
                <img src="${gifUrl || backupUrl}" alt="${p.name}" style="width: 100px;">
                <h3 style="text-transform: capitalize;">${p.name}</h3>
                <p>Type: ${p.types[0].type.name}</p>
            </div>
        `;
        container.appendChild(card);
    });
}