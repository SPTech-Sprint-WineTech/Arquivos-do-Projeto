function toLogin() {
	window.location.href = "../public/login.html";
}

function cadastrar() {
	// aguardar();

	//Recupere o valor da nova input pelo nome do id
	// Agora vá para o método fetch logo abaixo
	var nomeVar = input_nome.value;
	var telefoneVar = input_telefone_responsavel.value;
	var cnpjVar = input_cnpj.value;
	var emailVar = input_email.value;
	var senhaVar = input_senha.value;
	var confirmacaoSenhaVar = input_confirmacao_senha.value;

	console.log(nomeVar, telefoneVar, cnpjVar, emailVar, senhaVar);

	if (
		nomeVar == "" ||
		telefoneVar == "" ||
		cnpjVar == "" ||
		emailVar == "" ||
		senhaVar == "" ||
		confirmacaoSenhaVar == ""
	) {
		// cardErro.style.display = "block";
		// mensagem_erro.innerHTML =
		// 	"(Mensagem de erro para todos os campos em branco)";
		console.log(`erro de campos`);
		// finalizarAguardar();
		return false;
	}
	// else {
	// 	setInterval(sumirMensagem, 5000);
	// }

	console.log(`cadastrar do cadastro`);
	// Enviando o valor da nova input
	fetch("/usuarios/cadastrar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			// crie um atributo que recebe o valor recuperado aqui
			// Agora vá para o arquivo routes/usuario.js
			nomeServer: nomeVar,
			telefoneServer: telefoneVar,
			cnpjServer: cnpjVar,
			emailServer: emailVar,
			senhaServer: senhaVar,
		}),
	})
		.then(function (resposta) {
			console.log(`then do cadastrar do cadastro`);
			console.log("resposta cadastro: ", resposta);

			if (resposta.ok) {
				console.log(`if do then do cadastrar do cadastro`);
				// cardErro.style.display = "block";

				// mensagem_erro.innerHTML =
				// 	"Cadastro realizado com sucesso! Redirecionando para tela de Login...";

				setTimeout(() => {
					window.location = "login.html";
				}, "2000");

				// limparFormulario();
				// finalizarAguardar();
			} else {
				throw "Houve um erro ao tentar realizar o cadastro!";
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
			// finalizarAguardar();
		});

	return false;
}

function listar() {
	fetch("/empresas/listar", {
		method: "GET",
	})
		.then(function (resposta) {
			resposta.json().then((empresas) => {
				empresas.forEach((empresa) => {
					listaEmpresas.innerHTML += `<option value='${empresa.id}'>${empresa.cnpj}</option>`;
				});
			});
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});
}

function sumirMensagem() {
	cardErro.style.display = "none";
}
