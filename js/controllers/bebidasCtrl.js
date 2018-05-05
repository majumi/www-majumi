app.controller('bebidasCtrl', function($scope, $stateParams, ProdutoService){

	$scope.listaCategoria = [];

	ProdutoService.selecionaCategoriasBebidas().success(function(result){
		console.log(result);
		$scope.listaCategoria = result;



	});




});