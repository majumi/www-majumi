

app.factory("LoginService", function ($http, Utils) {

    this.login = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'login/login.php', params);
    } 

    this.cadastro = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'login/cadastro.php', params);
    }     

    return this;

})

app.factory("ProdutoService", function ($http, Utils) {

    this.selecionaProdutos = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'produtos/selecionaProdutos.php', params);

    }

    this.selecionaCategoriasBebidas = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'produtos/selecionaCategoriasBebidas.php', params);
    }

    this.selecionaCategoriasTabacaria = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'produtos/selecionaCategoriasTabacaria.php', params);
    } 

    this.selecionaCategoriasPicantes = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'produtos/selecionaCategoriasPicantes.php', params);

    } 

    this.selecionaCategoriasEspeciais = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'produtos/selecionaCategoriasEspeciais.php', params);
    } 

    this.selecionaCategoriaProduto = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'produtos/selecionaCategoriaProduto.php', params);
    } 

    this.adicionaPedido = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'produtos/adicionaPedido.php', params);
    }
    return this;

})


.factory("Utils", function () {


    // producao
    var BASE = "http://indexpublicidade.com.br/";

   // web_service localhost



   this.BASE_URL = BASE;

   this.BASE_URL_SERVICE = this.BASE_URL + "web_service/";

   this.BASE_URL_UPLOAD = this.BASE_URL_SERVICE+"upload/";

   
   this.UPLOAD_URL = {


    "POST":         { "ORIG": this.BASE_URL_UPLOAD+"post/"}      

}



this.headerConfig = {
    headers: {
        'Content-Type': undefined
    },
    transformRequest: angular.identity
};

this.isEmpty = function (str) {
    if (!str || str.length == 0) {
        return true;
    }
    return false;
}

return this;

})
