function createBarScroller(id) {
  return function(e) {
    var body = document.body, html = document.documentElement;
    var offset = window.pageYOffset;
    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight;
    var pct = Math.max(0, Math.min(1, parseFloat(offset) / parseFloat(height)));
    document.getElementById(id).style.width = (pct*100) + '%';
  };
} 