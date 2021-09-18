const formulario = document.querySelector('.form')

const carregarClientes = () => {
    const clienteJson = localStorage.getItem('clientes') || '[]'

    clientes = JSON.parse(clienteJson)
}

let clientes = []

let clienteEditando = -1

const carregarTabela = () => {
    const tabela = document.querySelector('.table > tbody')
    tabela.innerHTML = ''

    if(clientes.length == 0) {
        const linha = document.createElement('tr')
        const celula = document.createElement('td')

        linha.append(celula)

        celula.innerText = 'Não há clientes cadastrados'
        celula.colSpan = 4

        celula.style.textAlign = 'center'

        tabela.append(linha)
    }

    for(const cliente of clientes) {
        const linha = document.createElement('tr')

        const nomeCelula = document.createElement('td')
        nomeCelula.innerText = cliente.nome

        const idadeCelula = document.createElement('td')
        idadeCelula.innerText = cliente.idade

        const emailCelula = document.createElement('td')
        emailCelula.innerText = cliente.email

        const acoesCelula = document.createElement('td')

        const editarLink = document.createElement('a')
        editarLink.classList.add('link-acao')
        editarLink.innerText = 'Editar'
        editarLink.href = 'javascript:void(0)'

        editarLink.addEventListener('click', ev => {
            ev.preventDefault()
            formulario.name.value = cliente.nome
            formulario.age.value = cliente.idade
            formulario.email.value = cliente.email

            clienteEditando = clientes.indexOf(cliente)
        })
        
        const removerLink = document.createElement('a')
        removerLink.innerText = 'Remover'
        removerLink.classList.add('link-acao')
        removerLink.href = 'javascript:void(0)'

        removerLink.addEventListener('click', ev => {
            ev.preventDefault()

            const index = clientes.indexOf(cliente)

            clientes.splice(index, 1)

            localStorage.setItem('clientes', JSON.stringify(clientes))

            carregarTabela()
        })

        acoesCelula.append(editarLink)
        acoesCelula.append(removerLink)

        linha.append(nomeCelula)
        linha.append(idadeCelula)
        linha.append(emailCelula)
        linha.append(acoesCelula)

        tabela.append(linha)
    }
}



formulario.addEventListener('submit', ev => {
    ev.preventDefault()

    const cliente = {
        nome: formulario.name.value,
        idade: formulario.age.value,
        email: formulario.email.value
    }

    if(clienteEditando > -1) {
        clientes.splice(clienteEditando, 1, cliente)
    }
    else {
        clientes.push(cliente)
    }

    localStorage.setItem('clientes', JSON.stringify(clientes))

    carregarTabela()

    clienteEditando = -1

    formulario.reset()

})

carregarClientes()
carregarTabela()