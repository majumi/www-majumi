app.controller('picanteCtrl', function($scope, $stateParams, ProdutoService){


	$scope.listaCategoria = [];

	ProdutoService.selecionaCategoriasPicantes().success(function(result){
		console.log(result);
		$scope.listaCategoria = result;



	});

});