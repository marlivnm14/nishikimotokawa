document.addEventListener('DOMContentLoaded', function () {
  document.body.style.display = 'block';
});

const modal = $('#modal-container');
const img = modal.find('img');

$('img.popup').each(function (index) {
  $(this).click(function () {
    img.attr('src', $(this).attr('src'));
    modal.show();
  })
});

modal.click(function () {
  $(this).hide();
});

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 200) {//上から200pxスクロールしたら
    $('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
    $('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
  } else {
    if ($('#page-top').hasClass('UpMove')) {//すでに#page-topにUpMoveというクラス名がついていたら
      $('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
      $('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
  $('body,html').animate({
    scrollTop: 0//ページトップまでスクロール
  }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false;//リンク自体の無効化
});

$(function () {
  const element = document.getElementById("linkbox");
  $("#linkwrap").hover(
    function () {
      element.style.opacity = '1';
    },
    function () {
      element.style.opacity = '0'
    }
  );
});

$(function(){
  $("#b5 #linkbox").on("click", function() {
    window.location.href = 'Gallery.html';
  });
});




$(function () {
  // html 共通部分読み込み
  $("#header").load("header.html");
  $("#footer").load("footer.html");
  $("#footer2").load("footer.html");
});

/**/
// 要素を取得　..①
const zoom = document.querySelectorAll(".zoom");
const zoomback = document.getElementById("zoomback");
const zoomimg = document.getElementById("zoomimg");

// 一括でイベントリスナ　..②
zoom.forEach(function (value) {
  value.addEventListener("click", kakudai);
});

function kakudai(e) {
  // 拡大領域を表示　..③
  zoomback.style.display = "flex";
  // 押された画像のリンクを渡す　..④
  zoomimg.setAttribute("src", e.target.getAttribute("src"));
  zoomimg.classList.add("deka");
  footer.style.display = "none";
}

// 元に戻すイベントリスナを指定　..⑤
zoomback.addEventListener("click", modosu);

// 拡大領域を無きものに　..⑥
function modosu() {
  zoomimg.classList.remove("deka")
  zoomback.style.display = "none";
  footer.style.display="block";
}


//***********************************
//サムネイルを左右中央に配置して順（ランダム）に読み込む
//***********************************	
$(window).on('load', function () {
  // update
  $('#container img').delay(1000).each(function (i) {
    var imgW = $(this).width();
    var imgH = $(this).height();
    var imgL = (imgW / 2) * (-1);
    var imgT = (imgH / 2) * (-1);

    $(this).delay(Math.floor(Math.random() * 1000)).css({
      'display': 'block',
      'opacity': '0',
      'width': imgW + 'px',
      'height': imgH + 'px',
      'left': '50%',
      'top': '50%',
      // 'margin-left': + imgL + 'px',
      // 'margin-top': + imgT + 'px'
    }).fadeTo(1000, 1);
  });
});
