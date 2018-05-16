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

			$scope.listaCategoriaProdutos.forEach(function(value,item){
				value.promocao_porc = (parseFloat(value.preco) - (parseFloat(value.preco) * parseFloat(value.oferta_porc))).toFixed(2);
				value.promocao_porc = value.promocao_porc.toString();
				value.promocao_porc = value.promocao_porc.replace(".", ",");

			});
			
			$scope.listaCategoriaProdutos.forEach(function(produto,item){
				produto.qtde = 1;
				produto.qtde_total = 0;
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