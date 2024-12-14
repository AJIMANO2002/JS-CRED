const BASE_URL = "https://675528d636bcd1eec852b298.mockapi.io/Employee";



let myForm = document.getElementById("myForm")


myForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let formData = new FormData(myForm)
    let data = Object.fromEntries(formData)

    if (data.firstName && data.lastName && data.dob && data.doj && data.email && data.mobile) {
        data.dob = new Date(data.dob).toISOString()
        data.doj = new Date(data.doj).toISOString()

        try {
            let res = await fetch(BASE_URL, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "content-Type": "application/json"
                }
            })
            if (res.status === 201) {
                alert("created Successfully")
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