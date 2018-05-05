app.controller('bebidasCtrl', function($scope, $stateParams,$ionicModal, ProdutoService){

	$scope.listaCategoria = [];

	ProdutoService.selecionaCategoriasBebidas().success(function(result){
		console.log(result);
		$scope.listaCategoria = result;

	});

	$scope.listaCategoriaProdutos = [];
	$scope.abreListaProdutos = function(categoria){
		$scope.categoria = categoria;
		ProdutoService.selecionaCategoriaProduto({'id_categoria': categoria.id_categoria}).success(function(result){
			console.log(result);
			$scope.listaCategoriaProdutos = result;
			$ionicModal.fromTemplateUrl('templates/modal/modalListaProdutos.html', function ($ionicModal) {
				$scope.modalListaProdutos = $ionicModal;
				$scope.modalListaProdutos.show();
			}, {
				scope: $scope,
				animation: 'slide-in-up'
			});



		});

	}

});