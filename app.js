// 1. fetch dogs
// ```
// const BASE_URL = 'https://dogs-backend.herokuapp.com/dogs'
// ```

// 2. create dog cards for each returned dog object and display in the UI

// ```
// <div class="dog-info">
//     <img src="source here" />
//     <h1>Dog Name: name here</h1>
//     <button>DELETE</button>
// </div>
// ```

// 3. add an event listener to the html form
// 4. on submit, dog should 
//     //a) be optimistically rendered to UI
//     //b) be posted to backend
//     //c) form should be cleared

// 5. add event listener to delete button
// 6. optimistically render deleted dog
// 7. delete from backend
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
        <h1>Breed: ${dog.breed}</h1>
        <h1>Age: ${dog.age}</h1>
        `
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'DELETE'
    deleteButton.addEventListener('click', () => {
        event.target.parentNode.remove()
        fetch(`${BASE_URL}/${dog.id}`, {
            method: 'DELETE'
        })
    })

    const ageForm = document.createElement('form')
    ageForm.innerHTML = `
        <label for="age">Dog's Age:</label>
        <input type="number" name="age" value="${dog.age}"/>
        <input type="submit" />
    `

    ageForm.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(ageForm)
        const age = formData.get("age")

        console.log(`${BASE_URL}/${dog.id}`)

        fetch(`${BASE_URL}/${dog.id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ age })
        }).then(parseJSON)
            .then(console.log)

    })

    dogInfo.append(deleteButton, ageForm)
    dogsContainer.appendChild(dogInfo)
}

dogForm.addEventListener('submit', () => {
    event.preventDefault()

    const formData = new FormData(dogForm)
    const name = formData.get("name")
    const breed = formData.get("breed")
    const image = formData.get("image")
    const age = formData.get("age")

    dogCards({ name, breed, image, age })
    postDog({ name, breed, image, age })
})

function postDog(dog) {
    fetch(BASE_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog),
    }).then(dogForm.reset())
}

