app.controller('loginCtrl', function ($scope, $stateParams, $state,$ionicModal,$ionicSideMenuDelegate, ionicMaterialMotion, $stateParams, $ionicHistory, Utils, LoginService) {

	$scope.usuario = {};
	$scope.usuario.nome = "";
	$scope.usuario.email = "";
	$scope.usuario.senha = "";
	$scope.usuario.csenha = "";
	$scope.ativaMenuButton = false;
	$scope.showMenu = false;
	$scope.side = "none";
	$scope.nome = false;
	$scope.nome = "asdasdsa";
	$scope.estalogado = window.localStorage.getItem("usuario");
	$scope.carregando = false;

	$scope.email = window.localStorage.getItem("email");
	$scope.avatar = window.localStorage.getItem("avatar");
	$scope.nome = window.localStorage.getItem("nome");

	$scope.mostraCarrinho = false;

	
	



	setTimeout(function() {

		if($scope.nome){
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$scope.atualizaDados();
			$state.go('app.home');
		}

	}, 1000);

	


	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	$scope.exibeCadastro = function(post){

		$ionicModal.fromTemplateUrl('templates/modal/modalCadastro.html', function ($ionicModal) {
			$scope.modalCadastro = $ionicModal;
			$scope.modalCadastro.show();
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});


	}

	$scope.user = {};
	$scope.user.nome = "";
	$scope.user.senha = "";
	$scope.user.email = "";
	$scope.user.csenha = "";

	$scope.cadastrar = function(user){
		$scope.carregando = true;
		
		if(user.nome == "" || user.nome == undefined || user.nome == false){
			swal("Ops", "Campo de nome não pode ser vazio", "warning");
			return;
		}
		if(user.email == "" || user.email == undefined || user.email == false){
			swal("Ops", "Campo de e-mail não pode ser vazio", "warning");
			return;
		}

		if(user.senha == "" || user.senha == undefined || user.senha == false){
			swal("Ops", "Campo de senha não pode ser vazio", "warning");
			return;
		}



		if(user.csenha == "" || user.csenha == undefined || user.csenha == false){
			swal("Ops", "Campo de confirmar senha não pode ser vazio", "warning");
			return;
		}


		if(user.senha != user.csenha){
			swal("Ops", "Senhas não coincidem", "warning");
			return;
		}else{


			LoginService.cadastro({'nome': user.nome, 'email': user.email, 'senha': user.senha}).success(function(result){

				console.log(result);
				swal("Parabéns!", "Cadastrado com sucesso", "success");
				// $scope.modalCadastro.hide();
				$scope.carregando = false;
			});


		}

		


	}

	
	$scope.login = function(email, senha){
		$scope.carregando = true;

		if(email == "" || email == undefined || email == false){
			swal("", "Campo de e-mail não pode ser vazio", "warning");
			return;
		}

		if(senha == "" || senha == undefined || senha == false){
			swal("", "Campo de senha não pode ser vazio", "warning");
			return;
		}
       
		LoginService.login({'email': email, 'senha': senha}).success(function(result){
			console.log(result);

			$scope.usuario = result;


			if($scope.usuario == ""){
				swal("", "Usuário ou senha não encontrados", "warning");
			}else{

				
				window.localStorage.setItem("usuario", $scope.usuario);
				window.localStorage.setItem("id_usuario", result[0].id_usuario);
				window.localStorage.setItem("email", email);
				window.localStorage.setItem("senha", senha);
				window.localStorage.setItem("nome", result[0].nome);
				window.localStorage.setItem("avatar", result[0].avatar);
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$scope.atualizaDados();
				$state.go('app.home');
				$scope.ativaMenuButton = true;
				$scope.carregando = false;
				$scope.mostraCarrinho = true;
				$ionicSideMenuDelegate.canDragContent(true);
			}
		});



	}

});