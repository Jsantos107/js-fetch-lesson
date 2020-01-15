const BASE_URL = 'https://dogs-backend.herokuapp.com/dogs'
const dogContainer = document.querySelector('.dogs-container')

fetch(BASE_URL)
    .then(parseJSON)
    .then(createDogCards)

function parseJSON(response) {
    return response.json()
}
function createDogCards(dogs) {
    return dogs.map(makeDogCard)
}

function makeDogCard(dog) {
    const dogInfo = document.createElement('div')
    dogInfo.className = 'dog-info'
    dogInfo.innerHTML = `
            <img src=${dog.image} />
            <h1>Dog Name: ${dog.name} </h1>
        `
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'DELETE'
    deleteButton.addEventListener('click', () => deleteDog(dog.id))
    dogInfo.appendChild(deleteButton)
    dogContainer.appendChild(dogInfo)
}

function deleteDog(id) {
    event.target.parentNode.remove()
    fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
}
//event listener on the button that increments the innertext of the like span
//post the number 



//add an event listener to the html form
//on submit, dog should 
//1) be optimistically rendered to UI
//2) be posted to backend
//3) form should be cleared

const dogForm = document.querySelector('#dog-form')
dogForm.addEventListener('submit', () => {
    event.preventDefault()
    const formData = new FormData(dogForm)
    const name = formData.get("name")
    const breed = formData.get("breed")
    const image = formData.get("image")
    const age = formData.get("age")

    makeDogCard({ name, breed, image, age })

    dogForm.reset()
    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, breed, image, age })
    })

})

//add event listener to delete button
//optimistically render deleted dog
//delete from backend