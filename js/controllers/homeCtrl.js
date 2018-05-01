app.controller('homeCtrl', function ($scope, $stateParams,$ionicHistory, $ionicSlideBoxDelegate, $state, $ionicModal, ionicMaterialMotion, $stateParams, Utils) {




    
    $scope.ativaMenuButton = false;





$scope.abreBebidas = function ( ){

    $state.go('app.bebidas');
}

$scope.abreEspeciais = function ( ){

    $state.go('app.especiais');
}

$scope.abreTabacaria = function ( ){

    $state.go('app.tabacaria');
}

$scope.abrePicante = function ( ){
    
    $state.go('app.picante');
}




// $scope.options = {

// loop: true,
// autoplay: true

// };




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