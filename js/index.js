// 显示时间
let time = document.querySelector(".header-right .time");
let date = document.querySelector(".header-right .date");
setInterval(() => {
        let T = new Date();
        // 获取时
        let S = new Date().getHours();
        S = S < 10 ? "0" + S : S;
        // 获取分
        let M = new Date().getMinutes();
        M = M < 10 ? "0" + M : M;
        // 获取秒
        let H = new Date().getSeconds();
        H = H < 10 ? "0" + H : H;
        time.innerHTML = S + ":" + M + ":" + H
    },
    1000)
// 显示日历
let F = new Date().getFullYear()
let O = new Date().getMonth() + 1
O = O < 10 ? "0" + O : 0;
let D = new Date().getDate();
D = D < 10 ? "0" + D : D
date.innerHTML = F + "年" + O + "月" + D + "日";
// 左下角轮播设备警告
// 构造函数封装
function Fn(obj) {
    // 传入需要的元素
    this.ele = document.querySelector(obj.selector);
    // 定义初始的移动值
    this.speed = obj.speed;
    // 利用时间函数让图动起来
    this.timer = setInterval(() => {
        // 向上滑动为负所以让移动值--
        this.speed--
        // 判断当它移动的距离超出移动过的距离让移动值等于0
        if (this.speed <= -274) {
            // this.ele.style.top = 0;
            this.speed = obj.speed;
        }
        // 将移动的值传给元素
        this.ele.style.top = this.speed + "px";
        // this.ele.style.left = this.speed + "px";
    }, obj.time)
    // 当鼠标移入时停止滑动
    this.ele.onmouseover = () => {
        clearInterval(this.timer);
    }
    // 当鼠标移出时继续滑动
    this.ele.onmouseout = () => {
        this.timer = setInterval(() => {
            this.speed--
            if (this.speed <= -274) {
                // this.ele.style.top = 0;
                this.speed = obj.speed;
            }
            // this.ele.style.left = this.speed + "px";
            this.ele.style.top = this.speed + "px";
        }, obj.time)
    }
}
// 左边滑动块
let obj = {
    selector: ".list-box",
    speed: 0,
    time: 100
}
//右边滑动块
let obj1 = {
    selector: ".content .content-card .device-warning .deice-list .right",
    speed: 0,
    time: 100
}
let Warn = new Fn(obj)
let income = new Fn(obj1)
// 中间滑动块
function Cn(obj) {
    // 传入需要的元素
    this.ele = document.querySelector(obj.selector);
    // 定义初始的移动值
    this.speed = obj.speed;
    // 利用时间函数让图动起来
    this.timer = setInterval(() => {
        // 向上滑动为负所以让移动值--
        this.speed--
        // 判断当它移动的距离超出移动过的距离让移动值等于0
        if (this.speed <= -274) {
            // this.ele.style.top = 0;
            this.speed = obj.speed;
        }
        // 将移动的值传给元素
        this.ele.style.left = this.speed + "px";
        // this.ele.style.left = this.speed + "px";
    }, obj.time)
    // 当鼠标移入时停止滑动
    this.ele.onmouseover = () => {
        clearInterval(this.timer);
    }
    // 当鼠标移出时继续滑动
    this.ele.onmouseout = () => {
        this.timer = setInterval(() => {
            this.speed--
            if (this.speed <= -629) {
                // this.ele.style.top = 0;
                this.speed = obj.speed;
            }
            // this.ele.style.left = this.speed + "px";
            this.ele.style.left = this.speed + "px";
        }, obj.time)
    }
}
let obj3 = {
    selector: ".stop-box",
    speed: 0,
    time: 100
}
let car = new Cn(obj3)