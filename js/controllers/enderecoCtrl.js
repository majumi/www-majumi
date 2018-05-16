app.controller('enderecoCtrl', function($scope,$state,$ionicHistory, $stateParams,$http,$ionicModal, ProdutoService){
	$scope.mostraCarrinho = false;
	$scope.cep = "";
	$scope.jaTemEndereco = false;
	$scope.someform = false;
	$scope.endereco = {};

	$scope.carrinho = JSON.stringify($stateParams.carrinho);
	$scope.total = $stateParams.total;
	
	
	if(window.localStorage.getItem("endereco") != null){
		$scope.jaTemEndereco = true;
		$scope.endereco = JSON.parse(window.localStorage.getItem("endereco")); 
	}
	$scope.buscaCep = function(cep){

		$http.post('https://viacep.com.br/ws/'+cep+'/json/').success(function (result) {
			console.log(result);
			$scope.endereco = result;
			$scope.endereco.numero = "";
			$scope.someform = true;
		});
	}

	$scope.finalizaCompra = function(endereco,pagamento){
		var enderecoString = JSON.stringify(endereco);


		ProdutoService.adicionaPedido({'pedido': $scope.carrinho, 'preco': $scope.total, 'id_usuario': $scope.usuario.id_usuario, 'endereco': enderecoString,'pagamento': pagamento}).success(function(result){
			console.log(result);
			swal('','Pedido registrado com sucesso, aguarde enquanto analisamos o seu pedido','success');
			$state.go('app.home');
			$ionicHistory.nextViewOptions({
				disableBack: true
			});

			$scope.mostraCarrinho = true;

		});

	}
	
	$scope.salvarEndereco = function (endereco) {
		console.log(endereco);
		if(endereco.logradouro == ""){
			swal('','Campo logradouro não pode ser vazio', 'warning');
		}else
		if(endereco.bairro == ""){
			swal('','Campo bairro não pode ser vazio', 'warning');
		}else
		if(endereco.localidade == ""){
			swal('','Campo localidade não pode ser vazio', 'warning');
		}else
		if(endereco.uf == ""){
			swal('','Campo uf não pode ser vazio', 'warning');
		}else
		if(endereco.complemento == ""){
			swal('','Campo complemento não pode ser vazio', 'warning');
		}else
		if(endereco.numero == ""){
			swal('','Campo numero não pode ser vazio', 'warning');
		}

		window.localStorage.setItem("endereco", JSON.stringify($scope.endereco));
		$scope.jaTemEndereco = true;
		$scope.someform = false;
	}
});