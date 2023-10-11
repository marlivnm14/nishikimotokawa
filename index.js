
// /* Please ❤ this if you like it! */**************************************************************** */
(function ($) {
    "use strict";
  
    var t = document.getElementById("cursor"),
      e = document.getElementById("cursor2"),
      i = document.getElementById("cursor3");
  
    $(document).ready(function () {
  
      /* Hero Case study images */
  
      $('.slide-buttons li:nth-child(1)').on('mouseenter', function () {
        $('.slide-buttons li.active').removeClass('active');
        $('.hero-center-section.show').removeClass("show");
        $('.hero-center-section:nth-child(1)').addClass("show");
        $('.slide-buttons li:nth-child(1)').addClass('active');
      })
      $('.slide-buttons li:nth-child(2)').on('mouseenter', function () {
        $('.slide-buttons li.active').removeClass('active');
        $('.hero-center-section.show').removeClass("show");
        $('.hero-center-section:nth-child(2)').addClass("show");
        $('.slide-buttons li:nth-child(2)').addClass('active');
      })
      $('.slide-buttons li:nth-child(3)').on('mouseenter', function () {
        $('.slide-buttons li.active').removeClass('active');
        $('.hero-center-section.show').removeClass("show");
        $('.hero-center-section:nth-child(3)').addClass("show");
        $('.slide-buttons li:nth-child(3)').addClass('active');
      })
      $('.slide-buttons li:nth-child(1)').trigger('mouseenter')
  
      var i = 0;
      setInterval(function () {
        if (i == 0) {
          if ($('.slide-buttons li:nth-child(1)').hasClass('active')) {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(2)').addClass("show");
            $('.slide-buttons li:nth-child(2)').addClass('active');
          }
          i=1;
        } else if(i==1){
          if ($('.slide-buttons li:nth-child(2)').hasClass('active')) {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(3)').addClass("show");
            $('.slide-buttons li:nth-child(3)').addClass('active');
          }
          i = 2;
        }
        else if(i==2) {
          if ($('.slide-buttons li:nth-child(3)').hasClass('active')) {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(4)').addClass("show");
            $('.slide-buttons li:nth-child(4)').addClass('active');
          }
          i = 3;
        }
        else if(i==3) {
          if ($('.slide-buttons li:nth-child(4)').hasClass('active')) {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(1)').addClass("show");
            $('.slide-buttons li:nth-child(1)').addClass('active');
          }
          i = 0;
        }
        else{
          i=0;
        }
      }, 2000);
    });
  
  })(jQuery);
  
  
  // ********************************************************************
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const layers = 4;
  let size = 0;
  let particles = [];
  let targets = [];
  const lerp = (t, v0, v1) => (1 - t) * v0 + t * v1;
  const fov = 2000;
  const viewDistance = 200;
  let targetRotationY = 0.5;
  let rotationY = 0.5;
  let speed = 40;
  let animFrame;
  const texts = [
    'Welcome.',
  ];
  let textIndex = 0;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  class Vector3 {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  
    static fromScreenCoords(_x, _y, _z) {
      const factor = fov / viewDistance;
      const x = (_x - canvas.width / 2) / factor;
      const y = (_y - canvas.height / 2) / factor;
      const z = _z !== undefined ? _z : 0;
  
      return new Vector3(x, y, z);
    }
  
    rotateX(angle) {
      const z = this.z * Math.cos(angle) - this.x * Math.sin(angle);
      const x = this.z * Math.sin(angle) + this.x * Math.cos(angle);
      return new Vector3(x, this.y, z);
    }
    rotateY(angle) {
      const y = this.y * Math.cos(angle) - this.z * Math.sin(angle);
      const z = this.y * Math.sin(angle) + this.z * Math.cos(angle);
      return new Vector3(this.x, y, z);
    }
    pp() {
      const factor = fov / (viewDistance + this.z);
      const x = this.x * factor + canvas.width / 2;
      const y = this.y * factor + canvas.height / 2;
      return new Vector3(x, y, this.z);
    }
  }
  window.onload = function init(e) {
    if (e) e.preventDefault();
    cancelAnimationFrame(animFrame);
    const text = texts[textIndex++ % texts.length];
    let fontSize = 150;
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;
    particles = [];
    targets = [];
    // Create temp canvas for the text, draw it and get the image data.
    const c = document.createElement('canvas');
    const cx = c.getContext('2d');
    cx.font = `900 ${fontSize}px Arial`;
    let w = cx.measureText(text).width;
    const h = fontSize * 1.5;
    let gap = 7;
  
    // Adjust font and particle size to fit text on screen
    while (w > window.innerWidth * .8) {
      fontSize -= 1;
      cx.font = `900 ${fontSize}px Arial`;
      w = cx.measureText(text).width;
    }
    if (fontSize < 100) gap = 6;
    if (fontSize < 70) gap = 4;
    if (fontSize < 40) gap = 2;
    size = Math.max(gap / 2, 1);
    c.width = w;
    c.height = h;
    startX = Math.floor(startX - w / 2);
    startY = Math.floor(startY - h / 2);
    cx.fillStyle = '#000';
    // For reasons unknown to me, font needs to be set here again, otherwise font size will be wrong.
    cx.font = `900 ${fontSize}px Arial`;
    cx.fillText(text, 0, fontSize);
    const data = cx.getImageData(0, 0, w, h);
  
  
    // Iterate the image data and determine target coordinates for the flying particles
    for (let i = 0; i < data.data.length; i += 4) {
      const rw = data.width * 4;
      const rh = data.height * 4;
      const x = startX + Math.floor((i % rw) / 4);
      const y = startY + Math.floor(i / rw);
  
      if (data.data[i + 3] > 0 && x % gap === 0 && y % gap === 0) {
        for (let j = 0; j < layers; j++) {
          targets.push(Vector3.fromScreenCoords(x, y, j * 1));
        }
      }
    }
  
    targets = targets.sort((a, b) => a.x - b.x);
    loop();
    return false;
  }
  
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // As long as there are targets, keep creating new particles.
    // Remove target from the targets array when it's been assigned to a particle.
    for (let i = 0; i < speed; i++) {
      if (targets.length > 0) {
  
        target = targets[0];
        x = (canvas.width / 2) + target.x * 10;
        y = canvas.height / 2;
        z = -10;
  
        const position = Vector3.fromScreenCoords(x, y, z);
        const interpolant = 0;
  
        particles.push({ position, target, interpolant });
        targets.splice(0, 1);
      }
    }
  
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = `rgb(${r},${g},${b})`;
  
    particles
      .sort((pa, pb) => pb.target.z - pa.target.z)
      .forEach((p, i) => {
        if (p.interpolant < 1) {
          p.interpolant = Math.min(p.interpolant + .01, 1);
  
          p.position.x = lerp(p.interpolant, p.position.x, p.target.x);
          p.position.y = lerp(p.interpolant, p.position.y, p.target.y);
          p.position.z = lerp(p.interpolant, p.position.z, p.target.z);
        }
        const rotationX = Math.sin(Date.now() / 2000) * .8;
        rotationY = lerp(0.00001, rotationY, targetRotationY);
        const particle = p.position
          .rotateX(rotationX)
          .rotateY(rotationY)
          .pp();
  
        const s = 1 - (p.position.z / layers);
        ctx.fillStyle = p.target.z === 0
          ? 'rgb(114, 204, 255)'
          : color;
  
        ctx.fillRect(particle.x, particle.y, s * size, s * size);
      });
  
    animFrame = requestAnimationFrame(loop);
  }
  
  window.addEventListener('mousemove', e => {
    const halfHeight = window.innerHeight / 2;
    targetRotationY = (e.clientY - halfHeight) / window.innerHeight;
  })


  
// ********************************************************************
setTimeout(fadeOut, 4000);
setTimeout(fadeIn, 5000);

function fadeOut() {
  const part = document.getElementById("canvas")
  part.style.opacity = 1;

  var start = performance.now();

  requestAnimationFrame(function tick(timestamp) {
    // イージング計算式（linear）
    var easing = (timestamp - start) / 300;

    // opacityが0より小さくならないように
    part.style.opacity = Math.max(1 - easing, 0);

    // イージング計算式の値が1より小さいとき
    if (easing < 1) {
      requestAnimationFrame(tick);
    } else {
      part.style.opacity = '';
      part.style.display = 'none';
    }
  });
}

function fadeIn() {
  const part = document.getElementById("index");
  part.style.display = 'block';
  part.style.opacity = 0;
  var start = performance.now();

  requestAnimationFrame(function tick(timestamp) {
    // イージング計算式（linear）
    var easing = (timestamp - start) / 800;

    // opacityが1を超えないように
    part.style.opacity = Math.min(easing, 1);

    // opacityが1より小さいとき
    if (easing < 1) {
      requestAnimationFrame(tick);
    } else {
      part.style.opacity = '';
    }
  });
}