
//Select elements
const form = document.querySelector(".form");
const formInput = document.getElementById("inputField");
const submitButton = document.getElementById("submitButton");
const list = document.querySelector(".itemsList");
const alert = document.querySelector(".alert");
const alertText = document.getElementById("alertText")
const deleteButton = document.getElementsByClassName("deleteButton");
const completedButton = document.getElementsByClassName("checkButton")

let items = [];
let editElement;
let editFlag = false;
let editID = "";
//Add items
form.addEventListener("submit", addItem)

function addItem(e) {
  e.preventDefault();

  const value = formInput.value;
  const id = new Date().getTime().toString();
  console.log(value)
  if(value && !editFlag){

    const element = document.createElement("article");
    element.classList.add("listItem")
    //add id

    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);

    element.innerHTML = `
    <p class="itemDesc">${value}</p>
    <button class="deleteButton"><i class="fa-solid fa-trash"></i></button>
    <button class="checkButton"><i class="fa-solid fa-pen-to-square"></i></button>
    `;
    const deleteBtn = element.querySelector(".deleteButton")
    const editBtn = element.querySelector(".checkButton")

    deleteBtn.addEventListener("click", deleteFunction)
    editBtn.addEventListener("click", editFunction)
    ///appendChild
    list.appendChild(element);

    displayAlert("Item added to the list!", "sucess")

    addToLocalStorage(id, value);

    setBackToDefault()
    //add to the list
    console.log("add")
  } else if(value && editFlag){
    // editing
    editElement.innerHTML = value;
    displayAlert("value changed", "sucess")
    setBackToDefault()
    //! - PAREI EM 7:31:45 PARTE DE FAZER AS COISAS NO LOCALSTORAGE
  } else {
    //empty value
    console.log("empty value")
    displayAlert("Empty Value!", "danger")
  }
}


function displayAlert(text, action) {

  alertText.textContent = text;

  alert.classList.add(`alert-${action}`)
  alert.classList.add(`alert-${action}`)

  alert.style.visibility = "visible"

  setTimeout(() => {
    alertText.textContent = '';
    alert.classList.remove(`alert-${action}`)
    alert.style.visibility = "hidden"
  }, 1000);
}

function deleteFunction(e) {
  const element = e.currentTarget.parentElement;

  list.removeChild(element)

  displayAlert("Item removed", "danger")
  setBackToDefault()
}

function editFunction(e) {
  const element = e.currentTarget.previousElementSibling.previousElementSibling;
  console.log(element)
  editElement = e.currentTarget.previousElementSibling.previousElementSibling;
  console.log(editElement)
  formInput.value = editElement.innerHTML;
  editFlag = true
  editID = element.dataset.id;
  submitButton.textContent = "edit";
}


function setBackToDefault() {
  formInput.value = '';
  editFlag = false;
  editID = "";
  submitButton.textContent = "submit"
}

function addToLocalStorage(id, value) {

}

//Delete items

//Change items