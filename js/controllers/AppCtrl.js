app.controller('AppCtrl', function ($scope, $ionicModal,$ionicPopup, $ionicSideMenuDelegate, $ionicPopover, $ionicHistory,$state,$timeout,ProdutoService) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.showMenu = false;
    
    $scope.mostraCarrinho = false;
    $scope.usuario = {};

    $scope.carrinho = [];


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
            atualizaDadosizaTotal();
            swal('Adicionado',produto.nome, 'success');

            swal("Produtos removidos com sucesso", {
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
    function atualizaDadosizaTotal(){
        $scope.total = 0;
        $scope.carrinho.forEach(function(value,item){

            $scope.total += parseFloat(value.preco.replace(",","."));
            

        });

    }

    $scope.adicionaCarrinho = function(produto){


        if(produto.qtde == 0){
           swal('', 'Adicione a quantidade que deseja', 'warning');
       }else if(produto.qtde < 0){
        swal('Erro', 'Quantidade não pode ser negativa', 'error');
    }else{
        for(i=1; i<=produto.qtde; i++){
            $scope.carrinho.push(produto);               
        }
        atualizaDadosizaTotal();
        swal('Adicionado', "("+produto.qtde+ "x " + produto.nome+ ")", 'success');
    }

}

$scope.removeCarrinho = function(index){
    $scope.carrinho.splice(index, 1);
    atualizaDadosizaTotal()
}





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