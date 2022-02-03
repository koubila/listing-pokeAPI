// 
let pokemons;
let aside = document.querySelector('aside');
let details = document.querySelector('#details');

function getMenu(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            aside.innerHTML = '';
            pokemons = data.results;
            let ul = document.createElement('ul');
            pokemons.forEach(pokemon => {
                let li = document.createElement('li');
                li.innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                li.dataset.url = pokemon.url;
                ul.appendChild(li);
            });
            aside.appendChild(ul);
            if (data.previous) {
                let buttonP = document.createElement('button');
                buttonP.innerHTML = 'prev';
                buttonP.setAttribute('onclick', `getMenu('${data.previous}')`);
                aside.appendChild(buttonP);
            }

            if (data.next) {
                let buttonN = document.createElement('button');
                buttonN.innerHTML = 'next';
                buttonN.setAttribute('onclick', `getMenu('${data.next}')`);
                aside.appendChild(buttonN);
            }
        })
}

document.querySelector('aside').addEventListener('click', (el) => {
    el = el.target;
    details.innerHTML = '';
    if (el.dataset.url) {
        fetch(el.dataset.url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                // debugger;
                var name = document.createElement('h1');
                name.innerHTML = data.name;
                details.appendChild(name);

                var img = document.createElement('img');
                img.src = data.sprites.other.dream_world.front_default;
                details.appendChild(img);

                var typesDiv = document.createElement('div');
                typesDiv.id = 'typesDiv';

                var typesTitle = document.createElement('div');
                var pTitle = document.createElement('p');
                pTitle.innerHTML = 'Types :';

                typesTitle.appendChild(pTitle);
                typesDiv.appendChild(typesTitle);

                var typesName = document.createElement('div');
                data.types.forEach(type => {
                    var pType = document.createElement('p');
                    pType.innerHTML = type.type.name;
                    typesName.appendChild(pType);
                });

                typesDiv.append(typesName);
                details.append(typesDiv);
            })
    }
})

getMenu('https://pokeapi.co/api/v2/pokemon?limit=10');