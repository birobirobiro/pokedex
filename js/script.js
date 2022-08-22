const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Pesquisando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonNumber.innerHTML = data.id + ' -';
    pokemonName.innerHTML = data.name;

    pokemonHeight.innerHTML = 'Altura:' + ' ' + (data.height * 0.1).toFixed(2) + ' ' + 'metro(s)';

    pokemonWeight.innerHTML = 'Peso: ' + (data.weight / 10) + 'kg'

    if (data.id >= 1 && data.id <= 649) {
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }

    if (data.id >= 650 && data.id <= 721) {
      pokemonImage.src = data['sprites']['versions']['generation-vi']['x-y']['front_default']
      document.querySelector('.pokemon__image').style.width = '10%';
      document.querySelector('.pokemon__image').style.height = '15%';
      document.querySelector('.pokemon__image').style.bottom = '50%';
    }

    if (data.id >= 721 && data.id <= 809) {
      pokemonImage.src = data['sprites']['versions']['generation-vii']['icons']['front_default'];
      document.querySelector('.pokemon__image').style.width = '16%';
      document.querySelector('.pokemon__image').style.height = '14%';
      document.querySelector('.pokemon__image').style.bottom = '50%';
    }

    if (data.id >= 809 && data.id <= 905) {
      pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
      document.querySelector('.pokemon__image').style.width = '16%';
      document.querySelector('.pokemon__image').style.height = '14%';
      document.querySelector('.pokemon__image').style.bottom = '49.5%';
    }

    input.value = '';
    searchPokemon = data.id
    return data.id
  }
  else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Tente novamente';
    pokemonNumber.innerHTML = '';
    pokemonHeight.innerHTML = '------------------';
    pokemonWeight.innerHTML = '------------------';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);