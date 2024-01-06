let User = (function() {
    let name = $("#name");
    let email = $("#email");
    let password = $("#password");

    let validateForm = function () {
        if (!name.val().trim()) {
            Global.showToast('Informe o seu nome!')
            return false;
        }

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
        $('#signup').on("click", function (event) {
            event.preventDefault();

            if (!validateForm()) {
                return false;
            }

            let userForm = $("#user-form").serialize();

            Ajax.post('/v1/api/user/save', userForm)
                .done((response) => {
                    Global.redirect('/login');
                })
                .fail((data) => {
                    let response = JSON.parse(data.responseText);
                    Global.showToast(response.error.description);
                })
        });
    }

    return {
        init: () => {
            handleForm();
        }
    }
})();

jQuery(function() {
    User.init();
});