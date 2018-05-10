app.controller('especiaisCtrl', function($scope, $stateParams, $ionicModal, ProdutoService){


	$scope.listaCategoria = [];

	ProdutoService.selecionaCategoriasEspeciais().success(function(result){
		console.log(result);
		$scope.listaCategoria = result;



	});

	$scope.listaCategoriaProdutos = [];
	$scope.abreListaProdutos = function(categoria){
		$scope.categoria = categoria;
		ProdutoService.selecionaCategoriaProduto({'id_categoria': categoria.id_categoria}).success(function(result){
			console.log(result);

			$scope.listaCategoriaProdutos = result;
			$scope.listaCategoriaProdutos.forEach(function(produto,item){
				produto.qtde = 1;
			});
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