const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString) 
        );
    });
    charactersPrint(filteredCharacters);
});
const loadCharacters = async () => {
    try {
        const url = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await url.json();
        charactersPrint(hpCharacters);
        console.log(hpCharacters);
    } catch {
        console.log(err);
    }
}

const charactersPrint = (characters) => {
    const htmlString = characters
        .map((characters) => {
            return `
            <li class="character">
                <div class="text">
                    <h2>${characters.name}</h2>
                    <p>House: ${characters.house}</p>
                </div>
                <img src="${characters.image}" onerror="this.src = 'assets/img/hogwarts.jpg'"> 
            </li>
        `;
        })
        .join('');
        charactersList.innerHTML = htmlString;
}

    loadCharacters();
