const inputName = document.querySelector('.input-name');
const btnAddItem = document.querySelector('#add-item-list');
const listaTarefa = document.querySelector('.to-do-list');

function criaListaTarefas(inputTexto) {
    const tagLi = document.createElement('li');
    const botaoDelete = document.createElement('button');
    tagLi.innerText = `${inputTexto} `;
    botaoDelete.innerText = `Delete`;
    botaoDelete.setAttribute('class', 'apagar')

    tagLi.appendChild(botaoDelete);
    listaTarefa.appendChild(tagLi);
}

function limparCampo() {
    inputName.value = '';
    inputName.focus();
}

document.addEventListener('click', (e) => {
    const el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        adicionarItensStorage();
    }
})

inputName.addEventListener('keypress', (event) => {
    // keyCode: 13
    if (event.keyCode === 13) {
        criaListaTarefas(inputName.value);
        limparCampo();
        adicionarItensStorage();
    }
})

function adicionarItensStorage() {
    const tarefas = document.querySelectorAll('li');
    const listaTarefas = [];

    for (let tarefa of tarefas) {
        let textoTarefa = tarefa.innerText;
        textoTarefa = textoTarefa.replace('Delete', '').trim()

        listaTarefas.push(textoTarefa)
    }
    
    const textoJSON = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', textoJSON)
}

function salvarItensNaLista() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaListaTarefas(tarefa)
    }
}

salvarItensNaLista()

btnAddItem.addEventListener('click', () => {
    if (!inputName.value) return;
    criaListaTarefas(inputName.value);
    limparCampo();
    adicionarItensStorage();
})