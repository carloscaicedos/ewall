/*jslint browser: true, eqeq: true */
/*global $, jQuery, Snap, getPicture, Square, Container, createBackground */

function getURLParams() {
    'use strict';
    var i, params = [], vars = [];

    if (window.location.search.length > 0) {
        vars = window.location.search.substr(1).split('&');
        for (i = 0; i < vars.length; i += 1) {
            params[vars[i].split('=')[0]] = vars[i].split('=')[1];
        }
    }

    return params;
}

function listenNotifies() {
    'use strict';
    var noticia, conn;
    
    $.connection.hub.url = "http://ewall.syc.com.co/signalr";
    conn = $.connection.newsHub;

    conn.client.broadcastNews = function (news) {
        noticia = new Container('rhombus', news.titulo, news.subtitulo, news.firmas[0], news.imagenes[0], news.texto, news.dias, news.porcentaje, news.categoria);
        document.body.appendChild(noticia.mainContainer);
        noticia.show(true, function () {
            setTimeout(function () {
                noticia.show(false, function () {
                    document.body.removeChild(noticia.mainContainer);
                });
            }, 20000);
        });
    };

    $.connection.hub.start();
}

$(document).ready(function () {
    'use strict';
    var params = getURLParams();
    
    //Crear background
    createBackground(params.bg);
    
    //Escuchar notificaciones
    listenNotifies();
});