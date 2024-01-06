let Login = (function() {
    let email = $("#email");
    let password = $("#password");

    let validateForm = function () {
        if (!email.val().trim()) {
            Global.showToast('Informe o seu e-mail!')
            return false;
        }

        if (!password.val().trim()) {
            Global.showToast('Informe sua senha!')
            return false;
        }

        return true;
    };

    let handleForm = function() {
        $('#logar').on("click", function (event) {
            event.preventDefault();

            if (!validateForm()) {
                return false;
            }

            let loginForm = $("#login-form").serialize();

            Ajax.post('/v1/api/user/login', loginForm)
                .done((response) => {
                    Global.redirect('/');
                })
                .fail((data) => {
                    let response = JSON.parse(data.responseText);
                    Global.showToast(response.error.description);
                });
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