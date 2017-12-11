//autocomplete
$(function(){
  var tagsRotulos = [
  "Brahma", 
  "Skol",
  "Antartica",
  "Kaiser",
  "Amstel",
  "Heineken",
  "Budweiser",
  "Conti",
  "1500",
  "Burguesa",
  "Colorado",
  "Baden Baden",
  "Stella Artois",
  "Proibida",
  "Paulaner",
  "Original",
  "Serramalte",
  "Bohemia",
  "Bavaria",
  "Devassa",
  "Sol",
  "Corona",
  "Quilmes",
  "Norteña"
  ];
  var tagsVolumes = [
  "550 ml",
  "350 ml",
  "600 ml",
  "1000 ml",
  "473 ml",
  "355 ml",
  "300 ml"
  ];
  $("#nome").autocomplete({
    source: tagsRotulos
  });
  $("#tamanho").autocomplete({
    source: tagsVolumes
  });
});


//abre fecha sobre
$("nav a:first-child").click(function(){
  $("body").addClass('open-sobre');
});
$(".close-sobre").click(function(){
  $("body").removeClass('open-sobre');
});
//abre fecha tutorial
$("nav a:nth-child(2)").click(function(){
  $("body").addClass('open-tutorial');
});
$(".close-tutorial").click(function(){
  $("body").removeClass('open-tutorial');
});
//abre fecha calculadora-bar
$("nav a:last-child").click(function(){
  $("body").addClass('open-calculadora-bar');
});
$(".close-calculadora-bar").click(function(){
  $("body").removeClass('open-calculadora-bar');
});

//Mascara para inputs
$("#valor").mask("0,00");

//Botão calcular
$("#calcula").click(function(event){
  calculaMenor();
  event.preventDefault();
});

//Limpa o input
$("#limpa").click(limpaInput);
function limpaInput(){  
  $("#nome").val("");
  $("#tamanho").val("");
  $("#valor").val("");
}

//esconde e mostra tabela
$(".comparativo").hide();
function mostraTabela(){
  $(".comparativo").slideDown();
}

function adicionaLinha() {

  //busca a tabela
  var corpo = $(".table").find("tbody");
  //busca valores do input
  var nome = $("#nome").val();
  var tamanho = $("#tamanho").val();
  var valor = $("#valor").val();

  //verifica se o input está vazio.
  if(nome == "" || tamanho == "" || valor == ""){
    $(".mensagem").slideToggle();
    setTimeout(function(){
            $(".mensagem").slideToggle(1500);
        },1500);    
    return false;
  }

  //cria elementos
  var novaLinha = $("<tr>");
  var colunaNome = $("<td>").text(nome);
  var colunaTamanho = $("<td>").text(tamanho);
  var colunaValor = $("<td>").text("R$ " + valor);
  var colunaRemover = $("<td>").addClass("remover");
  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("fa").addClass("fa-trash");

  //junta os elementos
  link.append(icone);
  colunaRemover.append(link);
  novaLinha.append(colunaNome);
  novaLinha.append(colunaTamanho);
  novaLinha.append(colunaValor);
  novaLinha.append(colunaRemover);
  //adiciona evento de remover linha
  novaLinha.find(".botao-remover").click(removeLinha);
  //coloca a nova linha na tabela
  corpo.prepend(novaLinha);  
  mostraTabela();
}

//Busca os valores em cada linha da tabela
//Calcula o valor do Ml e verifica menor
function calculaMenor(){  
  var calculosVetor = [];
  $("tbody tr").each(function(){
    var tamanhosRestantes = $(this).find("td:nth-child(2)").text();
    var tamanhosRestantesInt = parseInt(tamanhosRestantes, 10);

    var valoresRestantes = $(this).find("td:nth-child(3)").text();
    var valoresRestantesParte = valoresRestantes.split(' ').pop();
    var valoresRestantesReal = Number(valoresRestantesParte ? valoresRestantesParte.split('.').join('').replace(',', '.') : 0);    

    var calculoRestantes = (valoresRestantesReal / tamanhosRestantesInt);
    calculosVetor.push(calculoRestantes);
  });  

  var menor = Math.min.apply(null, calculosVetor);
  var posicao = calculosVetor.indexOf(menor)+1;
  
  if (calculosVetor.length == 1){
    return false;
  }

  $("tbody").find('tr').removeClass('menor');
  $("tbody").find('tr:nth-child(' + posicao + ')').addClass("menor");
}

//Adiciona uma lista na tabela ao clicar no + e calcula
$("#adiciona").click(function() { 
  adicionaLinha();    
  limpaInput();
  calculaMenor();
});

//Remove uma linha da tabela
function removeLinha(event){    
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
    event.preventDefault();
}


