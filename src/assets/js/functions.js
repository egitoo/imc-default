let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

document.querySelector("#btn-calcular").addEventListener("click", (event) => {
    event.preventDefault();
    let imc = calcularIMC(peso.value, altura.value);
    let status = verificarStatus(imc);
    addLocalStorage(nome.value, peso.value, altura.value, imc.toFixed(2), status);
    carregarLocalStorage();
    limparFormulario();
  });


// FUNÇÕES
function limparFormulario(){
    nome.value= "";
    peso.value = "";
    altura.value = "";
    nome.focus();
}

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function verificarStatus(imc) {
    if(imc < 18.50) {
        return "Abaixo do peso";
}
    else if(imc >= 18.50 && imc <= 24.90){
        return "Peso normal";
    }
    else if(imc >= 25.00 && imc <= 29.90){
        return "Sobrepeso";
    }
    else if(imc >= 30.00 && imc <= 34.90){
        return "Obesidade grau 1";
    }
    else if(imc >= 35.00 && imc <= 39.90){
        return "Obesidade grau 2";
    }
    else {
        return "Obesidade grau 3"
    }
}

function addLocalStorage(nome, peso, altura, imc, status){

    let pessoa = {
      "nome": nome,
      "peso": peso,
      "altura": altura,
      "imc": imc,
      "status": status
    }
  
    if (localStorage.getItem("listaIMC")){
      
      let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
      listaIMC.push(pessoa);
      localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
    
    } else {
  
      let listaIMC = [];
      listaIMC.push(pessoa);
      localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
    }
    mostrarMensagem("IMC cadastrado!", "add");
  }

function carregarLocalStorage(){
  
    limparTabela();
  
    if (localStorage.getItem("listaIMC")){
      
      let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
      listaIMC.forEach((pessoa, indice) => {
        addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, pessoa.status, indice);
      });
  
    } else {
      mostrarMensagem("Nenhum IMC a ser exibido", "table");
    }
  }

function limparTabela(){
    let qtdLinhas = tabela.rows.length;
    for (let i = qtdLinhas - 1; i > 0; i--){
      tabela.deleteRow(i);
    }
  }

  function deletarLinha(index){
  
    let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
    pessoas.splice(index, 1);
    localStorage.setItem("listaIMC", JSON.stringify(pessoas));
    carregarLocalStorage();
    mostrarMensagem("IMC deletado!", "delete");
  }

function mostrarMensagem(msg, tipo){
  
    mensagem.innerHTML = msg;
    mensagem.classList.add("d-block");
  
    if (tipo == 'add'){
      mensagem.classList.add("alert-success");
    } else if (tipo == 'delete'){
      mensagem.classList.add("alert-danger");
    } else if (tipo == 'table'){
      mensagem.classList.add("alert-warning");
    }
  
    setTimeout(() => {
      mensagem.innerHTML = "";
      mensagem.classList.remove("alert-danger");
      mensagem.classList.remove("alert-success");
      mensagem.classList.remove("alert-warning");
      mensagem.classList.remove("d-none");
    }, 2000);
  }


// ADICIONAR DADOS NA TABELA

let tabela = document.querySelector('.table');

function addTabela(nome, peso, altura, imc, status, indice) {
    let colunaNome = document.createElement('td');
    colunaNome.innerHTML = nome;
    
    let colunaPeso = document.createElement('td');
    colunaPeso.innerHTML = peso;

    let colunaAltura = document.createElement('td');
    colunaAltura.innerHTML = altura;

    let colunaIMC = document.createElement('td');
    colunaIMC.innerHTML = imc;

    let colunaStatus = document.createElement('td');
    colunaStatus.innerHTML = status;

    let colunaDeletar = document.createElement('td');
    let btnDeletar = document.createElement('button');
    btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
    btnDeletar.classList.add('btn');
    btnDeletar.classList.add('btn-danger');

    btnDeletar.addEventListener("click", (event) => {
        event.preventDefault();
        deletarLinha(indice);
      });
    colunaDeletar.appendChild(btnDeletar);

    let linha = document.createElement('tr');
    linha.appendChild(colunaNome);
    linha.appendChild(colunaPeso);
    linha.appendChild(colunaAltura);
    linha.appendChild(colunaIMC);
    linha.appendChild(colunaStatus);
    linha.appendChild(colunaDeletar);

    tabela.appendChild(linha);
}

