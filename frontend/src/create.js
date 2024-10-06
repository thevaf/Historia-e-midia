let button = document.getElementById("send")
let title = document.getElementById("title")
let body = document.getElementById("body")
let subbody = document.getElementById("subbody")
let author = document.getElementById("author")
let image = document.getElementById("image")
let password = document.getElementById("password")
button.onclick = () => {
    axios.post("./postblog", {password: password.value, data: {
        title: title.value,
        body: body.value,
        subbody: subbody.value,
        author: author.value,
        image: image.value
    }})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}
