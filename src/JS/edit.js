const BASE_URL = "https://675528d636bcd1eec852b298.mockapi.io/Employee";

let params = new URLSearchParams(window.location.search)
let id = params.get("id")


const lpad = (value) => {
    return value.toString().padStart(2, "0")
}


const convertDate = (date) => {
    let d = new Date(date)
    return `${d.getFullYear()}-${lpad(d.getMonth())}-${lpad(d.getDate())}`
}

const mapValues = (data) => {
    document.getElementById("firstName").value = data.firstName
    document.getElementById("lastName").value = data.lastName
    document.getElementById("dob").value = convertDate(data.dob)
    document.getElementById("doj").value = convertDate(data.doj)
    document.getElementById("email").value = data.email
    document.getElementById("mobile").value = data.mobile
}
const getData = async () => {
    try {


        let res = await fetch(`${BASE_URL}/${id}`)
        let data = await res.json()

        if (res.status === 200) {

            mapValues(data)
        }
        else {
            throw `${res.status}: ${data.message ?? "Error Occured"}`
        }
    } catch (error) {
        alert(error)
    }
}

getData()





let myForm = document.getElementById("myForm")


myForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let formData = new FormData(myForm)
    let data = Object.fromEntries(formData)

    if (data.firstName && data.lastName && data.dob && data.doj && data.email && data.mobile) {
        data.dob = new Date(data.dob).toISOString()
        data.doj = new Date(data.doj).toISOString()

        try {
            let res = await fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "content-Type": "application/json"
                }
            })
            if (res.status === 200) {
                alert("Updated Successfully")
                window.location.replace("../index.html")
            } else {
                throw `${res.status} :${data.message ?? "Error Occured"}`
            }

        } catch (error) {
            alert(error)
        }

    } else {
        alert("All fields are required")

    }



})