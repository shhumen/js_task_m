const BASE_URL = 'http://localhost:3400'

const phonebookTableBodyElement = document.querySelector(
  '#phonebook-table-body'
)
const phonebookCreateForm = document.querySelector('#phonebook-create-form')
const phonebookNameInput = phonebookCreateForm.querySelector('#firstName')
const phonebookLastNameInput = phonebookCreateForm.querySelector('#lastName')
const phonebookPhoneInput = phonebookCreateForm.querySelector('#phone')
const phonebookEamilInput = phonebookCreateForm.querySelector('#email')

const editModalForm = document.querySelector('#editModalForm')
const editNameInput = editModalForm.querySelector('#modal-firstName')
const editLastNameInput = editModalForm.querySelector('#modal-lastName')
const editPhoneInput = editModalForm.querySelector('#modal-phone')
const editEamilInput = editModalForm.querySelector('#modal-email')

let editingPersonId = null

document.querySelector('#update').style.display = 'none'

const deleteModal = document.querySelector('#exampleModal')

async function fetchData() {
  const response = await fetch(`${BASE_URL}/phonebook`)
  if (response.status !== 200) {
    return []
  }
  const phonebook = await response.json()
  console.log(phonebook)

  return phonebook
}

async function fillData() {
  const phonebook = await fetchData()
  phonebook.reverse()

  phonebook.forEach((person) => {
    const element = createRowElement(person)
    phonebookTableBodyElement.append(element)
  })
}
// Create Row Element , added fetched data to the rows =>> added rows to the tableBody

function populateEditForm(person) {
  editingPersonId = person.id
  phonebookNameInput.value = person.firstname
  phonebookLastNameInput.value = person.lastname
  phonebookPhoneInput.value = person.phone
  phonebookEamilInput.value = person.email

  document.querySelector('#save').style.display = 'none'
  document.querySelector('#update').style.display = 'block'
}
function createRowElement(person) {
  // created tr element
  const tableRowElement = document.createElement('tr')

  tableRowElement.innerHTML = `
    <td class='d-none' data-id="${person.id}">${person.id}</td>
    <td>${person.firstname}</td>
    <td>${person.lastname}</td>
    <td>${person.phone}</td>
    <td>${person.email}</td>
    <td><button class="btn border-none edit" id="edit" type="button" data-id=${person.id}>
    <img src="./assets/edit.svg" alt="" style="width: 25px; height: 25px"/>
    </button>
    <button id="delete" data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn border-none">
      <img src="./assets/delete.svg" alt="delete" style="width: 25px; height: 25px"/>
    </button>
    </td>
  `
  // DELETE BTN CLICK
  const deleteModalBtn = deleteModal.querySelector('#delete-modal-btn')
  const deleteBtn = tableRowElement.querySelector('#delete')
  deleteBtn.addEventListener('click', () => {
    // Set the current person ID in the modal's delete button as a data attribute
    deleteModalBtn.setAttribute('data-person-id', person.id)
  })

  deleteModalBtn.addEventListener('click', () => {
    // Get the person ID from the data attribute
    const personId = deleteModalBtn.getAttribute('data-person-id')
    // Call the delete function with the person ID
    deletePersonFromList(personId)
    // Clear the data-person-id attribute
    deleteModalBtn.removeAttribute('data-person-id')
  })

  // EDIT BTN CLICK
  const editBtn = tableRowElement.querySelector('#edit')
  editBtn.addEventListener('click', () => {
    populateEditForm(person)
  })

  return tableRowElement
}

// by adding submit function to the form I will submit my new data to the list using fetchCreatePerson function
phonebookCreateForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // values that I got from input values
  let firstname = phonebookNameInput.value
  let lastname = phonebookLastNameInput.value
  let phone = phonebookPhoneInput.value
  let email = phonebookEamilInput.value
  //  body of my POST request
  let person = {
    firstname,
    lastname,
    phone,
    email,
  }
  fetchCreatePerson(person)
})

// Creating new person
async function fetchCreatePerson(person) {
  const response = await fetch(`${BASE_URL}/phonebook`, {
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify(person),
  })
  //  if everything is okay await and return my data ; otherwise log that something wrong
  if (response.status !== 201) {
    return console.log('Something went wrong!')
  }
  product = await response.json()
  // fill row with data and added it to the table
  const phonebookRowElement = createRowElement(person)
  phonebookTableBodyElement.append(phonebookRowElement)
}

//  Used delete method and deleted by its ID
async function deletePersonFromList(personId) {
  const response = await fetch(`${BASE_URL}/phonebook/${personId}`, {
    method: 'DELETE',
  })

  if (response.status !== 201) {
    console.log('Something went wrong!')
    return
  }
  //  if everything is okay delete (display:none) by data-id attribute and remove its parent
  // td.d-none[data-id="${personId}"]
  // tr is parent of td.d-none[data-id="${personId}"]
  const rowToDelete = document.querySelector(
    `tr td.d-none[data-id="${personId}"]`
  ).parentNode

  rowToDelete.remove()
}

async function editPersonFromList(personId, updatedPerson) {
  const response = await fetch(`${BASE_URL}/phonebook/${personId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPerson),
  })

  if (response.status !== 200) {
    console.log('Something went wrong!')
    return
  }
}

document.querySelector('#update').addEventListener('click', () => {
  if (editingPersonId) {
    const updatedPerson = {
      firstname: phonebookNameInput.value,
      lastname: phonebookLastNameInput.value,
      phone: phonebookPhoneInput.value,
      email: phonebookEamilInput.value,
    }

    editPersonFromList(editingPersonId, updatedPerson)
    // You may want to clear the form fields or perform other actions after editing
    phonebookNameInput.value = ''
    phonebookLastNameInput.value = ''
    phonebookPhoneInput.value = ''
    phonebookEamilInput.value = ''
    editingPersonId = null
  }
})

fillData()
