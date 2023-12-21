const TOKEN =
  "ea0771ced05a2d0803ab15e81175055042119736915e9472164f5bf0b9e2b364";

$("input[name='cnpj']").mask("99.999.999/0001-99");

$("#buttonSubmit").click(function (e) {
  e.preventDefault();
  var cnpj = $("input[name='cnpj']").val();
  consultarCnpj(cnpj);
});

function consultarCnpj(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  console.log(cnpj);

  $.ajax({
    url: `https://receitaws.com.br/v1/cnpj/${cnpj}`,
    type: "GET",
    dataType: "jsonp",
    crossDomain: true,
    contentType: "application/json",
    success: function (data) {
      Toastify({
        text: "Sucesso",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
      }).showToast();
      console.log(data);
      $("#nome").val(data.nome);
      $("#fantasia").val(data.fantasia);
      $("#logradouro").val(data.logradouro);
      $("#numero").val(data.numero);
      $("#complemento").val(data.complemento);
      $("#bairro").val(data.bairro);
      $("#municipio").val(data.municipio);
      $("#uf").val(data.uf);
      $("#cep").val(data.cep);
      $("#telefone").val(data.telefone);
      $("#email").val(data.email);

      if (data.status == "ERROR") {
        Toastify({
          text: data.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
        }).showToast();
        return;
      }
    },
  });
}
