const BASE_URL = "https://675528d636bcd1eec852b298.mockapi.io/Employee";


const edit = (id) => {
  window.location.replace(`../HTML/edit.html?id=${id}`)

}


const deletebutton = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        })

        let data = await res.json()
        if (res.status === 200) {
            alert("Data Deleted Successfully")
            getData()
        }
        else {
            throw `${res.status}: ${data.message ?? "Error Occured"}`
        }
    } catch (error) {
        alert(error)
    }
}


const constructTable = (data) => {
    let tBody = document.getElementById("table-body")
    tBody.innerHTML = ""


    data.forEach((e) => {
        let tr = document.createElement("tr")

        tr.innerHTML = `
    <td class="border border-slate-400 text-center">${e.id}</td>
    <td class="border border-slate-400 text-center">${e.firstName}</td>
    <td class="border border-slate-400 text-center">${e.lastName}</td>
    <td class="border border-slate-400 text-center">${new Date(e.dob).toLocaleDateString()}</td>
    <td class="border border-slate-400 text-center">${new Date(e.doj).toLocaleDateString()}</td>
    <td class="border border-slate-400 text-center">${e.email}</td>
    <td class="border border-slate-400 text-center">${e.mobile}</td>
    <td class="border border-slate-400 text-center">
    <button onclick="edit(${e.id})">Edit</button>
    &nbsp;&nbsp;
    <button class="" onclick="deletebutton(${e.id})">Delete</button>
    </td>`

        tBody.appendChild(tr)
    })

}


const getData = async () => {
    try {
        const res = await fetch(BASE_URL);

        const data = await res.json();

        if (res.status === 200) {
            constructTable(data)

        } else {
            throw `${res.status} :${data.message ?? "Error Occured"}`
        }
    } catch (error) {

    }
}

getData()


