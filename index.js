// 点击开始游戏
// 动态生成100个小格 div
// left点击小格 没有雷 1. 显示数字（周围八个小格的雷数）  2. 扩散（周围八个小格没有零）
             // 有雷 game Over
// right点击小格 1. 标记的切换  2. 标记是否正确（十个都标记成功，提示成功）
// 出现数字，无效果


// 递归



function MineSweep() {
    this.startBtn = document.getElementsByClassName("btn")[0];
    this.box = document.getElementsByClassName("box")[0];
    this.flagBox = document.getElementsByClassName("flagBox")[0];
    this.alterBox = document.getElementsByClassName("alterBox")[0];
    this.alterImg = document.getElementsByClassName("alterImg")[0];
    this.close = document.getElementsByClassName("close")[0];
    this.score = document.getElementById("score");
    this.minesNum;
    this.mineOver;
    this.minesArr = [];
    this.block;
    this.flag = true;

    this.bindEvent();
}
MineSweep.prototype.init = function () {
    this.minesNum = 10;
    this.mineOver = 10;
    this.score.innerHTML = this.mineOver;
    for(var i = 0; i < 10; i ++) {
        for(var j = 0; j < 10; j ++) {
            var con = document.createElement("div");
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            this.minesArr.push({mine: 0});
            this.box.appendChild(con);
        }
    }
    this.block = document.getElementsByClassName("block");
    while(this.minesNum) {
        var ranDom = Math.floor(Math.random() * 100);
        if( !this.minesArr[ranDom].mine ) {
            this.block[ranDom].classList.add('isLei');
            this.minesArr[ranDom].mine = 1;
            this.minesNum --;
        }
    }
};
MineSweep.prototype.bindEvent = function () {
    var _this = this;
    this.startBtn.addEventListener('click', function () {
        if( _this.flag ) {
            _this.init();
            _this.flag = false;
            _this.box.style.display = 'block';
            _this.flagBox.style.display = 'block';
        }
        console.log(_this.flag)
    }, false);
    this.box.oncontextmenu = function () {
        return false;
    }

    this.box.onmousedown = function (e) {
        var event = e.target;
        e.which === 1 && _this.leftClick(event);
        e.which === 3 && _this.rightClick(event);
    }

    this.close.onclick = function () {
        _this.flag = true;
        _this.box.innerHTML = '';
        _this.alterBox.style.display = 'none';
        _this.box.style.display = 'none';
        _this.flagBox.style.display = 'none';
    }
 
};
MineSweep.prototype.leftClick = function (dom) {
    var isLei = document.getElementsByClassName("isLei");
    var _this = this;
    if(!dom || dom.classList.contains('sign')) {
        return 
    }
    if(dom.classList.contains('isLei')) {
        for(var i = 0; i < isLei.length; i ++) {
            isLei[i].classList.add('show')
        }
        setTimeout(function () {
            _this.alterBox.style.display = 'block';
            _this.alterImg.style.backgroundImage = 'url("./images/over.jpg")';
        }, 800)
    } else {
        var n = 0;
        var posArr = dom.getAttribute('id').split('-');
        var posX = +posArr[0];
        var posY = +posArr[1];
        dom.classList.add('num');
        for(var i = posX - 1; i <= posX + 1; i ++) {
            for(var j = posY - 1; j <= posY + 1; j ++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if(aroundBox && aroundBox.classList.contains("isLei")){
                    n ++;
                }
            }
        }
        dom.innerHTML = n;
        if( n == 0) {
            for(var i = posX - 1; i <= posX + 1; i ++) {
                for(var j = posY - 1; j <= posY + 1; j ++) { 
                    var nearBox = document.getElementById(i + '-' + j);
                    if(nearBox && nearBox != 0) {
                        if(!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            this.leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }

};
MineSweep.prototype.rightClick = function (dom) {
    if(dom) {
        var _this = this;
        if(dom.classList.contains('num')) {
            return 
        }
        dom.classList.toggle('sign');
        if(dom.classList.contains('sign') && dom.classList.contains('isLei')) {
            this.mineOver --;
        }
        if(!dom.classList.contains('sign') && dom.classList.contains('isLei')) {
            this.mineOver ++;
        }
        if(this.mineOver === 0) {
            setTimeout(function () {
                _this.alterBox.style.display = 'block';
                _this.alterImg.style.backgroundImage = 'url("./images/success.png")';
            }, 800)
        }
        this.score.innerHTML = this.mineOver;
    }
}

new MineSweep();

