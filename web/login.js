const loginForm = document.getElementById("form")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("username")
    const password = document.getElementById("password")

    if (username.value == "" || password.value == "") {
        alert("Por favor, preencha os campos de Usuário e Senha.")
    } else {
        console.log(`Login efetuado com sucesso, usuário: ${username.value} senha: ${password.value}`)
    }

    username.value = ""
    password.value = ""
})