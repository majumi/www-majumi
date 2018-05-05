app.controller('especiaisCtrl', function($scope, $stateParams, ProdutoService){


	$scope.listaCategoria = [];

	ProdutoService.selecionaCategoriasEspeciais().success(function(result){
		console.log(result);
		$scope.listaCategoria = result;



	});




});