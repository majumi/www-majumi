app.controller('AppCtrl', function ($scope, $ionicModal,$ionicPopup, $ionicSideMenuDelegate, $ionicPopover, $ionicHistory,$state,$timeout,ProdutoService) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.showMenu = false;
    $scope.mostraCarrinho = false;
    $scope.usuario = {};
    $scope.total = 0;
    $scope.carrinho = [];


    $scope.atualizaDados =function(){

     $scope.showMenu = true;
     setTimeout(function() {
        $scope.usuario.email = window.localStorage.getItem("email");
        $scope.usuario.avatar = window.localStorage.getItem("avatar");
        $scope.usuario.nome = window.localStorage.getItem("nome");
        $scope.usuario.id_usuario = window.localStorage.getItem("id_usuario");

        $scope.mostraCarrinho = true;

    }, 500);
 }


 $scope.adicionaOferta = function(produto){

    swal({
        title: "",
        text: "Deseja adicionar oferta ao carrinho?",
        icon: "warning",
        buttons: true,
        dangerMode: false
    })
    .then((confirma) => {

      if (confirma) {
        $scope.carrinho.push(produto);  
        $scope.total = $scope.total + parseFloat(produto.promocao_porc);

        swal('Adicionado',produto.nome, 'success');

        swal("Produtos adicionado com sucesso", {
          icon: "success",
      });

        $scope.$apply();
    } else {

    }
});
}
$scope.limpaCarrinho = function(){


    swal({
        title: "Tem certeza?",
        text: "Isto removerá todos os produtos do carrinho",
        icon: "warning",
        buttons: true,
        dangerMode: false
    })
    .then((confirma) => {

      if (confirma) {

       swal("Produtos removidos com sucesso", {
          icon: "success",
      });
       $scope.carrinho = [];
       $scope.total = 0;
       $scope.$apply();
   } else {

   }
});
}


$scope.adicionaCarrinho = function(produto){

    if(produto.qtde < 1){
        swal('','Por favor selecione um valor positivo', 'warning');
        return;
    }


    if(produto.oferta == 1){
        // Se o produto é oferta
        if($scope.carrinho.includes(produto)){
            // Se o produto existe no array de objeto
            var index = $scope.carrinho.indexOf(produto);
            // Pega index da posição deste produto no array caso ele ja exista
            $scope.carrinho[index].qtde_total += produto.qtde;            
            $scope.total += produto.qtde * (parseFloat(produto.preco) - (parseFloat(produto.preco) * parseFloat(produto.oferta_porc)));
            swal('', 'Adicionado mais '+ produto.qtde +'x ' + produto.nome + ' ao seu carrinho', 'success');
        }else{
            var result = (produto.qtde * (parseFloat(produto.preco) - (parseFloat(produto.preco) * parseFloat(produto.oferta_porc))));
            produto.qtde_total += produto.qtde;
            $scope.total = $scope.total + result;
            $scope.carrinho.push(produto);
            console.log($scope.carrinho);
            swal('', 'Adicionado '+ produto.qtde +'x ' + produto.nome + ' ao seu carrinho', 'success');
            
        }

    }else if(produto.oferta == 0){

       if($scope.carrinho.includes(produto)){
        var index = $scope.carrinho.indexOf(produto);
        $scope.carrinho[index].qtde_total += produto.qtde;
        $scope.total += produto.qtde * parseFloat(produto.preco);
        swal('', 'Adicionado mais '+ produto.qtde +'x ' + produto.nome + ' ao seu carrinho', 'success');

    }else{
        var result = (produto.qtde * parseFloat(produto.preco)  );
        produto.qtde_total += produto.qtde;
        $scope.total = $scope.total + result;
        $scope.carrinho.push(produto);
        swal('', 'Adicionado '+ produto.qtde +'x ' + produto.nome + ' ao seu carrinho', 'success');
        
    }
}else{
    swal('Erro', 'Algum erro ocorreu', 'error');
}

produto.qtde = 1;
}

$scope.removeCarrinho = function(produto,index){
    console.log(produto);
    if(produto.oferta == 1){

        $scope.total = $scope.total - (produto.qtde_total *  (parseFloat(produto.preco) - (parseFloat(produto.preco) * parseFloat(produto.oferta_porc))));
    }else if(produto.oferta == 0){

        $scope.total = $scope.total - (produto.qtde_total * parseFloat(produto.preco));
    }
    $scope.carrinho.splice(index, 1);

}





$scope.abreBebidas = function ( ){
    $ionicHistory.nextViewOptions({
        disableBack: false
    });
    $state.go('app.bebidas');




}




$scope.abreEspeciais = function ( ){
    $ionicHistory.nextViewOptions({
        disableBack: false
    });
    $state.go('app.especiais');


}

$scope.abreTabacaria = function ( ){
    $ionicHistory.nextViewOptions({
        disableBack: false
    });

    $state.go('app.tabacaria');
}

$scope.abrePicante = function ( ){
    $ionicHistory.nextViewOptions({
        disableBack: false
    });

    $state.go('app.picante');
}

$scope.finalizarCompra =function(){
    $state.go('app.endereco', {'carrinho': $scope.carrinho,'total': $scope.total});
    
}

$scope.abreHome = function ( ){
    $scope.listaProdutos = [];

    ProdutoService.selecionaProdutos().success(function(result){
        $scope.listaProdutos = result;


        $scope.listaProdutos.forEach(function(value,item){
            value.promocao = (parseFloat(value.preco) - (parseFloat(value.preco) * parseFloat(value.promo))).toFixed(2);
            value.promocao = value.promocao.toString();
            value.promocao  = value.promocao.replace(".", ",");
            $scope.$apply();
        });

        $scope.$apply();

    });

    $ionicHistory.nextViewOptions({
        disableBack: true
    });
    $state.go('app.home' , {'produtos': $scope.listaProdutos});
}




setTimeout(function() {

    if(!$scope.nome){
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.login');
    }

}, 1000);



// var navIcons = document.getElementsByClassName('ion-navicon');
// for (var i = 0; i < navIcons.length; i++) {
//     navIcons.addEventListener('click', function () {
//         this.classList.toggle('active');
//     });
// }
$scope.sair = function(){

    swal({
        title: "Tem certeza?",
        text: "Você deseja sair da sua conta?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $scope.usuario = {};
            localStorage.clear();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.login');
            
            $scope.showMenu = false;
            $scope.mostraCarrinho = false;


        } 
    });
}

$scope.abreCarrinho = function(){

    $state.go('app.carrinho');
}

$scope.abreConfiguracao = function(){

 $ionicModal.fromTemplateUrl('templates/modal/modalConfiguracao.html', function ($ionicModal) {
    $scope.modalConfiguracao = $ionicModal;
    $scope.modalConfiguracao.show();
}, {
    scope: $scope,
    animation: 'slide-in-up'
});

}

$scope.abreInfo = function(){

 $ionicModal.fromTemplateUrl('templates/modal/modalInfo.html', function ($ionicModal) {
    $scope.modalInfo = $ionicModal;
    $scope.modalInfo.show();
}, {
    scope: $scope,
    animation: 'slide-in-up'
});

}

$scope.abrePedidos = function(){
  $ionicModal.fromTemplateUrl('templates/modal/modalPedidos.html', function ($ionicModal) {
    $scope.modalPedidos = $ionicModal;
    $scope.modalPedidos.show();
}, {
    scope: $scope,
    animation: 'slide-in-up'
});
}


$scope.showPopup = function(){

   var alertPopup = $ionicPopup.alert({
    title: 'Olhar de Cinema',
    template: '<div style="text-align: justify">O Olhar de Cinema - Festival Internacional de Curitiba começou suas atividades em 2012 como um evento internacional de cinema independente que acontece todo mês de junho na cidade de Curitiba. <a href="https://olhardecinema.com.br" target="_blank">Saiba mais sobre o festival.'
});
}

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
    '   <ion-header-bar style="background-color: #508dab!important">' +
    '       <h1 class="title">My Popover Title</h1>' +
    '   </ion-header-bar>' +
    '   <ion-content class="padding">' +
    '       My Popover Contents' +
    '   </ion-content>' +
    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
});