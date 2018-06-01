app.controller('pedidosCtrl', function($scope, $stateParams, $ionicModal, PedidosService){

	$scope.listaPedidos = [];

	setTimeout(function() {
		PedidosService.selecionaPedido({'id_usuario': $scope.usuario.id_usuario}).success(function(result){
			$scope.listaPedidos = result;
			console.log(result);
			$scope.listaPedidos.forEach(function(value,item){
				value.pedido = value.pedido.toString();
				// value.pedidoX = JSON.parse(value.pedido);

			});
		});
	},800);

	$scope.atualizaDados =function(){

		setTimeout(function() {
			
			$scope.usuario.id_usuario = window.localStorage.getItem("id_usuario");

		}, 500);


	}

	$scope.atualizaDados();





});