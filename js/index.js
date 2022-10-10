// 功能一：顶部关闭广告位
let close = document.querySelector(".class");
let jdTop = document.querySelector(".top");

close.onclick = function () {
    jdTop.style.display = "none";
};

// 功能二：定时器
let input = document.querySelector("#input");
(function () {
    let search = document.querySelector(".search");
    let searchArr = ["电脑主机", "化妆品", "家居", "空调", "服饰", "小米"];
    let i = -1;
    setInterval(() => {
        i++;
        if (i === searchArr.length) {
            i = 0;
        }
        search.placeholder = searchArr[i];
    }, 1000);
})();

// 功能三：下拉菜单模糊联想
(function () {
    let list = [
        "手机",
        "华为手机",
        "苹果手机",
        "电脑",
        "苹果电脑",
        "华为电脑",
        "台式电脑",
        "手提篮",
        "苹果汁",
    ];

    let ulList = document.querySelector(".list");
    input.onclick = function () {
        let val = input.value;

        if (val == "") {
            ulList.innerHTML = "";

            ulList.style.display = "none";
            return;
        }

        ulList.innerHTML = "";

        ulList.style.display = "block";

        for (let i = 0; i < list.length; i++) {
            if (list[i].indexOf(val) !== -1) {
                ulList.innerHTML = ulList.innerHTML + `<li>${list[i]}</li>`;
            } else {
                ulList.innerHTML = `<li>查无数据</li>`;
            }
        }
    };
    input.onblur = function () {
        ulList.style.display = "none";
    };
    input.onfocus = () => {
        if ((input.value = "")) {
            ulList.style.display = "none";
            return;
        }
        ulList.style.display = "block";
    };
})();

// 功能三：轮播图
(function () {
    let imgArr = [
        "./images/images/1.jpg",
        "./images/images/3.jpg",
        "./images/images/4.jpg",
        "./images/images/5.jpg",
        "./images/images/6.jpg",
        "./images/images/7.jpg",
    ];
    let i = 0;
    let img = document.querySelector("#img");
    let lis = document.querySelectorAll(".banner-dian> li");
    let next = document.querySelector(".next");
    let prev = document.querySelector(".prev");
    let banner = document.querySelector(".banner");

    function bannerPlay() {
        i++;
        if (i === imgArr.length) {
            i = 0;
        }

        img.src = imgArr[i];

        lis.forEach((ele) => {
            ele.className = "";
        });

        lis[i].className = "active";
    }
    let timer = setInterval(bannerPlay, 3000);

    banner.onmouseover = function () {
        clearInterval(timer);
    };
    //鼠标离开 计时器开始
    banner.onmouseout = function () {
        timer = setInterval(bannerPlay, 3000);
    };
    //下一页
    next.onclick = function () {
        bannerPlay();
    };
    //上一页
    prev.onclick = function () {
        i -= 2;
        if (i == -2) {
            i = imgArr.length - 2;
        }
        bannerPlay();
    };

    //点击轮播点---切换轮播图
    for (let j = 0; j < lis.length; j++) {
        lis[j].onclick = function () {
            console.log("------点击li----");
            //清空其他轮播点高亮
            lis.forEach((ele) => {
                ele.className = "";
            });
            //高亮
            lis[j].className = "active";
            img.src = imgArr[j];
            //存储下标j
            i = j;
        };
    }
})();

// 功能4：滚轮事件
(function () {
    //获取网页实际高度和宽度
    let winderHeight = document.body.clientHeight;
    let winderWidth = document.body.clientWidth;

    let items = document.querySelectorAll(".zhuti>.item");
    console.log(items[0].offsetTop);
    // 获取楼宇元素
    let ly = document.querySelector(".ly");
    let lyArr = document.querySelectorAll(".ly > a");

    // 封装清除高亮
    function clear() {
        lyArr.forEach((ele) => {
            ele.className = "";
        });
    }

    // 封装元素距顶部的高
    let fool = [];
    items.forEach((ele) => {
        fool.push(ele.offsetTop);
    });
    console.log(fool);
    console.log(items[2].offsetHeight);

    // 滚动事件
    window.onscroll = function () {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(top);

        if (top >= 600) {
            ly.style.top = "100px";
        } else {
            ly.style.top = "750px";
        }

        // if (top > fool[0]) {
        //     ly.style.display = "block";
        // } else {
        //     ly.style.display = "none";
        // }

        if (top < fool[0]) {
            lyArr[0].className = "";
        } else if (top >= fool[0] && top < fool[1]) {
            clear();
            lyArr[0].className = "att";
        } else if (top >= fool[1] && top < fool[2]) {
            clear();
            lyArr[1].className = "att";
        } else if (top >= fool[2] && top < fool[3]) {
            clear();
            lyArr[2].className = "att";
        } else if (top >= fool[3] && top < fool[3] + items[2].clientHeight) {
            clear();
            lyArr[3].className = "att";
        } else if (top >= fool[3] + items[2].clientHeight) {
            lyArr[3].className = "";
        }

        // 点击楼宇跳转
        for (let i = 0; i < lyArr.length; i++) {
            lyArr[i].onclick = function () {
                document.documentElement.scrollTop = fool[i];
            };
        }

        // 返回主页
        if (top > 1000) {
            lyArr[4].style.display = "block";
        } else {
            lyArr[4].style.display = "none";
        }
        lyArr[4].onclick = function () {
            document.documentElement.scrollTop = "0";
        };
    };
})();

// 功能5：秒杀倒计时

(function () {
    let h = document.querySelector(".hove");
    let m = document.querySelector(".minute");
    let s = document.querySelector(".s");

    function countDowan(endTime) {
        // 获取当前时间
        let now = new Date();
        // 计算时间差
        let time = endTime - now; //返回毫秒数
        // console.log(time);
        if (time <= 0) {
            h.innerHTML = "00";
            m.innerHTML = "00";
            s.innerHTML = "00";
            return;
        }
        // 设置时
        let h1 = parseInt(time / 1000 / 60 / 60);

        if (h1 < 10) {
            h1 = "0" + h1;
        }
        // console.log(h1);
        h.innerHTML = h1;

        // 设置分
        let m1 = parseInt(time / 1000 / 60) % 60;

        if (m1 < 10) {
            m1 = "0" + m1;
        }
        // console.log(m1);
        m.innerHTML = m1;

        // 设置秒
        let s1 = parseInt((time / 1000) % 60);

        if (s1 < 10) {
            s1 = "0" + s1;
        }
        // console.log(s);
        s.innerHTML = s1;
    }

    countDowan(new Date(2022, 8, 16, 22, 0));
    setInterval(countDowan, 1000, new Date(2022, 8, 16, 22, 0));
})();
