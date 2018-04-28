

app.factory("LoginService", function ($http, Utils) {

    this.login = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'login/login.php', params);
    } 

    this.cadastro = function (params) {
        return $http.post(Utils.BASE_URL_SERVICE + 'login/cadastro.php', params);
    }     

    return this;

})


.factory("Utils", function () {


    // producao
    var BASE = "http://localhost/majumi/www/";

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
