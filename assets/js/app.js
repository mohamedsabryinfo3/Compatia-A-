/* ==========================================================================
   أكاديمية CompTIA A+ — منطق التطبيق
   ========================================================================== */
(function () {
  'use strict';

  var M = window.MODULES || [];
  var LESSONS = [];                      // قائمة مسطّحة لكل الدروس
  M.forEach(function (m, mi) {
    m.lessons.forEach(function (l, li) { l._m = mi; l._i = li; LESSONS.push(l); });
  });

  /* ------------------------------ التخزين المحلي ------------------------------ */
  var LS = {
    get: function (k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var done   = LS.get('aplus_done', []);        // مصفوفة معرّفات الفيديو
  var notes  = LS.get('aplus_notes', {});       // { vid: نص }
  var scores = LS.get('aplus_scores', {});      // { vid: {c, t} }
  var lastL  = LS.get('aplus_last', null);      // آخر درس
  var theme  = LS.get('aplus_theme', 'dark');

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------------------ أدوات مساعدة ------------------------------ */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  var TOTAL_Q = LESSONS.reduce(function (a, l) { return a + l.quiz.length; }, 0);
  var TOTAL_T = LESSONS.reduce(function (a, l) { return a + l.terms.length; }, 0);

  var state = { filter: 'all', q: '', hideDone: false, cur: null, curTab: 'explain' };

  /* =============================== بناء الواجهة =============================== */
  function buildStats() {
    $('#stLessons').textContent = LESSONS.length;
    $('#stModules').textContent = M.length;
    $('#stQuiz').textContent = TOTAL_Q;
    $('#stTerms').textContent = TOTAL_T;
  }

  function buildChips() {
    var h = '<button class="chip on all" data-f="all">كل الوحدات <b>' + LESSONS.length + '</b></button>';
    M.forEach(function (m) {
      h += '<button class="chip" data-f="' + m.id + '" style="--h:' + m.hue + '">' +
           esc(m.title) + ' <b>' + m.lessons.length + '</b></button>';
    });
    h += '<button class="chip" data-f="undone" style="--h:150">غير المكتمل</button>';
    $('#chips').innerHTML = h;
    $$('#chips .chip').forEach(function (c) {
      c.addEventListener('click', function () {
        state.filter = c.dataset.f;
        $$('#chips .chip').forEach(function (x) { x.classList.remove('on'); });
        c.classList.add('on');
        renderModules();
      });
    });
  }

  function buildSidebar() {
    var h = '';
    M.forEach(function (m, mi) {
      var dn = m.lessons.filter(function (l) { return done.indexOf(l.id) > -1; }).length;
      h += '<div class="side-mod" data-open="true" style="--h:' + m.hue + '">' +
             '<button class="side-mod-t" data-mi="' + mi + '">' +
               '<span class="mi"><svg viewBox="0 0 24 24" width="15" height="15"><use href="#i-' + m.icon + '"/></svg></span>' +
               '<span>' + esc(m.title) + '</span>' +
               '<span class="cnt">' + dn + '/' + m.lessons.length + '</span>' +
             '</button><div class="side-lessons">';
      m.lessons.forEach(function (l) {
        h += '<button class="side-lesson' + (done.indexOf(l.id) > -1 ? ' done' : '') + '" data-v="' + l.id + '">' +
               '<span class="n">' + l.n + '</span><span class="t">' + esc(l.title) + '</span></button>';
      });
      h += '</div></div>';
    });
    $('#sideNav').innerHTML = h;

    $$('#sideNav .side-mod-t').forEach(function (b) {
      b.addEventListener('click', function () {
        var w = b.parentNode;
        w.dataset.open = w.dataset.open === 'true' ? 'false' : 'true';
      });
    });
    $$('#sideNav .side-lesson').forEach(function (b) {
      b.addEventListener('click', function () { openLesson(b.dataset.v); });
    });
  }

  function match(l) {
    if (state.filter === 'undone' && done.indexOf(l.id) > -1) return false;
    if (state.filter !== 'all' && state.filter !== 'undone') {
      var m = M[l._m];
      if (m.id !== state.filter) return false;
    }
    if (state.hideDone && done.indexOf(l.id) > -1) return false;
    if (state.q) {
      var q = state.q.toLowerCase();
      var hay = (l.title + ' ' + l.sub + ' ' + l.summary + ' ' + l.points.join(' ') + ' ' +
                 l.terms.map(function (t) { return t.t + ' ' + t.d; }).join(' ') + ' ' +
                 M[l._m].title).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  function renderModules() {
    var host = $('#modules');
    var any = false, h = '';
    M.forEach(function (m, mi) {
      var ls = m.lessons.filter(match);
      if (!ls.length) return;
      any = true;
      var dn = m.lessons.filter(function (l) { return done.indexOf(l.id) > -1; }).length;
      var pct = Math.round(dn / m.lessons.length * 100);
      h += '<section class="mod" id="' + m.id + '" style="--h:' + m.hue + '">' +
             '<div class="mod-head">' +
               '<div class="mod-ico"><svg viewBox="0 0 24 24" width="24" height="24"><use href="#i-' + m.icon + '"/></svg></div>' +
               '<div><h2>الوحدة ' + m.n + ' — ' + esc(m.title) + '</h2><p>' + esc(m.sub) + '</p></div>' +
               '<div class="mod-prog"><b>' + pct + '%</b>' + dn + ' من ' + m.lessons.length + ' مكتمل</div>' +
             '</div><div class="grid">';
      ls.forEach(function (l) {
        var isDone = done.indexOf(l.id) > -1;
        var sc = scores[l.id];
        h += '<article class="card' + (isDone ? ' done' : '') + '" data-v="' + l.id + '" tabindex="0">' +
               '<div class="card-thumb">' +
                 (window.ART ? window.ART.svg(l.id, m.icon) : '') +
                 '<span class="cnum">درس ' + l.n + '</span>' +
                 '<span class="cdone"><svg viewBox="0 0 24 24" width="14" height="14"><use href="#i-check"/></svg></span>' +
               '</div>' +
               '<div class="card-body">' +
                 '<h3>' + esc(l.title) + '</h3><p>' + esc(l.sub) + '</p>' +
                 '<div class="card-foot"><span class="dot"></span>' + l.points.length + ' نقطة · ' + l.terms.length + ' مصطلح' +
                   (sc ? '<span class="score-mini">' + sc.c + '/' + sc.t + '</span>' : '<span class="q">' + l.quiz.length + ' أسئلة</span>') +
                 '</div>' +
               '</div></article>';
      });
      h += '</div></section>';
    });
    host.innerHTML = any ? h :
      '<div class="empty">لا توجد نتائج مطابقة<span style="display:block;margin-top:8px;font-size:12px">جرّب كلمات أخرى أو أزل عوامل التصفية</span></div>';

    $$('#modules .card').forEach(function (c) {
      c.addEventListener('click', function () { openLesson(c.dataset.v); });
      c.addEventListener('keydown', function (e) { if (e.key === 'Enter') openLesson(c.dataset.v); });
    });
  }

  /* =============================== شريط التقدم =============================== */
  function updateProgress() {
    var pct = Math.round(done.length / LESSONS.length * 100);
    $('#progTxt').textContent = pct + '%';
    var C = 2 * Math.PI * 15.5;
    var fg = $('#ringFg');
    fg.style.strokeDasharray = C;
    fg.style.strokeDashoffset = C * (1 - pct / 100);
    $$('#sideNav .side-lesson').forEach(function (b) {
      b.classList.toggle('done', done.indexOf(b.dataset.v) > -1);
    });
    // تحديث عدّادات الشريط الجانبي
    M.forEach(function (m, mi) {
      var dn = m.lessons.filter(function (l) { return done.indexOf(l.id) > -1; }).length;
      var el = $('#sideNav .side-mod')[mi];
      if (el) $('.cnt', el).textContent = dn + '/' + m.lessons.length;
    });
  }

  /* =============================== نافذة الدرس =============================== */
  var drawer = $('#drawer'), overlay = $('#overlay');

  function openLesson(id) {
    var l = LESSONS.filter(function (x) { return x.id === id; })[0];
    if (!l) return;
    state.cur = l;
    lastL = id; LS.set('aplus_last', id);
    renderDrawer(l);
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    $('#sidebar').classList.remove('open');
    markActive();
  }

  function markActive() {
    $$('#sideNav .side-lesson').forEach(function (b) {
      b.classList.toggle('active', state.cur && b.dataset.v === state.cur.id);
    });
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    state.cur = null;
  }

  function renderDrawer(l) {
    var m = M[l._m];
    drawer.style.setProperty('--h', m.hue);
    $('#dhMod').textContent = 'الوحدة ' + m.n + ' — ' + m.title;
    $('#dhTitle').textContent = l.title;
    $('#dhNum').textContent = l.n;

    $('#tabTerms').innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><use href="#i-cards"/></svg> المصطلحات <span class="tbadge">' + l.terms.length + '</span>';
    $('#tabQuiz').innerHTML  = '<svg viewBox="0 0 24 24" width="16" height="16"><use href="#i-quiz"/></svg> اختبر نفسك <span class="tbadge">' + l.quiz.length + '</span>';

    var isDone = done.indexOf(l.id) > -1;
    $('#markTxt').textContent = isDone ? 'مكتمل ✓ — إلغاء التعليم' : 'تعليم كمكتمل';
    $('#btnMark').classList.toggle('done-state', isDone);

    showTab(state.curTab);
  }

  function showTab(tab) {
    state.curTab = tab;
    var l = state.cur; if (!l) return;
    $$('#tabs .tab').forEach(function (t) { t.classList.toggle('active', t.dataset.tab === tab); });
    var b = $('#drawerBody'), h = '';

    if (tab === 'explain') {
      h = '<div class="lesson-head">' +
            '<span class="lh-num">درس ' + l.n + '</span>' +
            '<h3 class="lh-title">' + esc(l.title) + '</h3>' +
          '</div>' +
          '<div class="sect"><h3>الملخص</h3><p class="lead">' + esc(l.summary) + '</p></div>' +
          '<div class="sect"><h3>النقاط الرئيسية (' + l.points.length + ')</h3><ul class="plist">' +
            l.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div>';
      b.innerHTML = h;

    } else if (tab === 'terms') {
      h = '<div class="sect"><h3>المصطلحات (' + l.terms.length + ') — اضغط أي بطاقة لعرضها في وضع المراجعة</h3>' +
          '<div class="terms">' + l.terms.map(function (t, i) {
            return '<div class="term" data-i="' + i + '"><b>' + esc(t.t) + '</b><p>' + esc(t.d) + '</p></div>';
          }).join('') + '</div></div>';
      b.innerHTML = h;
      $$('#drawerBody .term').forEach(function (el) {
        el.addEventListener('click', function () { openCards([l], +el.dataset.i); });
      });

    } else if (tab === 'tips') {
      h = '<div class="sect"><h3>نصائح للامتحان</h3><ul class="tips">' +
          l.tips.map(function (t) {
            return '<li><svg viewBox="0 0 24 24" width="17" height="17"><use href="#i-star"/></svg><span>' + esc(t) + '</span></li>';
          }).join('') + '</ul></div>' +
          '<div class="sect"><h3>تذكير سريع</h3><p class="lead" style="margin:0">' + esc(l.summary) + '</p></div>';
      b.innerHTML = h;

    } else if (tab === 'quiz') {
      renderQuiz(b, l);

    } else if (tab === 'notes') {
      h = '<div class="sect"><h3>ملاحظاتي على الدرس</h3>' +
          '<textarea class="notes" id="noteBox" placeholder="اكتب ما استفدته من الدرس… تُحفظ تلقائياً في متصفحك">' +
          esc(notes[l.id] || '') + '</textarea></div>';
      b.innerHTML = h;
      $('#noteBox').addEventListener('input', function () {
        notes[l.id] = this.value; LS.set('aplus_notes', notes);
      });
    }
    b.scrollTop = 0;
  }

  /* ------------------------------ الاختبار ------------------------------ */
  function renderQuiz(b, l) {
    var st = scores[l.id];
    var head = '<div class="quiz-head"><span class="quiz-score' +
      (st ? (st.c / st.t >= .7 ? ' good' : ' bad') : '') + '" id="qScore">' +
      (st ? 'نتيجتك: ' + st.c + ' من ' + st.t : 'لم تُجب بعد') + '</span>' +
      '<button class="btn sml" id="qReset" style="padding:7px 14px;font-size:12px">إعادة المحاولة</button></div>';

    var body = l.quiz.map(function (q, qi) {
      var opts = q.a.map(function (a, ai) {
        return '<button class="opt" data-q="' + qi + '" data-a="' + ai + '">' +
               '<span class="ol">' + 'أبجد'[ai] + '</span><span>' + esc(a) + '</span></button>';
      }).join('');
      return '<div class="qcard"><h4><span class="qn">' + (qi + 1) + '</span><span>' + esc(q.q) + '</span></h4>' +
             '<div class="opts">' + opts + '</div><div class="qexp" id="exp' + qi + '" hidden></div></div>';
    }).join('');

    b.innerHTML = '<div class="sect"><h3>اختبر نفسك (' + l.quiz.length + ' أسئلة)</h3></div>' + head + body;

    $$('#drawerBody .opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var qi = +btn.dataset.q, ai = +btn.dataset.a;
        var card = btn.closest('.qcard');
        if (card.dataset.answered) return;
        card.dataset.answered = '1';
        var q = l.quiz[qi], correct = ai === q.c;
        $$('.opt', card).forEach(function (o) {
          o.disabled = true;
          if (+o.dataset.a === q.c) o.classList.add('right');
          else if (+o.dataset.a === ai) o.classList.add('wrong');
        });
        var exp = $('#exp' + qi);
        exp.hidden = false;
        exp.textContent = (correct ? '✓ إجابة صحيحة. ' : '✗ الإجابة الصحيحة هي: ' + q.a[q.c] + '. ') +
                          'الدرس يغطي هذه النقطة: ' + l.points[0];

        scores[l.id] = scores[l.id] || { c: 0, t: l.quiz.length };
        if (correct) scores[l.id].c++;
        LS.set('aplus_scores', scores);
        var s = scores[l.id];
        var el = $('#qScore');
        el.textContent = 'نتيجتك: ' + s.c + ' من ' + s.t;
        el.className = 'quiz-score ' + (s.c / s.t >= .7 ? 'good' : 'bad');
        renderModules();
      });
    });
    $('#qReset').addEventListener('click', function () {
      delete scores[l.id]; LS.set('aplus_scores', scores);
      renderQuiz(b, l); renderModules();
    });
  }

  /* =============================== بطاقات المراجعة =============================== */
  var modeDrawer = $('#modeDrawer'), modeBody = $('#modeBody');

  function openCards(lessons, startIdx) {
    var cards = [];
    lessons.forEach(function (l) {
      l.terms.forEach(function (t) { cards.push({ t: t.t, d: t.d, src: 'درس ' + l.n }); });
    });
    if (!cards.length) return;
    var i = startIdx || 0;
    $('#mdTitle').textContent = 'بطاقات المراجعة';
    $('#mdSub').textContent = cards.length + ' بطاقة';
    modeDrawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    draw();

    function draw() {
      var c = cards[i];
      modeBody.innerHTML =
        '<div class="fc-wrap">' +
          '<div class="fc" id="fc"><div class="fc-inner">' +
            '<div class="fc-face"><span class="k">' + esc(c.src) + '</span><span class="v">' + esc(c.t) + '</span>' +
              '<span class="fc-hint">اضغط لعرض التعريف</span></div>' +
            '<div class="fc-face back"><span class="k">' + esc(c.t) + '</span><span class="v">' + esc(c.d) + '</span></div>' +
          '</div></div>' +
          '<div class="fc-ctrl">' +
            '<button class="btn" id="fcPrev">السابق</button>' +
            '<span class="pos">' + (i + 1) + ' / ' + cards.length + '</span>' +
            '<button class="btn primary" id="fcNext">التالي</button>' +
          '</div>' +
          '<p class="fc-hint">اضغط البطاقة لقلبها · مسافة للقلب · ← → للتنقل</p>' +
        '</div>';
      var fc = $('#fc');
      fc.addEventListener('click', function () { fc.classList.toggle('flip'); });
      $('#fcPrev').addEventListener('click', function () { i = (i - 1 + cards.length) % cards.length; draw(); });
      $('#fcNext').addEventListener('click', function () { i = (i + 1) % cards.length; draw(); });
      modeBody._next = function () { i = (i + 1) % cards.length; draw(); };
      modeBody._prev = function () { i = (i - 1 + cards.length) % cards.length; draw(); };
      modeBody._flip = function () { fc.classList.toggle('flip'); };
    }
  }

  /* =============================== الاختبار الشامل =============================== */
  function openExam() {
    var pool = [];
    LESSONS.forEach(function (l) {
      l.quiz.forEach(function (q) { pool.push({ q: q, l: l }); });
    });
    // خلط
    pool.sort(function () { return Math.random() - .5; });
    var qs = pool.slice(0, 20);
    var answers = new Array(qs.length).fill(-1);
    var finished = false;

    $('#mdTitle').textContent = 'اختبار شامل';
    $('#mdSub').textContent = qs.length + ' سؤال من مختلف وحدات الدورة';
    modeDrawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    draw();

    function draw() {
      var h = qs.map(function (o, qi) {
        var opts = o.q.q ? o.q.a.map(function (a, ai) {
          return '<button class="opt' + (answers[qi] === ai ? ' right' : '') + '" data-q="' + qi + '" data-a="' + ai + '">' +
                 '<span class="ol">' + 'أبجد'[ai] + '</span><span>' + esc(a) + '</span></button>';
        }).join('') : '';
        return '<div class="qcard"><h4><span class="qn">' + (qi + 1) + '</span><span>' + esc(o.q.q) + '</span></h4>' +
               '<div class="opts">' + opts + '</div>' +
               '<div class="card-foot" style="border:0;padding:8px 0 0"><span class="dot"></span>الدرس ' + o.l.n + ' — ' + esc(o.l.title) +
               (finished ? (answers[qi] === o.q.c
                  ? '<span class="score-mini">صحيح</span>'
                  : '<span class="score-mini" style="background:color-mix(in srgb,var(--bad) 18%,transparent);color:var(--bad)">الصحيح: ' + 'أبجد'[o.q.c] + '</span>')
                 : '') +
               '</div></div>';
      }).join('');

      var c = answers.filter(function (a, i) { return a === qs[i].q.c; }).length;
      h = '<div class="quiz-head"><span class="quiz-score' + (finished ? (c / qs.length >= .7 ? ' good' : ' bad') : '') + '">' +
          (finished ? 'النتيجة النهائية: ' + c + ' من ' + qs.length + '  (' + Math.round(c / qs.length * 100) + '%)'
                    : 'أجب عن كل الأسئلة ثم اضغط تصحيح') + '</span>' +
          '<button class="btn" id="exDone">تصحيح الاختبار</button></div>' + h;

      modeBody.innerHTML = h;

      $$('#modeBody .opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (finished) return;
          var qi = +btn.dataset.q;
          answers[qi] = +btn.dataset.a;
          draw();
        });
      });
      $('#exDone').addEventListener('click', function () { finished = true; draw(); modeBody.scrollTop = 0; });
    }
  }

  function closeMode() {
    modeDrawer.classList.remove('open');
    if (!drawer.classList.contains('open')) {
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
    modeBody._next = modeBody._prev = modeBody._flip = null;
  }

  /* =============================== الأحداث =============================== */
  function bind() {
    $$('#tabs .tab').forEach(function (t) {
      t.addEventListener('click', function () { showTab(t.dataset.tab); });
    });
    $('#btnCloseDrawer').addEventListener('click', closeDrawer);
    $('#btnCloseMode').addEventListener('click', closeMode);
    overlay.addEventListener('click', function () { closeMode(); closeDrawer(); });
    $('#btnMark').addEventListener('click', function () {
      var l = state.cur; if (!l) return;
      var i = done.indexOf(l.id);
      if (i > -1) done.splice(i, 1); else done.push(l.id);
      LS.set('aplus_done', done);
      renderDrawer(l); renderModules(); updateProgress(); buildSidebar();
    });
    $('#btnPrev').addEventListener('click', function () { step(-1); });
    $('#btnNext').addEventListener('click', function () { step(1); });
    $('#btnReset').addEventListener('click', function () {
      if (!confirm('سيتم حذف علامات الإكمال فقط (تبقى الملاحظات والدرجات). متابعة؟')) return;
      done = []; LS.set('aplus_done', done);
      renderModules(); updateProgress(); buildSidebar();
    });

    $('#search').addEventListener('input', function () {
      state.q = this.value.trim(); renderModules();
    });

    $('#hideDone').addEventListener('change', function () {
      state.hideDone = this.checked; renderModules();
    });

    $('#btnTheme').addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme();
    });

    $('#btnMenu').addEventListener('click', function () { $('#sidebar').classList.toggle('open'); });
    $('#btnCloseSide').addEventListener('click', function () { $('#sidebar').classList.remove('open'); });

    $('#btnStart').addEventListener('click', function () { openLesson(LESSONS[0].id); });
    $('#btnContinue').addEventListener('click', function () {
      var next = LESSONS.filter(function (l) { return done.indexOf(l.id) === -1; })[0];
      openLesson((next || LESSONS[0]).id);
    });
    $('#btnCardsMode').addEventListener('click', function () { openCards(LESSONS, 0); });
    $('#btnExamMode').addEventListener('click', openExam);

    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault(); $('#search').focus(); return;
      }
      if (e.key === 'Escape') { closeMode(); closeDrawer(); }
      if (!drawer.classList.contains('open') && !modeDrawer.classList.contains('open')) return;
      if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') { modeBody._prev ? modeBody._prev() : step(-1); }
      if (e.key === 'ArrowLeft')  { modeBody._next ? modeBody._next() : step(1); }
      if (e.key === ' ' && modeBody._flip) { e.preventDefault(); modeBody._flip(); }
    });
  }

  function step(d) {
    if (!state.cur) return;
    var i = LESSONS.indexOf(state.cur) + d;
    if (i < 0 || i >= LESSONS.length) return;
    openLesson(LESSONS[i].id);
  }

  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    $('#themeIco').setAttribute('href', theme === 'dark' ? '#i-moon' : '#i-sun');
    LS.set('aplus_theme', theme);
  }

  /* =============================== الإقلاع =============================== */
  applyTheme();
  buildStats();
  buildChips();
  buildSidebar();
  renderModules();
  updateProgress();
  bind();
})();
