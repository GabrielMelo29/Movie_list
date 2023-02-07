// --mudar tema
const temas = document.querySelectorAll(".temas div");
let root = document.querySelector(':root');
let getTheme = JSON.parse(localStorage.getItem("lista-tema"))

             
for (var tema of temas) {
    tema.addEventListener("click", (e) => {
        let target = e.target
        let cor = target.getAttribute('data-color').split(' ');

        root.style.setProperty('--background--', cor[0])
        root.style.setProperty('--header--', cor[1])
        root.style.setProperty('--text-color--', cor[2])
        root.style.setProperty('--fill--', cor[3])

        const theme = {
            background: cor[0],
            header: cor[1],
            text: cor[2],
            fill:  cor[3]
        }
        
        localStorage.setItem("lista-tema", JSON.stringify(theme));
        
    })
    showTema()
}

function showTema() {
    if(getTheme) {
        root.style.setProperty('--background--', getTheme.background)
        root.style.setProperty('--header--', getTheme.header)
        root.style.setProperty('--text-color--', getTheme.text)
        root.style.setProperty('--fill--', getTheme.fill)
    }
}


// ----- abrir e fechar menu
const btnMenu = document.querySelector(".btn-menu");
const abrirtemas = document.querySelector(".temas");
const btnIcon = document.querySelector(".btn-icon");

function abrirMenu() {
    abrirtemas.classList.toggle('abrir')
    btnIcon.classList.toggle('abrir')
}

btnMenu.addEventListener('click', abrirMenu);



// --adicionar titulo
const inputTitulo = document.querySelector('#inputTitulo'),
btnTitulo = document.querySelector('#btnTitulo'),
listaTitulos = document.querySelector('#listaTitulos'),
filtro = document.querySelectorAll(".filtro span")

let idEditar;
let estaEditado = false;
let listaTitulo = JSON.parse(localStorage.getItem("lista-Titulo"));


btnTitulo.addEventListener("click", (e) => {
    let titulo = inputTitulo.value.trim();

    if(titulo) {

        if (!estaEditado) { // se nao for verdadeiro
            if(!listaTitulo) { //se listaTitulo não existe, passa um array vazio para lista
                listaTitulo = [];
            }

            let tituloInfo = { name: titulo, status: "pendente" }
            listaTitulo.push(tituloInfo); //adicionado novo titulo na lista

        } else {
            estaEditado = false;
            listaTitulo[idEditar].name = titulo;
        }
        inputTitulo.value = "";
        localStorage.setItem("lista-Titulo", JSON.stringify(listaTitulo));
        showTitulo();
    }
});

filtro.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");

        showTitulo(btn.id);
    });
});

function showTitulo(filtro) {
    let li = "";

    if(listaTitulo) {
        listaTitulo.forEach((titulo, id) => {
            let estaVisto = titulo.status == "visto" ? "checked" : "";

            if (filtro == titulo.status || filtro == "todos") {
                li += ` <li class="tafera">
                            <label for="${id}">
                                <input type="checkbox" id="${id}" onclick="atualizarStatus(this)" ${estaVisto}>
                                <p class="nome-titulo ${estaVisto}">${titulo.name}</p>
                            </label>

                            <div class="opcoes">
                                <button onclick="editarTitulo(${id}, '${titulo.name}')" class="btn-editar">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                                <button onclick="excluirTitulo(${id})" class="btn-excluir">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </li>`;
            }
        });    
    }
    listaTitulos.innerHTML = li;
}
showTitulo("todos")

function excluirTitulo(idExcluido) {
    listaTitulo.splice(idExcluido, 1);
    localStorage.setItem("lista-Titulo", JSON.stringify(listaTitulo));
    showTitulo("todos")
}

function editarTitulo(idTitulo, novoTitulo) {
    idEditar = idTitulo;
    estaEditado = true;
    inputTitulo.value = novoTitulo;
}


function atualizarStatus(tituloSelecionado) {
    let nomeTitulo = tituloSelecionado.parentElement.lastElementChild;

    if (tituloSelecionado.checked) {
        nomeTitulo.classList.add("checked");
        listaTitulo[tituloSelecionado.id].status = "visto";
    } else {
        nomeTitulo.classList.remove("checked")
        listaTitulo[tituloSelecionado.id].status = "pendente";
    }
    localStorage.setItem("lista-Titulo", JSON.stringify(listaTitulo));
}


// ----- sotear

const btnSortar = document.querySelector(".btn-sortear");
const resultado = document.getElementById("resultado");

btnSortar.addEventListener("click", () => {
    
    do {
        const numero = Math.floor(Math.random() * listaTitulo.length);
        var sorteado = listaTitulo[numero]
    
    }   while(sorteado.status == "visto");
    
    resultado.innerHTML = sorteado.name;

})

