//variaveis
var httpRequest; //variavel para o ajax funcionar
var vetor_de_jogadores = [];
var vetor_de_perguntas = [];
//verifico a compatibilidade com os navegadores para se executar o ajax
if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

//referencio a funcao ao objeto quando acontecer alguma mudança no estado da requisicao
httpRequest.onreadystatechange = funcao_atualiza_dados;

function funcao_atualiza_dados() {
    document.getElementById("container").innerHTML = httpRequest.responseText;
}

//funcao para carregar a pagina home
function carregar_home() {
    httpRequest.open('GET', './arquivos/home.html', true);
    httpRequest.send(null);
    setTimeout(carregar_pontos, 50);
}

//funcao para carregar os pontos
function carregar_pontos() {
    if (vetor_de_jogadores.length == 0) {
        document.getElementById("pontuacoes_h1").innerHTML = "Nenhum jogador jogou recentemente";
    } else {
        document.getElementById("pontuacoes_h1").innerHTML = "Últimas pontuações";
        for (var i = 0; i <= vetor_de_jogadores.length; i++) {
            var conteudo = document.getElementById("lista_pontuacoes").innerHTML;
            if (i < 3) {
                document.getElementById("lista_pontuacoes").innerHTML = conteudo + '<li class="pontuacao_item item' + (i + 1) + '"' + ' onclick="carregar_login(0)" >' + vetor_de_jogadores[i].nome + ' ' + vetor_de_jogadores[i].pontos + '</li>';
            } else {
                console.log('entrou no else');
                document.getElementById("lista_pontuacoes").innerHTML = conteudo + '<li class="lista_pontuacao_item item_n" onclick="carregar_login(0)">' + vetor_de_jogadores[i].nome + ' ' + vetor_de_jogadores[i].pontos + '</li>';
            }
        }
    }
}
//funcao para carregar a pagina simulado
function carregar_simulado() {
    httpRequest.open('GET', './arquivos/lista_de_jogadores.html', true);
    httpRequest.send(null);
    setTimeout(carregar_jogadores, 50, [0]); //0 para iniciar jogo
}

//funcao para carregar os jogadores
function carregar_jogadores(parametro) {
    if (vetor_de_jogadores.length == 0) {
        document.getElementById("listagem_h1").innerHTML = 'Sem cadastro de jogadores';
    } else {
        document.getElementById("listagem_h1").innerHTML = 'Jogadores já cadastrados';
        if (parametro == 0) {
            for (var i = 0; i <= vetor_de_jogadores.length; i++) {
                var conteudo = document.getElementById("lista_jogadores").innerHTML;
                if (i < 3) {
                    document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item' + (i + 1) + '"' + ' onclick="carregar_login(0)" >' + vetor_de_jogadores[i].nome + '</li>';
                } else {
                    document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item_n" onclick="carregar_login(0)">' + vetor_de_jogadores[i].nome + '</li>';
                }
            }
        } else if (parametro == 1) {
            for (var i = 0; i <= vetor_de_jogadores.length; i++) {
                var conteudo = document.getElementById("lista_jogadores").innerHTML;
                if (i < 3) {
                    document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item' + (i + 1) + '"' + ' onclick="carregar_login(1)" >' + vetor_de_jogadores[i].nome + '</li>';
                } else {
                    document.getElementById("lista_jogadores").innerHTML = conteudo + '<li class="lista_pontuacao_item item_n" onclick="carregar_login(1)">' + vetor_de_jogadores[i].nome + '</li>';
                }
            }
        }
    }
}

//funcao para carregar a pagina cadastro
function carregar_cadastro(parametro) {
    if (parametro == 0) {
        httpRequest.open('GET', './arquivos/cadastro_jogadores.html', true);
        httpRequest.send(null);
    } else if (parametro == 1) { 
        httpRequest.open('GET', './arquivos/cadastro_de_perguntas.html', true);
        httpRequest.send(null);
    }

}

//funcao para carregar os dados e criar os novos jogadores
function enviar_dados(parametro) {
    if (parametro == 0) {
        let user_name = document.getElementById('user_name').value;
        let user_password = document.getElementById('user_password').value;
        let user_mail = document.getElementById('user_mail').value;
        if (user_name.length == 0 || user_password == 0) {} else {
            let jogador = {
                'nome': user_name,
                'senha': user_password,
                'email': user_mail,
                'pontos': 0
            };
            vetor_de_jogadores.push(jogador);
        }
    } else if (parametro == 1) {
        let per_titulo = document.getElementById('per_titulo').value;
        let per_desc = document.getElementById('per_desc').value;
        let per_resp = document.getElementById('per_resp').value;
        let opcoes = [];
        opcoes.push(document.getElementById('per_opcao1').value);
        opcoes.push(document.getElementById('per_opcao2').value);
        opcoes.push(document.getElementById('per_opcao3').value);
        opcoes.push(document.getElementById('per_opcao4').value);
        if(per_titulo.length == 0 || per_desc.length == 0 ||  per_resp.length == 0 || opcoes.length == 0){

        }
        else {
            let pergunta = {
                'titulo': per_titulo,
                'desc': per_desc,
                'resp': per_resp,
                'opcoes': [opcoes[0], opcoes[1], opcoes[2], opcoes[3]
                ],
            };
            vetor_de_perguntas.push(pergunta);
        }
    }
    setTimeout(carregar_home, 50);
}

//funcao para carregar o jogo
function carregar_jogo(indice, inicial) {
    if(inicial == 0){
    httpRequest.open('GET', './arquivos/simulado.html', true);
    httpRequest.send(null);
    }
    if(inicial < vetor_de_perguntas.length){
    setTimeout(() => {
            document.getElementById('cabecalho_h1').innerHTML = vetor_de_perguntas[inicial].titulo;
            document.getElementById('cabecalho_p').innerHTML = vetor_de_perguntas[inicial].desc;
            for(var j = 0; j < vetor_de_perguntas[inicial].opcoes.length; j++){
                conteudo = document.getElementById('opcoes').innerHTML;
                document.getElementById('opcoes').innerHTML = conteudo + '<a onclick="(verifica('+ inicial + ',' + j + ',' + indice + '))"> <div class="opcao" id="opcao1">'+
                '<p>' + vetor_de_perguntas[inicial].opcoes[j] + '</p> </div> </a>'
        }
    }, 50);
}
else {
    document.getElementById('cabecalho_h1').innerHTML = 'Parabéns ' + vetor_de_jogadores[indice].nome;
    document.getElementById('cabecalho_p').innerHTML = 'Você acertou ' + vetor_de_jogadores[indice].pontos + ' pontos';
    document.getElementById('opcoes').innerHTML = '';
}
}

//funcao para verificar se o usuario acertou ou nao
function verifica(inicial, j, indice){
    if(vetor_de_perguntas[inicial].resp = vetor_de_perguntas[inicial].opcoes[j]){
        vetor_de_jogadores[indice].pontos = vetor_de_jogadores[indice].pontos + 5;
        carregar_jogo(indice, inicial + 1);
    }
}

//funcao para carregar a lista de jogadores
function carregar_lista_jogadores() {
    httpRequest.open('GET', './arquivos/lista_de_jogadores.html', true);
    httpRequest.send(null);
    setTimeout(carregar_jogadores, 50, [1]); //1 para carregar o login
}

//funcao para carregar a lista de perguntas
function carregar_lista_perguntas() {
    httpRequest.open('GET', './arquivos/lista_de_perguntas.html', true);
    httpRequest.send(null);
    setTimeout(carregar_perguntas, 50);
}

//funcao para carregar as perguntas
function carregar_perguntas() {
    if (vetor_de_perguntas.length == 0) {
        document.getElementById("listagem_h1").innerHTML = 'Sem cadastro de perguntas';
    } else {
        document.getElementById("listagem_h1").innerHTML = 'Perguntas já cadastradas';
        for (var i = 0; i <= vetor_de_perguntas.length; i++) {
            var conteudo = document.getElementById("lista_perguntas").innerHTML;
            document.getElementById("lista_perguntas").innerHTML = conteudo + '<li class="lista_perguntas_item" onclick="carregar_edicao_perguntas('+ i +')" >' + vetor_de_perguntas[i].titulo + '</li>';
        }
    }
}

//funcao para carregar o arquivo login.html
function carregar_login(parametro) {
    httpRequest.open('GET', './arquivos/login.html', true);
    httpRequest.send(null);
    setTimeout(() => {
        if (parametro == 0) {
            document.getElementById('form').innerHTML = '<form id="input_form" class="formulario" method="GET">' +
                '<input class="input_cadastro" id="user_mail" type="text" placeholder="digite o seu e-mail">' +
                '<input class="input_cadastro" id="user_password" type="password" placeholder="digite sua senha">' +
                '<input class="button_cadastro" onclick="login(1)" value="entrar">' +
                '</form>'
        } else if (parametro == 1) {
            document.getElementById('form').innerHTML = '<form id="input_form" class="formulario" method="GET">' +
                '<input class="input_cadastro" id="user_mail" type="text" placeholder="digite o seu e-mail">' +
                '<input class="input_cadastro" id="user_password" type="password" placeholder="digite sua senha">' +
                '<input class="button_cadastro" onclick="login(0)" value="entrar">' +
                '</form>'
        }
    }, 50)
}

//funcao para fazer o login
function login(parametro) {
    let user_mail = document.getElementById('user_mail').value;
    let user_password = document.getElementById('user_password').value;
    if (user_mail.length == 0 || user_password == 0) {} else {
        if (parametro == 0) {
            for (var i = 0; i < vetor_de_jogadores.length; i++) {
                if (vetor_de_jogadores[i].email == user_mail && vetor_de_jogadores[i].senha == user_password) {
                    carregar_edicao(i);
                } else {
                    document.getElementById('status').innerHTML = '<div id="error">dados incorretos</div>';
                }
            }
        } else if (parametro == 1) {
            for (var i = 0; i < vetor_de_jogadores.length; i++) {
                if (vetor_de_jogadores[i].email == user_mail && vetor_de_jogadores[i].senha == user_password) {
                    vetor_de_jogadores[i].pontos = 0;
                    carregar_jogo(i, 0);
                } else {
                    document.getElementById('status').innerHTML = '<div id="error">dados incorretos</div>';
                }
            }
        }
    }
}

//funcao para carregar a edicao de dados dos jogadores
function carregar_edicao(indice) {
    document.getElementById('login_h1').innerHTML = 'Edicao de dados';
    document.getElementById('input_form').innerHTML = '<input class="input_cadastro" id="user_name" type="text" placeholder="novo nome">' +
        '<input class="input_cadastro" id="user_password" type="text" placeholder="nova senha">' +
        '<input class="input_cadastro" id="user_mail" type="text" placeholder="novo email">' +
        '<input class="button_cadastro" onclick="editar_dados_jogadores(' + indice + ')" value="editar">' +
        '<input id="delete" onclick="deletar_jogador(' + indice + ')" value="deletar">';
}

//funcao para a edicao de dados das perguntas
function carregar_edicao_perguntas(indice){
    httpRequest.open('GET', './arquivos/edicao_perguntas.html', true);
    httpRequest.send(null);
    setTimeout(() => {
        document.getElementById('edicao_h1').innerHTML = 'Edicao de dados';
        document.getElementById('form').innerHTML = '<form id="input_form" class="formulario" method="GET">' + 
        '<input class="input_cadastro" id="per_titulo" type="text" placeholder="novo titulo">' +
            '<input class="input_cadastro" id="per_desc" type="text" placeholder="nova desc">' +
            '<input class="input_cadastro" id="per_resp" type="text" placeholder="nova resp">' +
            '<input class="input_cadastro" id="per_opcao1" type="text" placeholder="nova opcao1">' +
            '<input class="input_cadastro" id="per_opcao2" type="text" placeholder="nova opcao2">' +
            '<input class="input_cadastro" id="per_opcao3" type="text" placeholder="nova opcao3">' +
            '<input class="input_cadastro" id="per_opcao4" type="text" placeholder="nova opcao4">' +
            '<input class="button_cadastro" onclick="editar_dados_perguntas(' + indice + ')" value="editar">' +
            '<input id="delete" onclick="deletar_pergunta(' + indice + ')" value="deletar"></form>';
    }, 100);
}

//funcao para editar os dados dos jogadores
function editar_dados_jogadores(indice) {
    let user_name = document.getElementById('user_name').value;
    let user_password = document.getElementById('user_password').value;
    let user_mail = document.getElementById('user_mail').value;
    if (user_name.length == 0 || user_password.length == 0 || user_mail.length == 0) {
        document.getElementById('status').innerHTML = '<div id="error">dados invalidos</div>';
    } else {
        vetor_de_jogadores[indice].nome = user_name;
        vetor_de_jogadores[indice].senha = user_password;
        vetor_de_jogadores[indice].email = user_mail;
        document.getElementById('status').innerHTML = '<div id="correct">dados atualizados</div>';
    }
}

//funcao para editar os dados das perguntas
function editar_dados_perguntas(indice) {
    let per_titulo = document.getElementById('per_titulo').value;
        let per_desc = document.getElementById('per_desc').value;
        let per_resp = document.getElementById('per_resp').value;
        let per_opcoes = [];
        per_opcoes.push(document.getElementById('per_opcao1').value);
        per_opcoes.push(document.getElementById('per_opcao2').value);
        per_opcoes.push(document.getElementById('per_opcao3').value);
        per_opcoes.push(document.getElementById('per_opcao4').value);
        if(per_titulo.length == 0 || per_desc.length == 0 ||  per_resp.length == 0 || per_opcoes.length == 0){
            document.getElementById('status').innerHTML = '<div id="error">dados invalidos</div>';
        }
        else {
            vetor_de_perguntas[indice].titulo = per_titulo;
            vetor_de_perguntas[indice].desc = per_desc;
            vetor_de_perguntas[indice].resp = per_resp;
            vetor_de_perguntas[indice].opcoes[0] = per_opcoes[0];
            vetor_de_perguntas[indice].opcoes[1] = per_opcoes[1];
            vetor_de_perguntas[indice].opcoes[2] = per_opcoes[2];
            vetor_de_perguntas[indice].opcoes[3] = per_opcoes[3]; 
        }
    carregar_home();
}

//funcao para deletar um jogador
function deletar_jogador(indice) {
    vetor_de_jogadores.pop(indice);
    document.getElementById('status').innerHTML = '<div id="correct">jogador deletado</div>';
}

//funcao para deletar uma pergunta
function deletar_pergunta(indice) {
    vetor_de_perguntas.pop(indice);
    document.getElementById('status').innerHTML = '<div id="correct">pergunta deletada</div>';
}