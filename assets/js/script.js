// Verificando o formulário com o Bootstrap Validation
(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()



$(document).ready(function () {

  // Validando o CPF

  $("#cpf").keyup(function () {
    validateCPF();
  });

  //Máscara do CPF com Jquery e jquery.mask
  $("#cpf").keypress(function () {
    $(this).mask('000.000.000-00');
  });

  function validateCPF() {
    let cpfValue = $("#cpf").val();
    if (cpfValue.length == "") {
      return false;
    } else if (cpfValue.length != 14) {
      return false;
    }
  }


  // Validando email
  $("#email").blur(function () {
    validateEmail();
  });
  function validateEmail() {
    const email = document.getElementById("email");
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let s = email.value;
    if (regex.test(s)) {
      $("#emailcheck").hide();
      return true;
    } else {
      $("#emailcheck").show();
      return false;
    }
  }


  // Validando a senha
  $("#password").keyup(function () {
    validatePassword();
  });
  function validatePassword() {
    let passwordValue = $("#password").val();
    if (passwordValue.length == "") {
      $("#passcheck").show();
      return false;
    }
    if (passwordValue.length > 0 && passwordValue.length < 6) {
      $("#passcheck").show();
      $("#passcheck").html(
        "Sua senha deve conter no mínimo 6 caracteres"
      );
      return false;
    } else {
      $("#passcheck").hide();
    }
  }


  // Validando a confirmação de senha
  $("#re_password").keyup(function () {
    validateConfirmPassword();
  });
  function validateConfirmPassword() {
    let confirmPasswordValue = $("#re_password").val();
    let passwordValue = $("#password").val();
    if (confirmPasswordValue.length == "") {
      $("#conpasscheck").show();
      return false;
    }
    if (passwordValue != confirmPasswordValue) {
      $('#conpasscheck').show()
      $("#conpasscheck").html(
        "As senhas precisam ser idênticas."
      );
      return false;
    } else {
      $("#conpasscheck").hide();
    }
  }


  // Verifica os inputs antes de enviar o formulário
  $("form").on("submit", function () {
    var empty = false;
    $(this).find('input').each(function () {

      if (!$(this).val()) {
        empty = true;
        return false;
      }
      else if (empty) {
        return false;
      }
    });
    
    if (validateEmail() == false || validateCPF() == false || validateConfirmPassword() == false) {
      return false;
    }
    else if (empty) {
      return false;
    }
    else {
      //Passando em todas as validações, retornar mensagem informando "Cadastro Enviado"
      $('#regis_success').show().delay(3000).fadeOut("slow");
    }

  });


});


