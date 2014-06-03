/*jslint browser: true, eqeq: true */
/*global $, jQuery, Snap, getImages */

function BgVideo() {
    'use strict';
    var logo = document.createElement('div'),
        player = document.createElement('div'),
        videoBg = document.createElement('video'),
        videoSrc = document.createElement('source'),
        audioBg = document.createElement('audio');

    $(logo).addClass('logo');
    $(player).addClass('player');
    $(videoBg).addClass('videobg');

    videoSrc.setAttribute('src', 'video/' + Math.floor((Math.random() * 12) + 1) + '.mp4');
    videoSrc.setAttribute('type', 'video/mp4');

    //videoBg.appendChild(videoSrc);
    videoBg.src = './video/' + Math.floor((Math.random() * 12) + 1) + '.mp4';
    videoBg.style.position = 'absolute';
    videoBg.style.height = '100%';
    videoBg.autoplay = true;
    videoBg.addEventListener('ended', function () {
        videoBg.src = './video/' + Math.floor((Math.random() * 12) + 1) + '.mp4';
    }, false);

    this.mainContainer = document.createElement('div');
    $(this.mainContainer).addClass('player');
    this.mainContainer.appendChild(logo);
    this.mainContainer.appendChild(videoBg);
}

function Picture(listImgs) {
    'use strict';
    var myparent = this;
    this.divImage = document.createElement('div');
    $(this.divImage).addClass('bgpicture');

    this.show = function (obj) {
        var newLeft = -Math.floor(Math.random() * 3) * 15,
            newTop = -Math.floor(Math.random() * 3) * 15;

        $(this.divImage).css({
            'background-image': 'url("' + listImgs[Math.floor(Math.random() * listImgs.length)] + '")',
            'z-index': '1',
            'opacity': '1',
            'width': '100%',
            'height': '100%',
            'left': '0%',
            'top': '0%'
        });

        if ($(this.divImage).css('background-image') == $(obj.divImage).css('background-image')) {
            $(this.divImage).css('background-image', 'url("' + listImgs[Math.floor(Math.random() * listImgs.length)] + '")');
        }

        $(this.divImage).animate({
            'width': '130%',
            'height': '130%',
            'left': newLeft + '%',
            'top': newTop + '%'
        }, 15000, 'linear', function () {
            $(this).css('z-index', '2');
            obj.show(myparent);
            $(this).fadeTo(2000, 0, function () {
                $(this.divImage).css('z-index', '0');
            });
        });
    };
}

function resolveURL(data) {
    'use strict';
//    return function (data) {
        var mydiv = document.createElement('div');
        data = data.replace('/testLtotal', 'http://www.ellibrototal.com/testLtotal');
        mydiv.innerHTML = data.trim();
        return $('img', $(mydiv)).attr('src');
//    };    
}

function Picture2(listImgs) {
    'use strict';
    var myparent = this;
    this.divImage = document.createElement('div');
    $(this.divImage).addClass('bgpicture');

    this.show = function (obj) {
        var newLeft = -Math.floor(Math.random() * 3) * 15,
            newTop = -Math.floor(Math.random() * 3) * 15,
            urlImgs = 'http://www.ellibrototal.com/ltotal/inicio/load_image.jsp?caso=2&w=500&h=500&idIlust=' + listImgs[Math.floor(Math.random() * listImgs.length)];
        
        $.get(urlImgs).done(function (data) {
            var urlImg = resolveURL(data);
            console.log(this.divImage);
            
            $(myparent.divImage).css({
                'background-image': 'url("' + urlImg + '")',
                'z-index': '1',
                'opacity': '1',
                'width': '100%',
                'height': '100%',
                'left': '0%',
                'top': '0%'
            });
            
//            if ($(this.divImage).css('background-image') == $(obj.divImage).css('background-image')) {
//                $(this.divImage).css('background-image', 'url("' + listImgs[Math.floor(Math.random() * listImgs.length)] + '")');
//            }

            $(myparent.divImage).animate({
                'width': '130%',
                'height': '130%',
                'left': newLeft + '%',
                'top': newTop + '%'
            }, 15000, 'linear', function () {
                $(this).css('z-index', '2');
                obj.show(myparent);
                $(this).fadeTo(2000, 0, function () {
                    $(this.divImage).css('z-index', '0');
                });
            });
        });
    };
}

function bgPicture() {
    'use strict';
    var mypic1, mypic2;
    
    getIdImages(9307).done(function (data) {
        var idList = data.trim().split(':')[0].split(',');
        
        mypic1 = new Picture2(idList);
        mypic2 = new Picture2(idList);
  
        document.body.appendChild(mypic1.divImage);
        document.body.appendChild(mypic2.divImage);

        mypic1.show(mypic2);
    })
    
//    getImages(9307).done(function (list) {
//        mypic1 = new Picture(list);
//        mypic2 = new Picture(list);
//  
//        document.body.appendChild(mypic1.divImage);
//        document.body.appendChild(mypic2.divImage);
//
//        mypic1.show(mypic2);
//    });
}

function Ball(rootX, rootY, snap) {
    'use strict';
    var posX = rootX,
        posY = rootY,
        f = 0.4 + Math.random() * 0.6,
        w = 30 + Math.random() * 30,
        parent = this;

    this.speedX = 0.05 + Math.random() * 0.1;
    this.speedY = 0.05 + Math.random() * 0.1;
    this.ball = snap.circle(rootX, rootY, 4).attr({
        fill: 'rgba(137,219,229,0.6)'
    });

    this.move = function () {
        posX += this.speedX / f;
        posY += this.speedY / f;
        if (posX > rootX + w / 2 || posX < rootX - w / 2) {
            this.speedX *= -1;
            f = 0.4 + Math.random() * 0.6;
        }
        if (posY > rootY + w / 2 || posY < rootY - w / 2) {
            this.speedY *= -1;
            f = 0.4 + Math.random() * 0.6;
        }
        if (posX > rootX + w / 2) {
            posX = rootX + w / 2;
        }
        if (posX < rootX - w / 2) {
            posX = rootX - w / 2;
        }
        if (posY > rootY + w / 2) {
            posY = rootY + w / 2;
        }
        if (posY < rootY - w / 2) {
            posY = rootY - w / 2;
        }
        this.ball.attr({
            cx: posX,
            cy: posY
        });
        setTimeout(function () {
            parent.move();
        }, 20);
    };
    this.getX = function () {
        return Math.round(posX);
    };
    this.getY = function () {
        return Math.round(posY);
    };
    this.setF = function (v) {
        f = v;
    };
    this.setSpeedX = function (v) {
        this.speedX = v;
    };
    this.setSpeedY = function (v) {
        this.speedY = v;
    };
    this.move();
}

function Line(ball1, ball2, snap) {
    'use strict';
    var parent = this;

    this.line = snap.line(ball1.getX(), ball1.getY(), ball2.getX(), ball2.getY()).attr({
        stroke: '#1f8693'
    });

    this.move = function () {
        this.line.attr({
            x1: ball1.getX(),
            y1: ball1.getY(),
            x2: ball2.getX(),
            y2: ball2.getY()
        });
        setTimeout(function () {
            parent.move();
        }, 20);
    };
    this.move();
}

function Triangle(ball1, ball2, ball3, snap) {
    'use strict';
    var step = 0.03,
        op = 0,
        delay = 20000,
        maxOp,
        parent = this;

    this.poly = snap.polyline([ball1.getX(), ball1.getY(), ball2.getX(), ball2.getY(), ball3.getX(), ball3.getY()]).attr({
        fill: 'rgba(137,219,229,0.1)',
        fillOpacity: op
    });

    this.move = function () {
        this.poly.attr({
            points: String(ball1.getX() + ',' + ball1.getY() + ',' + ball2.getX() + ',' + ball2.getY() + ',' + ball3.getX() + ',' + ball3.getY())
        });
        if (op != 0) {
            this.poly.attr({
                fillOpacity: op
            });
            op += step;
            if (op > maxOp) {
                step *= -1;
            }
            if (op < 0.1) {
                op = 0;
                step *= -1;
            }
        }
        setTimeout(function () {
            if (typeof parent.move == 'function') {
                parent.move();
            }
        }, 50);
    };

    this.startShine = function () {
        op = 0.1;
        maxOp = 1.5 + Math.random() * 2.8;
        setTimeout(parent.startShine, 10000 + Math.random() * delay);
    };

    setTimeout(this.startShine, 2000 + Math.random() * delay);
    this.move();
}
    
function bgGrid() {
    'use strict';
    var rgbList, cR, cB, cG, i, sq, svgElem, snap, temp, divContainer, bVec, lVec, tVec;
    
    divContainer = document.createElement('div');
    $(divContainer).addClass('bgtriangle');

    svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElem.setAttribute('id', 'mysvgtemp');
    svgElem.setAttribute('width', '100%');
    svgElem.setAttribute('height', '100%');
    svgElem.style.position = 'absolute';
    svgElem.setAttribute('viewBox', '0 0 3200 1800');
    svgElem.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    divContainer.appendChild(svgElem);
    snap = new Snap(svgElem);
    
    document.body.appendChild(divContainer);

    bVec = [];
    bVec.push(new Ball(49, 96, snap));
    bVec.push(new Ball(547, 4, snap));
    bVec.push(new Ball(1204, 96, snap));
    bVec.push(new Ball(1702, 4, snap));
    bVec.push(new Ball(2359, 96, snap));
    bVec.push(new Ball(2857, 4, snap));
    bVec.push(new Ball(415, 300, snap));
    bVec.push(new Ball(668, 252, snap));
    bVec.push(new Ball(1570, 300, snap));
    bVec.push(new Ball(1823, 252, snap));
    bVec.push(new Ball(2725, 300, snap));
    bVec.push(new Ball(2978, 252, snap));
    bVec.push(new Ball(-577, 454, snap));
    bVec.push(new Ball(964, 454, snap));
    bVec.push(new Ball(2119, 454, snap));
    bVec.push(new Ball(3274, 454, snap));
    bVec.push(new Ball(208, 498, snap));
    bVec.push(new Ball(777, 554, snap));
    bVec.push(new Ball(1363, 498, snap));
    bVec.push(new Ball(1933, 554, snap));
    bVec.push(new Ball(2518, 498, snap));
    bVec.push(new Ball(3088, 554, snap));
    bVec.push(new Ball(497, 632, snap));
    bVec.push(new Ball(1652, 632, snap));
    bVec.push(new Ball(2807, 632, snap));
    bVec.push(new Ball(-203, 717, snap));
    bVec.push(new Ball(952, 717, snap));
    bVec.push(new Ball(2107, 717, snap));
    bVec.push(new Ball(3212, 717, snap));
    bVec.push(new Ball(237, 824, snap));
    bVec.push(new Ball(477, 950, snap));
    bVec.push(new Ball(778, 887, snap));
    bVec.push(new Ball(1392, 824, snap));
    bVec.push(new Ball(1632, 950, snap));
    bVec.push(new Ball(1932, 887, snap));
    bVec.push(new Ball(2547, 824, snap));
    bVec.push(new Ball(2787, 950, snap));
    bVec.push(new Ball(3087, 887, snap));
    bVec.push(new Ball(-678, 974, snap));
    bVec.push(new Ball(1121, 974, snap));
    bVec.push(new Ball(2276, 974, snap));
    bVec.push(new Ball(3431, 974, snap));
    bVec.push(new Ball(447, 1138, snap));
    bVec.push(new Ball(798, 1188, snap));
    bVec.push(new Ball(1602, 1138, snap));
    bVec.push(new Ball(1953, 1188, snap));
    bVec.push(new Ball(2757, 1138, snap));
    bVec.push(new Ball(3108, 1188, snap));
    bVec.push(new Ball(1061, 1383, snap));
    bVec.push(new Ball(2216, 1383, snap));
    bVec.push(new Ball(-586, 1510, snap));
    bVec.push(new Ball(558, 1521, snap));
    bVec.push(new Ball(862, 1470, snap));
    bVec.push(new Ball(1144, 1510, snap));
    bVec.push(new Ball(1713, 1521, snap));
    bVec.push(new Ball(2017, 1470, snap));
    bVec.push(new Ball(2299, 1510, snap));
    bVec.push(new Ball(2868, 1521, snap));
    bVec.push(new Ball(3172, 1510, snap));
    bVec.push(new Ball(189, 1699, snap));
    bVec.push(new Ball(1171, 1799, snap));
    bVec.push(new Ball(1344, 1699, snap));
    bVec.push(new Ball(2326, 1799, snap));
    bVec.push(new Ball(2499, 1699, snap));

    lVec = [];
    lVec.push(new Line(bVec[0], bVec[1], snap));
    lVec.push(new Line(bVec[0], bVec[6], snap));
    lVec.push(new Line(bVec[0], bVec[12], snap));
    lVec.push(new Line(bVec[1], bVec[2], snap));
    lVec.push(new Line(bVec[1], bVec[6], snap));
    lVec.push(new Line(bVec[1], bVec[7], snap));
    lVec.push(new Line(bVec[2], bVec[3], snap));
    lVec.push(new Line(bVec[2], bVec[7], snap));
    lVec.push(new Line(bVec[2], bVec[8], snap));
    lVec.push(new Line(bVec[2], bVec[13], snap));
    lVec.push(new Line(bVec[3], bVec[4], snap));
    lVec.push(new Line(bVec[3], bVec[8], snap));
    lVec.push(new Line(bVec[3], bVec[9], snap));
    lVec.push(new Line(bVec[4], bVec[5], snap));
    lVec.push(new Line(bVec[4], bVec[9], snap));
    lVec.push(new Line(bVec[4], bVec[10], snap));
    lVec.push(new Line(bVec[4], bVec[14], snap));
    lVec.push(new Line(bVec[5], bVec[10], snap));
    lVec.push(new Line(bVec[5], bVec[11], snap));
    lVec.push(new Line(bVec[6], bVec[7], snap));
    lVec.push(new Line(bVec[6], bVec[12], snap));
    lVec.push(new Line(bVec[6], bVec[16], snap));
    lVec.push(new Line(bVec[6], bVec[17], snap));
    lVec.push(new Line(bVec[6], bVec[22], snap));
    lVec.push(new Line(bVec[7], bVec[13], snap));
    lVec.push(new Line(bVec[7], bVec[17], snap));
    lVec.push(new Line(bVec[8], bVec[9], snap));
    lVec.push(new Line(bVec[8], bVec[13], snap));
    lVec.push(new Line(bVec[8], bVec[18], snap));
    lVec.push(new Line(bVec[8], bVec[19], snap));
    lVec.push(new Line(bVec[8], bVec[23], snap));
    lVec.push(new Line(bVec[9], bVec[14], snap));
    lVec.push(new Line(bVec[9], bVec[19], snap));
    lVec.push(new Line(bVec[10], bVec[11], snap));
    lVec.push(new Line(bVec[10], bVec[14], snap));
    lVec.push(new Line(bVec[10], bVec[20], snap));
    lVec.push(new Line(bVec[10], bVec[21], snap));
    lVec.push(new Line(bVec[10], bVec[24], snap));
    lVec.push(new Line(bVec[11], bVec[15], snap));
    lVec.push(new Line(bVec[11], bVec[21], snap));
    lVec.push(new Line(bVec[12], bVec[16], snap));
    lVec.push(new Line(bVec[12], bVec[25], snap));
    lVec.push(new Line(bVec[13], bVec[17], snap));
    lVec.push(new Line(bVec[13], bVec[18], snap));
    lVec.push(new Line(bVec[13], bVec[26], snap));
    lVec.push(new Line(bVec[13], bVec[31], snap));
    lVec.push(new Line(bVec[14], bVec[19], snap));
    lVec.push(new Line(bVec[14], bVec[20], snap));
    lVec.push(new Line(bVec[14], bVec[27], snap));
    lVec.push(new Line(bVec[14], bVec[34], snap));
    lVec.push(new Line(bVec[15], bVec[21], snap));
    lVec.push(new Line(bVec[15], bVec[28], snap));
    lVec.push(new Line(bVec[16], bVec[22], snap));
    lVec.push(new Line(bVec[16], bVec[25], snap));
    lVec.push(new Line(bVec[16], bVec[29], snap));
    lVec.push(new Line(bVec[17], bVec[22], snap));
    lVec.push(new Line(bVec[17], bVec[31], snap));
    lVec.push(new Line(bVec[18], bVec[23], snap));
    lVec.push(new Line(bVec[18], bVec[26], snap));
    lVec.push(new Line(bVec[18], bVec[32], snap));
    lVec.push(new Line(bVec[19], bVec[23], snap));
    lVec.push(new Line(bVec[19], bVec[34], snap));
    lVec.push(new Line(bVec[20], bVec[24], snap));
    lVec.push(new Line(bVec[20], bVec[27], snap));
    lVec.push(new Line(bVec[20], bVec[35], snap));
    lVec.push(new Line(bVec[21], bVec[24], snap));
    lVec.push(new Line(bVec[21], bVec[28], snap));
    lVec.push(new Line(bVec[21], bVec[37], snap));
    lVec.push(new Line(bVec[22], bVec[29], snap));
    lVec.push(new Line(bVec[22], bVec[30], snap));
    lVec.push(new Line(bVec[22], bVec[31], snap));
    lVec.push(new Line(bVec[23], bVec[32], snap));
    lVec.push(new Line(bVec[23], bVec[33], snap));
    lVec.push(new Line(bVec[23], bVec[34], snap));
    lVec.push(new Line(bVec[24], bVec[35], snap));
    lVec.push(new Line(bVec[24], bVec[36], snap));
    lVec.push(new Line(bVec[24], bVec[37], snap));
    lVec.push(new Line(bVec[25], bVec[29], snap));
    lVec.push(new Line(bVec[25], bVec[38], snap));
    lVec.push(new Line(bVec[26], bVec[31], snap));
    lVec.push(new Line(bVec[26], bVec[32], snap));
    lVec.push(new Line(bVec[26], bVec[39], snap));
    lVec.push(new Line(bVec[27], bVec[34], snap));
    lVec.push(new Line(bVec[27], bVec[35], snap));
    lVec.push(new Line(bVec[27], bVec[40], snap));
    lVec.push(new Line(bVec[28], bVec[37], snap));
    lVec.push(new Line(bVec[28], bVec[41], snap));
    lVec.push(new Line(bVec[29], bVec[30], snap));
    lVec.push(new Line(bVec[29], bVec[38], snap));
    lVec.push(new Line(bVec[29], bVec[42], snap));
    lVec.push(new Line(bVec[30], bVec[31], snap));
    lVec.push(new Line(bVec[30], bVec[42], snap));
    lVec.push(new Line(bVec[30], bVec[43], snap));
    lVec.push(new Line(bVec[31], bVec[39], snap));
    lVec.push(new Line(bVec[31], bVec[43], snap));
    lVec.push(new Line(bVec[32], bVec[33], snap));
    lVec.push(new Line(bVec[32], bVec[39], snap));
    lVec.push(new Line(bVec[32], bVec[44], snap));
    lVec.push(new Line(bVec[33], bVec[34], snap));
    lVec.push(new Line(bVec[33], bVec[44], snap));
    lVec.push(new Line(bVec[33], bVec[45], snap));
    lVec.push(new Line(bVec[34], bVec[40], snap));
    lVec.push(new Line(bVec[34], bVec[45], snap));
    lVec.push(new Line(bVec[35], bVec[36], snap));
    lVec.push(new Line(bVec[35], bVec[40], snap));
    lVec.push(new Line(bVec[35], bVec[46], snap));
    lVec.push(new Line(bVec[36], bVec[37], snap));
    lVec.push(new Line(bVec[36], bVec[46], snap));
    lVec.push(new Line(bVec[36], bVec[47], snap));
    lVec.push(new Line(bVec[37], bVec[41], snap));
    lVec.push(new Line(bVec[37], bVec[47], snap));
    lVec.push(new Line(bVec[38], bVec[42], snap));
    lVec.push(new Line(bVec[38], bVec[50], snap));
    lVec.push(new Line(bVec[39], bVec[43], snap));
    lVec.push(new Line(bVec[39], bVec[44], snap));
    lVec.push(new Line(bVec[39], bVec[48], snap));
    lVec.push(new Line(bVec[39], bVec[53], snap));
    lVec.push(new Line(bVec[40], bVec[45], snap));
    lVec.push(new Line(bVec[40], bVec[46], snap));
    lVec.push(new Line(bVec[40], bVec[49], snap));
    lVec.push(new Line(bVec[40], bVec[56], snap));
    lVec.push(new Line(bVec[41], bVec[47], snap));
    lVec.push(new Line(bVec[42], bVec[43], snap));
    lVec.push(new Line(bVec[42], bVec[48], snap));
    lVec.push(new Line(bVec[42], bVec[50], snap));
    lVec.push(new Line(bVec[42], bVec[51], snap));
    lVec.push(new Line(bVec[42], bVec[52], snap));
    lVec.push(new Line(bVec[43], bVec[48], snap));
    lVec.push(new Line(bVec[44], bVec[45], snap));
    lVec.push(new Line(bVec[44], bVec[49], snap));
    lVec.push(new Line(bVec[44], bVec[53], snap));
    lVec.push(new Line(bVec[44], bVec[54], snap));
    lVec.push(new Line(bVec[44], bVec[55], snap));
    lVec.push(new Line(bVec[45], bVec[49], snap));
    lVec.push(new Line(bVec[46], bVec[47], snap));
    lVec.push(new Line(bVec[46], bVec[56], snap));
    lVec.push(new Line(bVec[46], bVec[57], snap));
    lVec.push(new Line(bVec[46], bVec[58], snap));
    lVec.push(new Line(bVec[47], bVec[58], snap));
    lVec.push(new Line(bVec[48], bVec[52], snap));
    lVec.push(new Line(bVec[48], bVec[53], snap));
    lVec.push(new Line(bVec[48], bVec[60], snap));
    lVec.push(new Line(bVec[49], bVec[55], snap));
    lVec.push(new Line(bVec[49], bVec[56], snap));
    lVec.push(new Line(bVec[49], bVec[62], snap));
    lVec.push(new Line(bVec[50], bVec[51], snap));
    lVec.push(new Line(bVec[50], bVec[59], snap));
    lVec.push(new Line(bVec[51], bVec[52], snap));
    lVec.push(new Line(bVec[51], bVec[59], snap));
    lVec.push(new Line(bVec[51], bVec[60], snap));
    lVec.push(new Line(bVec[52], bVec[60], snap));
    lVec.push(new Line(bVec[53], bVec[54], snap));
    lVec.push(new Line(bVec[53], bVec[60], snap));
    lVec.push(new Line(bVec[53], bVec[61], snap));
    lVec.push(new Line(bVec[54], bVec[55], snap));
    lVec.push(new Line(bVec[54], bVec[61], snap));
    lVec.push(new Line(bVec[54], bVec[62], snap));
    lVec.push(new Line(bVec[55], bVec[62], snap));
    lVec.push(new Line(bVec[56], bVec[57], snap));
    lVec.push(new Line(bVec[56], bVec[62], snap));
    lVec.push(new Line(bVec[56], bVec[63], snap));
    lVec.push(new Line(bVec[57], bVec[58], snap));
    lVec.push(new Line(bVec[57], bVec[63], snap));
    lVec.push(new Line(bVec[58], bVec[63], snap));
    lVec.push(new Line(bVec[59], bVec[60], snap));
    lVec.push(new Line(bVec[60], bVec[61], snap));
    lVec.push(new Line(bVec[61], bVec[62], snap));
    lVec.push(new Line(bVec[62], bVec[63], snap));

    tVec = [];
    tVec.push(new Triangle(bVec[0], bVec[6], bVec[12], snap));
    tVec.push(new Triangle(bVec[1], bVec[6], bVec[7], snap));
    tVec.push(new Triangle(bVec[2], bVec[8], bVec[13], snap));
    tVec.push(new Triangle(bVec[4], bVec[5], bVec[10], snap));
    tVec.push(new Triangle(bVec[6], bVec[16], bVec[22], snap));
    tVec.push(new Triangle(bVec[7], bVec[13], bVec[17], snap));
    tVec.push(new Triangle(bVec[8], bVec[18], bVec[23], snap));
    tVec.push(new Triangle(bVec[8], bVec[9], bVec[19], snap));
    tVec.push(new Triangle(bVec[10], bVec[14], bVec[20], snap));
    tVec.push(new Triangle(bVec[10], bVec[21], bVec[24], snap));
    tVec.push(new Triangle(bVec[11], bVec[15], bVec[21], snap));
    tVec.push(new Triangle(bVec[13], bVec[26], bVec[31], snap));
    tVec.push(new Triangle(bVec[14], bVec[19], bVec[34], snap));
    tVec.push(new Triangle(bVec[14], bVec[27], bVec[34], snap));
    tVec.push(new Triangle(bVec[16], bVec[25], bVec[29], snap));
    tVec.push(new Triangle(bVec[17], bVec[22], bVec[31], snap));
    tVec.push(new Triangle(bVec[18], bVec[26], bVec[32], snap));
    tVec.push(new Triangle(bVec[20], bVec[27], bVec[35], snap));
    tVec.push(new Triangle(bVec[21], bVec[24], bVec[37], snap));
    tVec.push(new Triangle(bVec[22], bVec[29], bVec[30], snap));
    tVec.push(new Triangle(bVec[23], bVec[32], bVec[33], snap));
    tVec.push(new Triangle(bVec[24], bVec[35], bVec[36], snap));
    tVec.push(new Triangle(bVec[26], bVec[31], bVec[39], snap));
    tVec.push(new Triangle(bVec[16], bVec[25], bVec[29], snap));
    tVec.push(new Triangle(bVec[17], bVec[22], bVec[31], snap));
    tVec.push(new Triangle(bVec[18], bVec[26], bVec[32], snap));
    tVec.push(new Triangle(bVec[19], bVec[23], bVec[34], snap));
    tVec.push(new Triangle(bVec[20], bVec[27], bVec[35], snap));
    tVec.push(new Triangle(bVec[21], bVec[24], bVec[37], snap));
    tVec.push(new Triangle(bVec[22], bVec[29], bVec[30], snap));
    tVec.push(new Triangle(bVec[23], bVec[32], bVec[33], snap));
    tVec.push(new Triangle(bVec[23], bVec[33], bVec[34], snap));
    tVec.push(new Triangle(bVec[24], bVec[35], bVec[36], snap));
    tVec.push(new Triangle(bVec[26], bVec[32], bVec[39], snap));
    tVec.push(new Triangle(bVec[27], bVec[34], bVec[40], snap));
    tVec.push(new Triangle(bVec[30], bVec[31], bVec[43], snap));
    tVec.push(new Triangle(bVec[31], bVec[39], bVec[43], snap));
    tVec.push(new Triangle(bVec[32], bVec[39], bVec[44], snap));
    tVec.push(new Triangle(bVec[33], bVec[44], bVec[45], snap));
    tVec.push(new Triangle(bVec[34], bVec[40], bVec[45], snap));
    tVec.push(new Triangle(bVec[35], bVec[40], bVec[46], snap));
    tVec.push(new Triangle(bVec[35], bVec[36], bVec[46], snap));
    tVec.push(new Triangle(bVec[36], bVec[37], bVec[47], snap));
    tVec.push(new Triangle(bVec[39], bVec[48], bVec[53], snap));
    tVec.push(new Triangle(bVec[39], bVec[44], bVec[53], snap));
    tVec.push(new Triangle(bVec[40], bVec[45], bVec[49], snap));
    tVec.push(new Triangle(bVec[42], bVec[50], bVec[51], snap));
    tVec.push(new Triangle(bVec[42], bVec[52], bVec[48], snap));
    tVec.push(new Triangle(bVec[42], bVec[43], bVec[48], snap));
    tVec.push(new Triangle(bVec[44], bVec[53], bVec[54], snap));
    tVec.push(new Triangle(bVec[44], bVec[54], bVec[55], snap));
    tVec.push(new Triangle(bVec[44], bVec[45], bVec[49], snap));
    tVec.push(new Triangle(bVec[46], bVec[56], bVec[57], snap));
    tVec.push(new Triangle(bVec[46], bVec[47], bVec[58], snap));
    tVec.push(new Triangle(bVec[48], bVec[52], bVec[60], snap));
    tVec.push(new Triangle(bVec[51], bVec[52], bVec[60], snap));
    tVec.push(new Triangle(bVec[53], bVec[54], bVec[61], snap));
    tVec.push(new Triangle(bVec[54], bVec[55], bVec[62], snap));
    tVec.push(new Triangle(bVec[56], bVec[57], bVec[63], snap));
}

function createBackground(bgtype) {
    'use strict';
    var bg;

    switch (bgtype) {
    case 'video':
        bg = new BgVideo();
        document.body.appendChild(bg.mainContainer);
        break;
    case 'grid':
        bgGrid();
        break;
    default:
        bgPicture();
        break;
    }
}