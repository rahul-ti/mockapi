//event listener needs to be added only once. if the line gets run multiple times, the will be n number of event listeners.
document.getElementById("addName").addEventListener("click", function () { addName() });
//Submits the form and refreshes the list to add a new name
async function addName() {
  try {
    let name = document.getElementById('name').value;
    let city = document.getElementById('city').value;
    let date = document.getElementById('date').value;
    let resp = await fetch(`https://60f30ed76d44f300177888b3.mockapi.io/hlist`, { method: 'POST', body: JSON.stringify({ name, city, date }), headers: { "Content-Type": "application/json" } })
    let data = await resp.json();
    console.log(data);
    document.querySelector('form').reset();
    getList();

  } catch (error) {
    console.log(error);
  }
}

//renders the list
function updateList(data) {
  let tbody = document.getElementById('tbody')
  data.length !== 0 ? tbody.innerHTML = '' : tbody.innerHTML = `
  <tr>
    <td colspan="5">Great, Your List is Finished!</td>
  </tr>`;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let date = new Date(String(element.date)).toLocaleDateString()

    tbody.innerHTML += `<tr id='${element.id}'>
      <td id='${element.id}-name'>${element.name}</td>
      <td id='${element.id}-city'>${element.city}</td>
      <td id='${element.id}-date'>${date}</td>
      <td><button type="button" class="btn btn-primary" onclick="editName(${element.id})">Edit</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteName(${element.id})">Delete</button></td>
      </tr>`;
  }
}

//fetch to get list from mockapi
async function getList() {
  let resp = await fetch('https://60f30ed76d44f300177888b3.mockapi.io/hlist')
  let data = await resp.json();
  console.log(data)
  updateList(data)
}

async function editName(id) {

  let tr = document.getElementById(id)
  let name = document.getElementById(`${id}-name`).innerText
  let city = document.getElementById(`${id}-city`).innerText
  let date = document.getElementById(`${id}-date`).innerText

  tr.innerHTML = `
  <td>
    <input type="text" name="name" id="${id}-name" class="form-control" value="${name}" />
  </td>
  <td>
    <input type="text" name="city" id="${id}-city" class="form-control" value="${city}" />
  </td>
  <td>
    <input type="date" name="date" id="${id}-date" class="form-control" value="${date}" />
  </td>
  <td>
    <button type="submit" class="btn btn-success" id="editName" onclick="editNamePut(${id})">Done</button>
  </td>
  <td>
    <button type="submit" class="btn btn-danger" id="cancel" onclick="getList()">Cancel</button>
  </td>
  `
}

//PUT Method Fetch and list reload
async function editNamePut(id){
  try {
    let name = document.getElementById(`${id}-name`).value;
    let city = document.getElementById(`${id}-city`).value;
    let date = document.getElementById(`${id}-date`).value;
    let resp = await fetch(`https://60f30ed76d44f300177888b3.mockapi.io/hlist/${id}`, { method: 'PUT', body: JSON.stringify({ name, city, date }), headers: { "Content-Type": "application/json" } })
    let data = await resp.json();
    console.log('PUT');
    console.log(data);
    getList();

  } catch (error) {
    console.log(error);
  }
}

//helps the delete button
async function deleteName(id) {
  try {
    let resp = await fetch(`https://60f30ed76d44f300177888b3.mockapi.io/hlist/${id}`, { method: 'DELETE', body: null, headers: { "Content-Type": "application/json" } })
    let data = await resp.json();
    console.log(data);
    getList()
  } catch (error) {
    console.log(error);
  }
}
getList();