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
//     //b) be posted to backend (try using FormData to grab values from the form)
//     //c) form should be cleared

// 5. add event listener to delete button
// 6. delete dog from backend

//7. create an ageForm that updates a dog's age using PATCH
    //do not use FormData
const BASE_URL = 'https://dogs-backend.herokuapp.com/dogs'
const dogsContainer = document.querySelector('.dogs-container')
const dogForm = document.querySelector('#dog-form')

