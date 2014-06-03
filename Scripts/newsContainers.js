// Generador de contenedores
/*jslint browser: true, eqeq: true*/
/*global $*/

// Contenedores cuadrados
function SquareContainer(title, intro, author, urlImage, detail) {
    'use strict';
    var firma = document.createElement('div'),
        contFirma = document.createElement('div'),
        titulo = document.createElement('h1'),
        contTitulo = document.createElement('section'),
        resumen = document.createElement('article'),
        footer = document.createElement('section'),
        imagen = document.createElement('img'),
        noticia = document.createElement('div');

    $(firma).addClass('firma');
    $(firma).text(author);

    $(contFirma).addClass('contFirma');
    $(contFirma).append(firma);

    $(titulo).addClass('titulo');
    $(titulo).text(title);

    // myBotonMas = document.createElement('div');
    // myBotonMas.setAttribute('id','botonMas');

    $(contTitulo).addClass('contTitulo');
    // contTitulo.appendChild(this.myBotonMas);
    $(contTitulo).append(titulo);

    $(resumen).addClass('resumen');
    $(resumen).text(intro);

    $(footer).addClass('footer');

    $(imagen).addClass('imagen');
    imagen.src = urlImage;

    $(noticia).addClass('noticia');
    $(noticia).append(contTitulo);
    $(noticia).append(resumen);
    $(noticia).append(footer);

    this.mainContainer = document.createElement('div');
    $(this.mainContainer).addClass('square');
    $(this.mainContainer).append(noticia);
    $(this.mainContainer).append(contFirma);
    $(this.mainContainer).append(imagen);

    this.show = function (show, complete) {
        if (show) {
            $(noticia).animate({
                'left': '15%'
            }, 900, 'swing', function () {
                $(resumen).animate({
                    'font-size': '3.2vh'
                }, 100, 'swing', function () {
                    $(resumen).animate({
                        'color': '9,45,61,1'
                    }, 300, 'swing', function () {
                        $(contFirma).position({
                            my: 'right+10 top+10',
                            at: 'right bottom',
                            of: noticia,
                            collision: 'none'
                        });
                        $(contFirma).animate({
                            'padding': '12px',
                            'border-width': '3px',
                            'border-top-right-radius': '30px',
                            'border-bottom-left-radius': '30px'
                        }, 300, 'swing', function () {
                            $(firma).animate({
                                'font-size': '1.8vh'
                            }, 100, 'swing', function () {
                                $(firma).animate({
                                    'color': '9,45,61,1'
                                }, 100, 'swing', function () {
                                    $(imagen).position({
                                        my: 'left+5% bottom',
                                        at: 'right bottom',
                                        of: noticia,
                                        collision: 'none'
                                    });
                                    $(imagen).toggle('fold', function () {
                                        if (typeof complete == 'function') {
                                            complete();
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        } else {
            $(imagen).toggle('puff', function () {
                $(contFirma).toggle('puff', function () {
                    $(noticia).animate({
                        'left': '-60%'
                    }, 500, function () {
                        if (typeof complete == 'function') {
                            complete();
                        }
                    });
                });
            });
        }
    };
}

function PathLine(stroke, strokeWidth, dpath) {
    'use strict';
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    $(path).attr('class', 'pathLine');
    $(path).attr('fill', 'none');
    $(path).attr('stroke', stroke);
    $(path).attr('stroke-width', strokeWidth);
    $(path).attr('d', dpath);
    $(path).css('stroke-dasharray', '0 ' + $(path)[0].getTotalLength());

    return path;
}

function pathBackground() {
    'use strict';
    var path1, path2, path3, svgLines;
    svgLines = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgLines.setAttribute('class', 'svgLines');
    svgLines.setAttribute('viewBox', '0 0 3200 1800');
    svgLines.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    path1 = new PathLine('#ffffff', 1, 'M3180.418,-3.944 2285.355,891.119 2618.388,1224.152 1998.701,1843.84 710.348,555.486 996.523,269.311 660.214,-66.998 0.05,593.166');
    path2 = new PathLine('#ffffff', 1, 'M195.119,0 671.695,476.576 999.2,149.072 1328.325,478.197 1824.875,-18.353');
    path3 = new PathLine('#ffffff', 1, 'M1506.25,-3.944 1989.7,479.506 2337.735,131.471 3206.711,1000.447');

    svgLines.appendChild(path1);
    svgLines.appendChild(path2);
    svgLines.appendChild(path3);
    document.body.appendChild(svgLines);
}

function RhombusContainer(textTitle, textIntro, textAuthor, urlImage, textDetail, textDays, textPercentage, category) {
    'use strict';
    var frameNews, contentNews, tableNews, cellNews, title, abstract, frameImage, contentImage, frameAuthor, contentAuthor, tableAuthor, author,
        frameIndicator, contentIndicator, tableIndicator, rowIndicator1, rowIndicator2, days, percentage, frameDetail, contentDetail,
        colorTheme = [];

    colorTheme[6] = [["rgba(97,59,143,0.8)", "rgba(105,143,59,0.7)", "rgba(0,0,0,0.7)"], ["rgba(43,63,83,0.8)", "rgba(130,190,20,0.7)", "rgba(0,0,0,0.7)"]]; //Mesa de trabajo
    colorTheme[0] = [["rgba(184,43,43,0.8)", "rgba(43,183,184,0.7)", "rgba(0,0,0,0.7)"], ["rgba(212,103,15,0.8)", "rgba(15,124,212,0.7)", "rgba(0,0,0,0.7)"]]; //Sociales
    colorTheme[9] = [["rgba(184,43,43,0.8)", "rgba(43,183,184,0.7)", "rgba(0,0,0,0.7)"], ["rgba(212,103,15,0.8)", "rgba(15,124,212,0.7)", "rgba(0,0,0,0.7)"]]; //Sociales

    pathBackground();
    this.mainContainer = document.createElement('div');
    $(this.mainContainer).addClass('rhombus');

    frameNews = document.createElement('div');
    $(frameNews).addClass('frameNews frameRhombus');
    $(frameNews).css('background-color', colorTheme[category][Math.floor(Math.random()*2)][0]);

    contentNews = document.createElement('div');
    $(contentNews).addClass('contentFrame');

    tableNews = document.createElement('div');
    $(tableNews).addClass('table');
    
    cellNews = document.createElement('div');
    $(cellNews).addClass('cell');

    title = document.createElement('p');
    $(title).addClass('title');
    $(title).text(textTitle);

    abstract = document.createElement('p');
    $(abstract).addClass('abstract');
    $(abstract).text(textIntro);

    frameImage = document.createElement('div');
    $(frameImage).addClass('frameImage frameRhombus');

    contentImage = document.createElement('div');
    $(contentImage).addClass('contentImage');
    $(contentImage).css('background-image', 'url("' + urlImage + '")');

    frameImage.appendChild(contentImage);

    frameAuthor = document.createElement('div');
    $(frameAuthor).addClass('frameAuthor frameRhombus');
    $(frameAuthor).css('background-color', colorTheme[category][Math.floor(Math.random()*2)][1]);

    contentAuthor = document.createElement('div');
    $(contentAuthor).addClass('contentFrame');

    tableAuthor = document.createElement('div');
    $(tableAuthor).addClass('table');

    author = document.createElement('div');
    $(author).addClass('author cell');
    $(author).text(textAuthor);

    frameIndicator = document.createElement('div');
    $(frameIndicator).addClass('frameIndicator frameRhombus');
    $(frameIndicator).css('background-color', colorTheme[category][Math.floor(Math.random()*2)][2]);

    contentIndicator = document.createElement('div');
    $(contentIndicator).addClass('contentFrame');

    tableIndicator = document.createElement('div');
    $(tableIndicator).addClass('table');

    rowIndicator1 = document.createElement('div');
    $(rowIndicator1).addClass('row');

    rowIndicator2 = document.createElement('div');
    $(rowIndicator2).addClass('row');

    days = document.createElement('div');
    $(days).addClass('days cell');
    $(days).text(textDays);

    percentage = document.createElement('div');
    $(percentage).addClass('percentage cell');
    $(percentage).text(textPercentage);

    frameDetail = document.createElement('div');
    $(frameDetail).addClass('frameDetail');

    contentDetail = document.createElement('div');
    $(contentDetail).addClass('contentDetail');
    $(contentDetail).text(textDetail);

    cellNews.appendChild(title);
    cellNews.appendChild(abstract);
    tableNews.appendChild(cellNews);
    contentNews.appendChild(tableNews);
    frameNews.appendChild(contentNews);

    tableAuthor.appendChild(author);
    contentAuthor.appendChild(tableAuthor);
    frameAuthor.appendChild(contentAuthor);

    rowIndicator1.appendChild(days);
    rowIndicator2.appendChild(percentage);
    tableIndicator.appendChild(rowIndicator1);
    tableIndicator.appendChild(rowIndicator2);
    contentIndicator.appendChild(tableIndicator);
    frameIndicator.appendChild(contentIndicator);

    this.mainContainer.appendChild(frameNews);
    this.mainContainer.appendChild(frameImage);
    this.mainContainer.appendChild(frameAuthor);
    this.mainContainer.appendChild(frameIndicator);

    this.show = function (show, complete) {
        if (show) {
            $(this.mainContainer).position({
                my: 'center',
                at: 'center',
                of: 'body',
                collision: 'none'
            });

            $(frameNews).position({
                my: 'left-25% top-35%',
                at: 'center',
                of: '.rhombus',
                collision: 'none'
            });

            $(frameImage).position({
                my: 'left bottom',
                at: 'left top',
                of: '.frameNews',
                collision: 'none'
            });

            $(frameAuthor).position({
                my: 'right top',
                at: 'left top',
                of: '.frameNews',
                collision: 'none'
            });

            $(frameIndicator).position({
                my: 'left bottom',
                at: 'right bottom',
                of: '.frameNews',
                collision: 'none'
            });

            $(this.mainContainer).css({
                'transform': 'rotate(-45deg)',
                'opacity': 0
            });

            $('.frameIndicator').toggle();
            $('.frameAuthor').toggle();
            $('.frameImage').toggle();
            $('.frameNews').toggle();

            $('.pathLine').animate({
                TotalLength: 100
            }, {
                step: function (now, fx) {
                    $(this).css('stroke-dasharray', (now * $(this)[0].getTotalLength() / 100) + ' ' + $(this)[0].getTotalLength());
                },
                duration: 1000
            });

            setTimeout(function () {
                $('.rhombus').fadeTo(0, 1);
                $('.frameNews').toggle('none', function () {
                    $('.frameImage').toggle('slide', function () {
                        $('.frameAuthor').toggle('blind', function () {
                            if (textDays != '0' || textPercentage != '0') {
                                $('.frameIndicator').toggle('blind', complete);
                            } else {
                                if (typeof complete == 'function') {
                                    complete();
                                }
                            }
                        });
                    });
                });
            }, 1000);
        } else {
            if (textDays != '0' || textPercentage != '0') {
                $('.frameIndicator').toggle('blind');
            }

            $('.frameImage').toggle('slide', function () {
                $('.frameAuthor').toggle('blind', function () {
                    $('.frameNews').toggle('none', function () {
                        $('.pathLine').animate({
                            TotalLength: 0
                        }, {
                            step: function (now, fx) {
                                $(this).css('stroke-dasharray', (now * $(this)[0].getTotalLength() / 100) + ' ' + $(this)[0].getTotalLength());
                            },
                            duration: 1000
                        });

                        setTimeout(complete, 1000);
                    });
                });
            });
        }
    };
}

function Container(type, title, intro, author, urlImage, detail, textDays, textPercentage, category) {
    'use strict';
    var container;
    switch (type) {
    case 'square':
        container = new SquareContainer(title, intro, author, urlImage, detail, textDays, textPercentage, category);
        break;
    case 'rhombus':
        container = new RhombusContainer(title, intro, author, urlImage, detail, textDays, textPercentage, category);
        break;
    }

    return container;
}