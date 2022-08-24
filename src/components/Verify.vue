<template>
  <div class="container">
    <div id="captcha" style="position: relative"></div>
  </div>
</template>

<script>
import Vue from "vue";
((window) => {
  const l = 42, // 滑块边长
    r = 10, // 滑块半径
    w = 310, // canvas宽度
    h = 155, // canvas高度
    PI = Math.PI; // pi
  const L = l + r * 2; // 滑块实际边长

  // get random number
  function getRandomNumberByRange(start, end) {
    return Math.round(Math.random() * (end - start) + start);
  }
  // create canvas
  function createCanvas(width, height) {
    const canvas = createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  // create img
  function createImg(onload) {
    const img = createElement("img");
    img.crossOrigin = "Anonymous";
    img.onload = onload;
    img.onerror = () => {
      img.src = getRandomImg();
    };
    img.src = getRandomImg();
    return img;
  }

  function createElement(tagName) {
    return document.createElement(tagName);
  }

  function addClass(tag, className) {
    tag.classList.add(className);
  }

  function removeClass(tag, className) {
    tag.classList.remove(className);
  }

  // get pic from picsum
  function getRandomImg() {
    return (
      "https://picsum.photos/300/150/?image=" + getRandomNumberByRange(0, 100)
    );
  }

  // tutorial
  // https://www.w3school.com.cn/tags/html_ref_canvas.asp
  function draw(ctx, operation, x, y) {
    ctx.beginPath(); // 起始一条路径，或重置当前路径
    //left
    ctx.moveTo(x, y); // 把路径移动到画布中的指定点，不创建线条
    //top
    ctx.lineTo(x + l / 2, y); // 添加一个新点，然后在画布中创建从该点到最后指定点的线条
    ctx.arc(x + l / 2, y - r + 2, r, 0, 2 * PI); // 创建弧/曲线（用于创建圆形或部分圆）
    //right
    ctx.lineTo(x + l / 2, y);
    ctx.lineTo(x + l, y);
    ctx.lineTo(x + l, y + l / 2);
    ctx.arc(x + l + r - 2, y + l / 2, r, 0, 2 * PI);
    ctx.lineTo(x + l, y + l / 2);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.lineTo(x, y);
    //修饰，没有会看不出效果
    ctx.fillStyle = "#fff"; // 设置或返回用于填充绘画的颜色、渐变或模式
    ctx[operation]();
    ctx.beginPath();
    ctx.arc(x, y + l / 2, r, 1.5 * PI, 0.5 * PI);
    ctx.globalCompositeOperation = "xor"; // 设置或返回新图像如何绘制到已有的图像上
    ctx.fill(); // 填充当前绘图（路径）
  }

  function sum(x, y) {
    return x + y;
  }

  function square(x) {
    return x * x;
  }

  class jigsaw {
    constructor(el, success, fail) {
      this.el = el;
      this.success = success;
      this.fail = fail;
    }
    init() {
      this.initDOM();
      this.initImg();
      this.draw();
      this.bindEvents();
    }
    initDOM() {
      const canvas = createCanvas(w, h);
      const block = canvas.cloneNode(true);
      const sliderContainer = createElement("div");
      const refreshIcon = createElement("div");
      const sliderMask = createElement("div");
      const slider = createElement("div");
      const sliderIcon = createElement("span");
      const text = createElement("span");
      block.className = "block";
      sliderContainer.className = "sliderContainer";
      refreshIcon.className = "refreshIcon";
      sliderMask.className = "sliderMask";
      slider.className = "slider";
      sliderIcon.className = "sliderIcon";
      text.innerHTML = "向右滑动滑块填充拼图";
      text.className = "sliderText";
      const el = this.el;
      el.appendChild(canvas);
      el.appendChild(refreshIcon);
      el.appendChild(block);
      slider.appendChild(sliderIcon);
      sliderMask.appendChild(slider);
      sliderContainer.appendChild(sliderMask);
      sliderContainer.appendChild(text);
      el.appendChild(sliderContainer);
      Object.assign(this, {
        canvas,
        block,
        sliderContainer,
        refreshIcon,
        slider,
        sliderMask,
        sliderIcon,
        text,
        canvasCtx: canvas.getContext("2d"),
        blockCtx: block.getContext("2d"),
      });
    }
    initImg() {
      const img = createImg(() => {
        this.canvasCtx.drawImage(img, 0, 0, w, h);
        this.blockCtx.drawImage(img, 0, 0, w, h);
        const y = this.y - r * 2 + 2;
        const ImageData = this.blockCtx.getImageData(this.x, y, L, L);
        this.block.width = L;
        this.blockCtx.putImageData(ImageData, 0, y);
      });
      this.img = img;
    }
    draw() {
      this.x = getRandomNumberByRange(L + 10, w - (L + 10));
      this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10));
      draw(this.canvasCtx, "fill", this.x, this.y);
      draw(this.blockCtx, "clip", this.x, this.y);
    }
    clean() {
      this.canvasCtx.clearRect(0, 0, w, h);
      this.blockCtx.clearRect(0, 0, w, h);
      this.block.width = w;
    }

    bindEvents() {
      this.el.onselectstart = () => false;
      this.refreshIcon.onclick = () => {
        this.reset();
      };
      let originX,
        originY,
        trail = [],
        isMouseDown = false;
      this.slider.addEventListener("mousedown", (e) => {
        (originX = e.x), (originY = e.y);
        isMouseDown = true;
      });
      document.addEventListener("mousemove", (e) => {
        if (!isMouseDown) return false;
        const moveX = e.x - originX;
        const moveY = e.y - originY;
        if (moveX < 0 || moveX + 38 >= w) return false;
        this.slider.style.left = moveX + "px";
        var blockLeft = ((w - 40 - 20) / (w - 40)) * moveX;
        this.block.style.left = blockLeft + "px";
        addClass(this.sliderContainer, "sliderContainer_active");
        this.sliderMask.style.width = moveX + "px";
        trail.push(moveY);
      });
      document.addEventListener("mouseup", (e) => {
        if (!isMouseDown) return false;
        isMouseDown = false;
        if (e.x == originX) return false;
        removeClass(this.sliderContainer, "sliderContainer_active");
        this.trail = trail;
        const { spliced, TuringTest } = this.verify();
        if (spliced) {
          if (TuringTest) {
            addClass(this.sliderContainer, "sliderContainer_success");
            this.success && this.success();
          } else {
            addClass(this.sliderContainer, "sliderContainer_fail");
            this.text.innerHTML = "再试一次";
            this.reset();
          }
        } else {
          new Vue().$notify({
            title: "错误",
            message: "验证失败",
            type: "error",
          });
          addClass(this.sliderContainer, "sliderContainer_fail");
          this.fail && this.fail();
          //验证失败后，1秒后重新加载图片
          setTimeout(() => {
            this.reset();
          }, 1000);
        }
      });
    }

    verify() {
      const arr = this.trail; // y movement
      const average = arr.reduce(sum) / arr.length;
      const deviations = arr.map((x) => x - average);
      const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
      const left = parseInt(this.block.style.left);
      return {
        spliced: Math.abs(left - this.x) < 10,
        TuringTest: average !== stddev, // 只是简单的验证拖动轨迹，相等时一般为0，表示可能非人为操作
      };
    }

    reset() {
      this.sliderContainer.className = "sliderContainer";
      this.slider.style.left = 0;
      this.block.style.left = 0;
      this.sliderMask.style.width = 0;
      this.clean();
      this.img.src = getRandomImg();
      this.draw();
    }
  }

  window.jigsaw = (element, success, fail) => {
    return new jigsaw(element, success, fail);
  };
})(window);

export default {
  data() {
    return {
      codeImg: false, // true->created when jigsawing
      objImg: null,
    };
  },
  mounted() {
    console.log("window.jigsaw", window.jigsaw);
  },
  methods: {
    eventInitImg() {
      this.objImg = {};
      document.getElementById("captcha").innerHTML = "";
      this.objImg = window.jigsaw(document.getElementById("captcha"), () => {
        this.$notify({
          title: "成功",
          message: "验证成功",
          type: "success",
        });
        this.$emit("closePupUp");
        this.$emit("register");
      });
      this.objImg.init();
    },

    eventResetImg() {
      this.objImg.reset();
    },
  },
};
</script>

<style>
.container {
  width: 310px;
  /* margin: 100px auto; */
}
#msg {
  width: 100%;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
}
a:link,
a:visited,
a:hover,
a:active {
  margin-left: 100px;
  color: #0366d6;
}
.block {
  position: absolute;
  left: 0;
  top: 0;
}
.sliderContainer {
  position: relative;
  text-align: center;
  width: 310px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}
.sliderContainer_active .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}
.sliderContainer_active .sliderMask {
  height: 38px;
  border-width: 1px;
}
.sliderContainer_success .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}
.sliderContainer_success .sliderMask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}
.sliderContainer_success .sliderIcon {
  background-position: 0 0 !important;
}
.sliderContainer_fail .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}
.sliderContainer_fail .sliderMask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}
.sliderContainer_fail .sliderIcon {
  background-position: 0 -83px !important;
}
.sliderContainer_active .sliderText,
.sliderContainer_success .sliderText,
.sliderContainer_fail .sliderText {
  display: none;
}
.sliderMask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}
.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
}
.slider:hover {
  background: #1991fa;
}
.slider:hover .sliderIcon {
  background-position: 0 -13px;
}
.sliderIcon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 10px;
  background-size: 34px 471px;
}
.refreshIcon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-size: 34px 471px;
  display: none;
}
</style>