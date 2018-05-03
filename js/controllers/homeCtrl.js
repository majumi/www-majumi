app.controller('homeCtrl', function ($scope, $stateParams,$ionicHistory, $ionicSlideBoxDelegate, $state, $ionicModal, ionicMaterialMotion, $stateParams, ProdutoService, Utils) {

   setTimeout(function() {
    $scope.listaProdutos = $stateParams.produtos;
    $scope.$apply();
   }, 600);

    console.log($scope.listaProdutos);

    $scope.ativaMenuButton = false;

    setTimeout(function() {
        $scope.listaProdutos = [];
        ProdutoService.selecionaProdutos().success(function(result){
            $scope.listaProdutos = result;
            console.log(result);

            $scope.listaProdutos.forEach(function(value,item){
               value.promocao = (parseFloat(value.preco) - (parseFloat(value.preco) * parseFloat(value.promo))).toFixed(2);
               value.promocao = value.promocao.toString();
               value.promocao  = value.promocao.replace(".", ",");

           });

            $scope.$apply();
        });
            $scope.$apply();

    }, 500);

    var reset = function() {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };


    $scope.ripple = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 500);
    };

    $scope.fadeSlideInRight = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in-right';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideInRight();
        }, 500);
    };

    $scope.fadeSlideIn = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideIn();
        }, 500);
    };

    $scope.blinds = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds(); // ionic.material.motion.blinds(); //ionicMaterialMotion
        }, 500);
    };

    $scope.blinds();

});