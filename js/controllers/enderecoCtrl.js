app.controller('enderecoCtrl', function($scope,$state,$ionicHistory, $stateParams,$http,$ionicModal, ProdutoService,$cordovaGeolocation){
	$scope.mostraCarrinho = false;
	$scope.cep = "";
	$scope.jaTemEndereco = false;
	$scope.someform = false;
	$scope.endereco = {};
	$scope.pagamentox = "";
	

	$scope.carrinho = JSON.stringify($stateParams.carrinho);
	$scope.total = $stateParams.total;
	
	
	$scope.atualizaview = function(){
		$scope.$apply();
	}


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



	$scope.pegaLocalizacao = function(){
		var posOptions = {timeout: 10000, enableHighAccuracy: false};
		$cordovaGeolocation
		.getCurrentPosition(posOptions)

		.then(function (position) {
			var lat  = position.coords.latitude
			var long = position.coords.longitude
			console.log(lat + '   ' + long)
			
			$http.post('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyCPz3YQIGwsXn7QT2UYyDjf70mJzIL5QMw').success(function (result) {
				console.log(result);
				var cep = result.results[1].address_components[0].long_name;
				$scope.buscaCep(cep);
			});

		}, function(err) {
			console.log(err)
		});
	}

	$scope.finalizaCompra = function(endereco,pagamentox){
		var enderecoString = JSON.stringify(endereco);
		console.log($scope.pagamentox);


		ProdutoService.adicionaPedido({'pedido': $scope.carrinho, 'preco': $scope.total, 'id_usuario': $scope.usuario.id_usuario, 'endereco': enderecoString,'pagamento': $scope.pagamentox}).success(function(result){
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
		}else{
			window.localStorage.setItem("endereco", JSON.stringify($scope.endereco));
			$scope.jaTemEndereco = true;
			$scope.someform = false;
			
		}

	}
});