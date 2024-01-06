let Login = (function() {
    let handleForm = function() {
        $('#logar').on("click", function (event) {
            event.preventDefault();
            let loginForm = $("#login-form").serialize();

            Ajax.post('/v1/api/user/login', loginForm)
                .done((response) => {
                    Global.redirect('/');
                })
                .fail((data) => {
                    let response = JSON.parse(data.responseText);
                    alert(response.message);
                })

            // $.ajax({
            //     url: '/user/login',
            //     type: 'POST',
            //     data: loginForm,
            //     contentType:"application/json;",
            //     dataType: "json",
            //     success: function (data) {
            //         console.log(data);
            //         Global.redirect('/');
            //     },
            //     error: function (data) {
            //         let response = JSON.parse(data.responseText);
            //
            //         alert(response.message);
            //     }
            // });
        });
    }

    return {
        init: () => {
            handleForm();
        }
    }
})();

jQuery(function() {
    Login.init();
});