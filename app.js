const BASE_URL = 'https://dogs-backend.herokuapp.com/dogs'
const dogsContainer = document.querySelector('.dogs-container')
const dogForm = document.querySelector('#dog-form')

fetch(BASE_URL)
    .then(parseJSON)
    .then(createDogs)
    .catch(console.log)

function parseJSON(response) {
    return response.json()
}

function createDogs(dogs) {
    dogs.map(dogCards)
}

function dogCards(dog) {
    const dogInfo = document.createElement('div')
    dogInfo.className = 'dog-info'
    dogInfo.innerHTML = `
        <img src=${dog.image} />
        <h1>Dog Name: ${dog.name}</h1>
        `
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'DELETE'
    deleteButton.addEventListener('click', (event) => {
        event.target.parentNode.remove()
        fetch(`${BASE_URL}/${dog.id}`, {
            method: 'DELETE'
        })
    })
    
    dogInfo.appendChild(deleteButton)
    dogsContainer.appendChild(dogInfo)
}

dogForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(dogForm)
    const name = formData.get("name")
    const breed = formData.get("breed")
    const image = formData.get("image")
    const age = formData.get("age")
    dogCards({ name, breed, image, age })
    fetch(BASE_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, breed, image, age }),
    }).then(parseJSON)
        .then(console.log)

})

