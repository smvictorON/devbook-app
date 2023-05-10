$('#nova-publicacao').on('submit', criarPublicacao)

$(document).on('click', '.curtir-publicacao', curtirPublicacao)
$(document).on('click', '.descurtir-publicacao', descurtirPublicacao)

$('#atualizar-publicacao').on('click', atualizarPublicacao)
$('.deletar-publicacao').on('click', deletarPublicacao)

function criarPublicacao(e){
  e.preventDefault()

  $.ajax({
    url: "/publicacoes",
    method: "POST",
    data: {
      titulo: $("#titulo").val(),
      conteudo: $("#conteudo").val()
    }
  }).done(function() {
    window.location = "/home"
  }).fail(function(erro) {
    console.log(erro)
    Swal.fire("Ops...", "Erro ao criar publicacão!", "error")
  })
}

function curtirPublicacao(e){
  e.preventDefault()

  const elementoClicado = $(e.target)
  const publicacaoID = elementoClicado.closest('div').data('publicacao-id')

  elementoClicado.prop('disabled', true)

  $.ajax({
    url: `/publicacoes/${publicacaoID}/curtir`,
    method: "POST"
  }).done(function() {
    const contadorDeCurtidas = elementoClicado.next('span');
    const quantidadeDeCurtidas = parseInt(contadorDeCurtidas.text())

    contadorDeCurtidas.text(quantidadeDeCurtidas + 1)

    elementoClicado.addClass('descurtir-publicacao')
    elementoClicado.addClass('text-danger')
    elementoClicado.removeClass('curtir-publicacao')
  }).fail(function(erro) {
    console.log(erro)
    Swal.fire("Ops...", "Erro ao curtir publicacão!", "error")
  }).always(function() {
    elementoClicado.prop('disabled', false)
  })
}

function descurtirPublicacao(e){
  e.preventDefault()

  const elementoClicado = $(e.target)
  const publicacaoID = elementoClicado.closest('div').data('publicacao-id')

  elementoClicado.prop('disabled', true)
  $.ajax({
    url: `/publicacoes/${publicacaoID}/descurtir`,
    method: "POST"
  }).done(function() {
    const contadorDeCurtidas = elementoClicado.next('span');
    const quanditadeDeCurtidas = parseInt(contadorDeCurtidas.text())
    contadorDeCurtidas.text(quanditadeDeCurtidas - 1)

    elementoClicado.addClass('curtir-publicacao')
    elementoClicado.removeClass('text-danger')
    elementoClicado.removeClass('descurtir-publicacao')
  }).fail(function(erro) {
    console.log(erro)
    Swal.fire("Ops...", "Erro ao descurtir publicacão!", "error")
  }).always(function() {
    elementoClicado.prop('disabled', false)
  })
}

function atualizarPublicacao(){
  $(this).prop('disabled', true)
  const publicacaoID = $(this).data('publicacao-id')

  $.ajax({
    url: `/publicacoes/${publicacaoID}`,
    method: "PUT",
    data: {
      titulo: $("#titulo").val(),
      conteudo: $("#conteudo").val()
    }
  }).done(function() {
    Swal.fire("Sucesso!", "Publicacão atualizada!", "success")
    .then(function() {
      window.location = "/home"
    })
  }).fail(function(erro) {
    console.log(erro)
    Swal.fire("Ops...", "Erro ao atualizar publicacão!", "error")
  }).always(function() {
    $("#atualizar-publicacao").prop('disabled', false)
  })
}

function deletarPublicacao(e){
  e.preventDefault()

  Swal.fire({
    title: "Atenção!",
    text: "Tem certeza que deseja excluir publicação?",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    icon: "warning"
  }).then(function(confirmacao) {
    if (!confirmacao.value)
      return

    const elementoClicado = $(e.target)
    const publicacao = elementoClicado.closest('div')
    const publicacaoID = publicacao.data('publicacao-id')

    $.ajax({
      url: `/publicacoes/${publicacaoID}`,
      method: "DELETE",
    }).done(function() {
      publicacao.fadeOut("slow", function(){
        $(this).remove();
      })
    }).fail(function(erro) {
      console.log(erro)
      Swal.fire("Ops...", "Erro ao deletar publicacão!", "error")
    })
  })
}