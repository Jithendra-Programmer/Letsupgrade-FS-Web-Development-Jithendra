const display = (data) => {
    let overlayIndex = data.length;
    let pokemonString = '';

    data.map((pokemon) => {
        pokemonString += `
            <div class="pokemon">

                <div class="overlay" style="z-index: ${overlayIndex}; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h1>${pokemon.name}</h1>
                        <p>${pokemon.type}</p>
                    </div>
                    <div class="btns">
                        <button onclick="deletePokemon('${
                            pokemon._id
                        }')" class='btn'>Delete</button>
                    </div>
                </div>

                <div style="z-index: ${overlayIndex - 1}" class="more">
                    <div class="detailes">

                        <p style="width: 40%; padding: 10px 0px;">
                            HP: ${pokemon.base.HP}
                        </p>

                        <p style="width: 40%; padding: 10px 0px;">
                            Attack: ${pokemon.base.Attack}
                        </p>

                        <p style="width: 40%; padding: 10px 0px;">
                            Defense: ${pokemon.base.Defense}
                        </p>

                        <p style="width: 40%; padding: 10px 0px;">
                            Speed: ${pokemon.base.Speed}
                        </p>

                    </div>
                </div>

            </div>
        `;

        overlayIndex--;
    });

    document.getElementById('pokemons').innerHTML = pokemonString;
};

let allPokemons = [];

fetch('https://lu-poke-api.herokuapp.com/pokemons')
    .then((response) => response.json())
    .then((pokemons) => {
        allPokemons = pokemons;
        display(allPokemons);
    })
    .catch((err) => console.log(err));

const createPokemon = () => {
    let pokemon = { base: {} };

    pokemon.name = document.getElementById('name').value;
    pokemon.type = document.getElementById('type').value;
    pokemon.base['HP'] = document.getElementById('hp').value;
    pokemon.base['Attack'] = document.getElementById('attack').value;
    pokemon.base['Defense'] = document.getElementById('defense').value;
    pokemon.base['Speed'] = document.getElementById('speed').value;

    // console.log(pokemon);

    document.getElementById('form').reset();

    fetch('https://lu-poke-api.herokuapp.com/pokemons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemon),
    })
        .then((response) => response.json())
        .then((data) => {
            allPokemons.push(data);
            display(allPokemons);

            document.getElementById('msg').style.marginTop = '0px';
            document.getElementById('msg-text').innerText = 'Pokemon Created!';

            setTimeout(() => {
                document.getElementById('msg').style.marginTop = '-100vh';
            }, 5000);
        })
        .catch((err) => console.log(err));
};

const deletePokemon = (id) => {
    fetch(`https://lu-poke-api.herokuapp.com/pokemons/${id}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const index = allPokemons.findIndex(
                (pokemon) => pokemon._id === id,
            );

            allPokemons.splice(index, 1);

            display(allPokemons);

            document.getElementById('msg').style.marginTop = '0px';
            document.getElementById('msg-text').innerText = 'Pokemon Deleted!';

            setTimeout(() => {
                document.getElementById('msg').style.marginTop = '-100vh';
            }, 5000);
        })
        .catch((err) => console.log(err));
};
