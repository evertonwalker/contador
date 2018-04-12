var tempoInicial = $("#tempoDigitacao").text();

$(function () {
    atualizarTamanhoDaFrase();
    inicializarContadores();
    iniciarlizarCronometro();
    inicializarMarcadores();
    $("#botaoReiniciar").click(reiniciarJogo);

});

function atualizarTamanhoDaFrase() {
    $("#tamanhoDaFrase").text($(".frase").text().split(" ").length);
};

var campo = $(".digitador");

function inicializarContadores() {
    campo.on('input', function () {
        conteudo = campo.val();

        $(".qtdPalavras").text(conteudo.split(/\S+/).length - 1);
        $(".qtdCaracteres").text(conteudo.length);

    });
}


function iniciarlizarCronometro() {

    var tempoRestando = $("#tempoDigitacao").text();

    campo.one('focus', function () {
        var idInterval = setInterval(function () {
            --tempoRestando;
            $("#tempoDigitacao").text(tempoRestando);
            if (tempoRestando < 1) {
                campo.attr('disabled', true);
                clearInterval(idInterval);
                campo.toggleClass("campo-desativado");
            }
        }, 1000);
    });

}

function reiniciarJogo() {

    var tempoRestando = $("#tempoDigitacao").text();

    if (tempoRestando == 0) {
        campo.attr("disabled", false);
        campo.val("");
        $(".qtdPalavras").text('0');
        $(".qtdCaracteres").text('0');
        $("#tempoDigitacao").text(tempoInicial);
        iniciarlizarCronometro();
        campo.toggleClass("campo-desativado");
        campo.toggleClass("campo-errado");
        campo.toggleClass("campo-correto");
    } else {

        $("#mensagem-erro").text(" Não foi possível reiniciar o jogo sem ele terminar, aguarde...");

        setTimeout(function () {
            $("#mensagem-erro").text("");

        }, 3000)
    }

};

function inicializarMarcadores() {

    var frase = $(".frase").text()
    campo.on("input", function () {
        var digitado = campo.val();

        var comparavel = frase.substr(0, digitado.length);

        var testeCompativel = (digitado == comparavel);

        campo.toggleClass("campo-correto", testeCompativel);
        campo.toggleClass("campo-errado", !testeCompativel);

    }
    )
};

function inserirPlacar(){
    var corpoTabela = $(".placar").find('tbody');
}




