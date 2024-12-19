
document.addEventListener("DOMContentLoaded", carregarTarefas);

function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefasSalvas.forEach(tarefa => {
        adicionarTarefaNaLista(tarefa.descricao, tarefa.checked);
    });
}


function addElemento() {
    const inputValue = document.getElementById("tarefa").value;
    if (inputValue === '') {
        alert("Você precisa descrever a tarefa");
        return;
    }

    adicionarTarefaNaLista(inputValue, false);
    salvarTarefa(inputValue, false);
    document.getElementById("tarefa").value = "";
}

function adicionarTarefaNaLista(descricao, checked) {
    const li = document.createElement("li");
    li.textContent = descricao;

    if (checked) {
        li.classList.add("checked");
    }

    li.addEventListener("click", () => {
        li.classList.toggle("checked");
        atualizarEstadoTarefa(descricao, li.classList.contains("checked"));
    });

    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.addEventListener("click", () => {
        li.remove();
        removerTarefa(descricao);
    });

    document.getElementById("itemLista").appendChild(li);
}

function salvarTarefa(descricao, checked) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push({ descricao, checked });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


function atualizarEstadoTarefa(descricao, checked) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const tarefa = tarefas.find(t => t.descricao === descricao);
    if (tarefa) {
        tarefa.checked = checked;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
}


function removerTarefa(descricao) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas = tarefas.filter(t => t.descricao !== descricao);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
