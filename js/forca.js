let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca(); // muda a imagem da forca

    if(tentativas == 0){
    let mensagem = `
        <div style="text-align: center;">
            <img src="img/gipmov.gif" alt="Perdeu" style="width:280px; margin-bottom:15px;">
            <p style="font-size:45px; color:#721c24; font-weight:bold;">
                GAME OVER... <br> A palavra secreta era <span style="color:#0a0a0a;">${palavraSecretaSorteada}</span>
            </p>
            <button id="btnReiniciarModal" class="btn-reiniciar">Jogar Novamente</button>
        </div>
    `;
    abreModal("OPS!", mensagem);

    piscarBotaoReiniciarModal();
}

    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    // verifica vitória
    let vitoria = true; 
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

   if(vitoria == true)
{
    tentativas = 0; 
    let mensagem = `
        <div style="text-align: center;">
            <img src="img/winner.gif" alt="Venceu" style="width:280px; margin-bottom:15px;">
            <p style="font-size:45px; color:#721c24; font-weight:bold;">
                WINNER <br> A palavra era <span style="color:#0a0a0a;">${palavraSecretaSorteada}</span>
            </p>
            <button id="btnReiniciarModal" class="btn-reiniciar">Jogar Novamente</button>
        </div>
    `;
    abreModal("PARABÉNS!", mensagem);

    piscarBotaoReiniciarModal();
}

}

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

async function piscarBotaoReiniciarModal() {
    let btn = document.getElementById("btnReiniciarModal");
    if (!btn) return;

    btn.addEventListener("click", () => {
        location.reload(); 
    });

    let piscar = true;
    btn.addEventListener("click", () => piscar = false);

    while(piscar){
        btn.style.backgroundColor = "#C71585";
        btn.style.boxShadow = "0 0 10px #C71585";
        await atraso(500);
        btn.style.backgroundColor = "#ff1493";
        btn.style.boxShadow = "0 0 20px #ff1493";
        await atraso(500);
    }

    btn.style.backgroundColor = "#C71585";
    btn.style.boxShadow = "0 0 10px #C71585";
}


function carregaImagemForca() {
    let url = "";
    switch (tentativas) {
        case 5: url = "./img/forca01.png"; break;
        case 4: url = "./img/forca02.png"; break;
        case 3: url = "./img/forca03.png"; break;
        case 2: url = "./img/forca04.png"; break;
        case 1: url = "./img/forca05.png"; break;
        case 0: url = "./img/forca06.png"; break;
        default: url = "./img/forca.png"; break;
    }

    const imagem = document.getElementById("imagem");
    imagem.style.backgroundImage = `url('${url}')`;
    imagem.style.backgroundRepeat = "no-repeat";       // não repetir
    imagem.style.backgroundPosition = "center";        // centralizar
    imagem.style.backgroundSize = "contain";           // ajustar dentro do container
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});


function reiniciarJogo() {
    tentativas = 6;
    listaDinamica = [];
    carregaImagemForca();
    criarPalavraSecreta();
    montarPalavraNaTela();

    document.querySelectorAll("button").forEach(b => {
        if (b.id.startsWith("tecla-")) {
            b.disabled = false;
            b.style.background = "#fff";
            b.style.color = "#000";
        }
    });

    document.getElementById("jogarNovamente").style.display = "none";
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "BRASIL",
            categoria:"LUGARES"
        },
        palavra002 = {
            nome: "JAPAO",
            categoria:"LUGARES"
        },
        palavra003 = {
            nome: "CHILE",
            categoria:"LUGARES"
        },
        palavra004 = {
            nome: "ARGENTINA",
            categoria:"LUGARES"
        },
        palavra005 = {
            nome: "MEXICO",
            categoria:"LUGARES"
        },
        palavra006 = {
            nome: "INGLATERRA",
            categoria:"LUGARES"
        },
        palavra007 = {
            nome: "URUGUAI",
            categoria:"LUGARES"
        },
        palavra008 = {
            nome: "CANADA",
            categoria:"LUGARES"
        },
        palavra009 = {
            nome: "FRANCA",
            categoria:"LUGARES"
        },
        palavra010 = {
            nome: "CHINA",
            categoria:"LUGARES"
        },
        palavra011 = {
            nome: "BICICLETA",
            categoria:"TRANSPORTE"
        },
        palavra012 = {
            nome: "LANCHA",
            categoria:"TRANSPORTE"
        },
        palavra013 = {
            nome: "NAVIO",
            categoria:"TRANSPORTE"
        },
        palavra014 = {
            nome: "SKATE",
            categoria:"TRANSPORTE"
        },
        palavra015 = {
            nome: "MOTOCICLETA",
            categoria:"TRANSPORTE"
        },
        palavra016 = {
            nome: "BARCO",
            categoria:"TRANSPORTE"
        },
        palavra017 = {
            nome: "AERONAVE",
            categoria:"TRANSPORTE"
        },
        palavra018 = {
            nome: "TREM",
            categoria:"TRANSPORTE"
        },
        palavra019 = {
            nome: "CAIAQUE",
            categoria:"TRANSPORTE"
        },
        palavra020 = {
            nome: "CARRO",
            categoria:"TRANSPORTE"
        },
        palavra021 = {
            nome: "XICARA",
            categoria:"OBJETOS"
        },
        palavra022 = {
            nome: "FACA",
            categoria:"OBJETOS"
        },
        palavra023 = {
            nome: "MACHADO",
            categoria:"OBJETOS"
        },
        palavra024 = {
            nome: "MULETA",
            categoria:"OBJETOS"
        },
        palavra025 = {
            nome: "SERRA ELETRICA",
            categoria:"OBJETOS"
        },
        palavra026 = {
            nome: "VASSOURA",
            categoria:"OBJETOS"
        },
        palavra027 = {
            nome: "LAMPADA",
            categoria:"OBJETOS"
        },
        palavra028 = {
            nome: "TELEFONE",
            categoria:"OBJETOS"
        },
        palavra029 = {
            nome: "CORTINA",
            categoria:"OBJETOS"
        },
        palavra030 = {
            nome: "LAPIS",
            categoria:"OBJETOS"
        },
        palavra031 = {
            nome: "MELANCIA",
            categoria:"ALIMENTOS"
        },
        palavra032 = {
            nome: "AMENDOIM",
            categoria:"ALIMENTOS"
        },
        palavra033 = {
            nome: "ESFIRRA",
            categoria:"ALIMENTOS"
        },
        palavra034 = {
            nome: "GOROROBA",
            categoria:"ALIMENTOS"
        },
        palavra035 = {
            nome: "ABOBORA",
            categoria:"ALIMENTOS"
        },
        palavra036 = {
            nome: "DOCES",
            categoria:"ALIMENTOS"
        },
        palavra037 = {
            nome: "TRAVESSURAS",
            categoria:"ALIMENTOS"
        },
        palavra038 = {
            nome: "PIZZA",
            categoria:"ALIMENTOS"
        },
        palavra039 = {
            nome: "MAÇA",
            categoria:"ALIMENTOS"
        },
        palavra040 = {
            nome: "PUDIM",
            categoria:"ALIMENTOS"
        },
        palavra040 = {
            nome: "DRAGAO",
            categoria:"ANIMAIS"
        },
        palavra041 = {
            nome: "GATO PRETO",
            categoria:"ANIMAIS"
        },
        palavra042 = {
            nome: "MORCEGO",
            categoria:"ANIMAIS"
        },
        palavra043 = {
            nome: "ARANHA",
            categoria:"ANIMAIS"
        },
        palavra044 = {
            nome: "CORUJA",
            categoria:"ANIMAIS"
        },
        palavra045 = {
            nome: "SAPO",
            categoria:"ANIMAIS"
        },
        palavra046 = {
            nome: "CORUJA",
            categoria:"ANIMAIS"
        },
        palavra047 = {
            nome: "COBRA",
            categoria:"ANIMAIS"
        },
        palavra048 = {
            nome: "ESCORPIAO",
            categoria:"ANIMAIS"
        },
        palavra049 = {
            nome: "LAGARTIXA",
            categoria:"ANIMAIS"
        },
        palavra050 = {
            nome: "RATO",
            categoria:"ANIMAIS"
        },
        palavra051 = {
            nome: "PANICO",
            categoria:"CINEMA"
        },
        palavra052 = {
            nome: "JOGOS MORTAIS",
            categoria:"CINEMA"
        },
        palavra053 = {
            nome: "O EXORCISTA",
            categoria:"CINEMA"
        },
        palavra054 = {
            nome: "HALLOWEEN",
            categoria:"CINEMA"
        },
        palavra055 = {
            nome: "IT A COISA",
            categoria:"CINEMA"
        },
        palavra056 = {
            nome: "DRACULA",
            categoria:"CINEMA"
        },
        palavra057 = {
            nome: "INVOCACAO DO MAL",
            categoria:"CINEMA"
        },
        palavra058 = {
            nome: "SCOOBY DOO",
            categoria:"CINEMA"
        },
        palavra059 = {
            nome: "ANNABELLE",
            categoria:"CINEMA"
        },
        palavra060 = {
            nome: "THE WALKING DEAD",
            categoria:"CINEMA"
        }
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}


