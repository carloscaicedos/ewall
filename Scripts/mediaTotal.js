/*jslint browser: true, eqeq: true */
/*global $, jQuery, Snap, getPicture, Square, Container, createBackground, console */

function resolveURL(data, array) {
    'use strict';
    return function (data) {
        var mydiv = document.createElement('div');
        data = data.replace('/testLtotal', 'http://www.ellibrototal.com/testLtotal');
        mydiv.innerHTML = data.trim();
        array.push($('img', $(mydiv)).attr('src'));
    };
}

function getIdImages(book, author) {
    'use strict';
    var urlIds;
    
    book = typeof book != 'undefined' ? book : -1;
    author = typeof author != 'undefined' ? author : -2;
    urlIds = 'http://www.ellibrototal.com/ltotal/inicio/utils.jsp?caso=2&id_libro=' + book + '&id_autor=' + author;
    
    return $.get(urlIds);
}

function getImages(book, author) {
    'use strict';
    var i, urlIds, urlImgs, loadImgs, idList, tasks, urlList, returnList;

    book = typeof book != 'undefined' ? book : -1;
    author = typeof author != 'undefined' ? author : -2;

    urlIds = 'http://www.ellibrototal.com/ltotal/inicio/utils.jsp?caso=2&id_libro=' + book + '&id_autor=' + author;
    urlList = [];
    tasks = [];

    loadImgs = $.get(urlIds).pipe(function (data) {
        idList = data.trim().split(':')[0].split(',');
        
        for (i = 0; i < idList.length; i += 1) {
            urlImgs = 'http://www.ellibrototal.com/ltotal/inicio/load_image.jsp?caso=2&w=500&h=500&idIlust=' + idList[i];

            tasks.push($.get(urlImgs).done(resolveURL(data, urlList)));
        }
        
        return tasks;
    });

    returnList = $.Deferred();

    loadImgs.done(function (tasksList) {
        console.log('Carga img.')
        $.when.apply(null, tasksList).done(function () {
            returnList.resolve(urlList);
        });
    });

    loadImgs.fail(function () {
        console.log('Error al cargar el listado de ids');
    });

    return returnList;
}