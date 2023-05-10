$("#formulario-cadastro").on("submit", criarUsuario)

function criarUsuario(e){
  e.preventDefault();

  if ($("#senha").val() !== $("#confirmar-senha").val()) {
    Swal.fire("Ops...", "As senhas não coincidem!", "error")
    return
  }

  $.ajax({
    url: "/usuarios",
    method: "POST",
    data: {
      nome: $("#nome").val(),
      email: $("#email").val(),
      nick: $("#nick").val(),
      senha: $("#senha").val(),
    }
  }).done(function() {
    Swal.fire("Sucesso!", "Usuário Cadastrado com Sucesso!", "success")
      .then(function() {
        $.ajax({
            url: "/login",
            method: "POST",
            data: {
                email: $('#email').val(),
                senha: $('#senha').val()
            }
        }).done(function() {
            window.location = "/home";
        }).fail(function() {
            Swal.fire("Ops...", "Erro ao autenticar o usuário!", "error");
        })
      })
  }).fail(function(erro) {
    console.log(erro)
    Swal.fire("Ops...", "Erro ao Cadastrar Usuário!", "error")
  });

}