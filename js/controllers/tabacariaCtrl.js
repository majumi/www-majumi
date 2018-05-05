app.controller('tabacariaCtrl', function($scope, $stateParams, ProdutoService){

	$scope.listaCategoria = [];

	ProdutoService.selecionaCategoriasTabacaria().success(function(result){
		console.log(result);
		$scope.listaCategoria = result;



	});


});