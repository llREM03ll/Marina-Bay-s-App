/* Copyright (c) 2026 Marina Bay's Cafe. All rights reserved.

   Sales and shifts for the point of sale, and the end-of-shift report.

   A shift is opened with a starting cash amount. Every sale made while it is open belongs to it.
   When the shift ends, the report is worked out and saved, like the shift report on a POS receipt:
     Cash drawer    starting cash + cash payments - cash refunds - cash paid out (cash expenses) = expected cash
                    actual cash (counted) and the difference
     Sales summary  gross sales, refunds, discounts, net sales, cash, e-wallet
     Expenses       every expense recorded during the shift
     Cups and lids  how many of each were used by the drinks sold

   Lids: a drink in a hot size uses a black lid. Otherwise the menu section decides: "dome" (round, frappe),
   "flat", or "none". Cups are named from the size: 16 oz iced -> 16oz dabba, 12 oz hot -> 12oz double wall. */
(function () {
  var D = window.MBData;
  var SALES_KEY = 'marinabays_sales_v1', SHIFTS_KEY = 'marinabays_shifts_v1', POS_KEY = 'marinabays_posname_v1', USER_KEY = 'marinabays_lastuser_v1';
  var EXP_KEY = 'marinabays_expenses_v1', MONEY_KEY = 'marinabays_money_v1';
  var TZ = 'Asia/Manila', STORE = "Marina Bay's Cafe";
  var DENOMS = [1000, 500, 200, 100, 50, 20, 10, 5, 1];

  function load(key, dflt) { try { var v = JSON.parse(localStorage.getItem(key)); if (v) return v; } catch (e) {} return dflt; }
  var sales = load(SALES_KEY, { sales: [] });
  if (!Array.isArray(sales.sales)) sales.sales = [];
  var shifts = load(SHIFTS_KEY, { nextNo: 1, cur: null, hist: [] });
  shifts.hist = shifts.hist || []; if (!shifts.nextNo) shifts.nextNo = 1;
  function saveSales() { try { localStorage.setItem(SALES_KEY, JSON.stringify(sales)); return true; } catch (e) { return false; } }
  function saveShifts() { try { localStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts)); return true; } catch (e) { return false; } }

  function r2(n) { return Math.round((Number(n) || 0) * 100) / 100; }
  function num(n) { return Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function sg(n) { n = Number(n) || 0; return (n < 0 ? '-' : n > 0 ? '+' : '') + '₱' + num(Math.abs(n)); }
  function phDate(ts) { return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ts)); }
  function fmtDT(ts) {
    if (!ts) return '-';
    return new Intl.DateTimeFormat('en-US', { timeZone: TZ, month: '2-digit', day: '2-digit', year: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true })
      .format(new Date(ts)).replace(',', '').replace(/[\u202f\u00a0]/g, ' ');
  }
  function fmtTime(ts) {
    return new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(ts)).replace(/[\u202f\u00a0]/g, ' ');
  }
  function nextDate(d) { var x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + 1); return x.toISOString().slice(0, 10); }

  /* ---------- cups and lids ---------- */
  function cupName(label) {
    var m = /(\d+)\s*oz/i.exec(label || ''); if (!m) return null;
    return m[1] + 'oz ' + (/hot/i.test(label) ? 'double wall' : 'dabba');
  }
  function lidName(cat, label) {
    if (!cupName(label)) return null;
    if (cat && cat.lid === 'none') return null;
    if (/hot/i.test(label)) return 'Black lids';
    var dome = cat && (cat.lid === 'dome' || (cat.lid === undefined && /blend|frappe/i.test((cat.name || '') + ' ' + (cat.note || ''))));
    return dome ? 'Dome lids' : 'Flat lids';
  }

  /* ---------- sales ---------- */
  // cartLines come from the POS cart; pay = { disc, method, tend }
  function makeSale(cartLines, pay) {
    var gross = 0, lines = cartLines.map(function (l) {
      var unit = Number(l.price) || 0; (l.addons || []).forEach(function (a) { unit += Number(a.p) || 0; });
      gross += unit * l.qty;
      var catId = l.cat || ((D.item(String(l.k || '').split('|')[0]) || {}).cat), cat = catId ? D.cat(catId) : null;
      return { name: l.name, opt: l.opt || '', price: Number(l.price) || 0, addons: (l.addons || []).map(function (a) { return { n: a.n, p: Number(a.p) || 0 }; }),
               note: l.note || '', qty: l.qty, cup: cupName(l.opt), lid: lidName(cat, l.opt) };
    });
    gross = r2(gross);
    var disc = r2(Math.min(pay.disc || 0, gross)), net = r2(gross - disc);
    var cur = shifts.cur, count = cur ? sales.sales.filter(function (s) { return s.shift === cur.no; }).length : 0;
    return { id: D.uid('sale'), t: Date.now(), shift: cur ? cur.no : null, n: count + 1, lines: lines, gross: gross, disc: disc, net: net,
             pay: pay.method === 'ewallet' ? 'ewallet' : 'cash', tend: r2(pay.method === 'cash' ? (pay.tend || net) : net),
             change: r2(pay.method === 'cash' ? Math.max(0, (pay.tend || net) - net) : 0), ref: 0 };
  }
  function addSale(s) { sales.sales.push(s); return saveSales(); }
  function refund(id) { var s = sales.sales.filter(function (x) { return x.id === id; })[0]; if (!s || s.ref) return false; s.ref = 1; s.refT = Date.now(); return saveSales(); }
  function salesOf(no) { return sales.sales.filter(function (s) { return s.shift === no; }); }

  /* ---------- shifts ---------- */
  function posName() { try { return localStorage.getItem(POS_KEY) || 'POS 1'; } catch (e) { return 'POS 1'; } }
  function setPosName(n) { try { localStorage.setItem(POS_KEY, String(n || 'POS 1').trim() || 'POS 1'); } catch (e) {} }
  function lastUser() { try { return localStorage.getItem(USER_KEY) || ''; } catch (e) { return ''; } }
  function rememberUser(n) { try { localStorage.setItem(USER_KEY, n || ''); } catch (e) {} }
  function current() { return shifts.cur; }
  function lastActual() { var h = shifts.hist[shifts.hist.length - 1]; return h && h.actual != null ? h.actual : ''; }
  function start(cash, by) {
    if (shifts.cur) return shifts.cur;
    var maxNo = shifts.hist.reduce(function (m, h) { return Math.max(m, h.no); }, 0);
    shifts.cur = { no: Math.max(shifts.nextNo, maxNo + 1), openedAt: Date.now(), openedBy: String(by || '').trim(), startCash: r2(cash), pos: posName() };
    shifts.nextNo = shifts.cur.no + 1; rememberUser(shifts.cur.openedBy); saveShifts(); return shifts.cur;
  }

  /* ---------- expenses and counted cash (kept by the other apps) ---------- */
  function expensesBetween(from, to) {
    var store = load(EXP_KEY, { days: {} }), out = [], d = phDate(from), last = phDate(to), guard = 0;
    while (d <= last && guard++ < 40) {
      (store.days && store.days[d] || []).forEach(function (e) {
        if (e.t ? (e.t >= from && e.t <= to) : true) out.push({ cat: e.cat, note: e.note || '', amt: Number(e.amt) || 0, src: e.src === 'online' ? 'online' : 'cash', t: e.t || 0 });
      });
      d = nextDate(d);
    }
    return out;
  }
  function countedCash(date) {
    var r = load(MONEY_KEY, {})[date], t = 0; if (!r) return 0;
    DENOMS.forEach(function (d) { t += d * ((r.counts || {})[d] || 0); });
    return t;
  }

  /* ---------- the report ---------- */
  function report(sh, opts) {
    opts = opts || {};
    var upto = opts.closedAt || Date.now(), ss = salesOf(sh.no);
    var gross = 0, refunds = 0, disc = 0, cashPay = 0, cashRef = 0, salesCash = 0, ewallet = 0, drinks = 0, cups = {}, lids = {};
    ss.forEach(function (s) {
      gross += s.gross;
      if (s.pay === 'cash') cashPay += s.net;
      if (s.ref) { refunds += s.gross; if (s.pay === 'cash') cashRef += s.net; }
      else { disc += s.disc; if (s.pay === 'cash') salesCash += s.net; else ewallet += s.net; }
      s.lines.forEach(function (l) {
        if (l.cup) { cups[l.cup] = (cups[l.cup] || 0) + l.qty; drinks += l.qty; }
        if (l.lid) lids[l.lid] = (lids[l.lid] || 0) + l.qty;
      });
    });
    var ex = expensesBetween(sh.openedAt, upto), paidOut = 0, expCash = 0, expOnline = 0;
    ex.forEach(function (e) { if (e.src === 'cash') { expCash += e.amt; paidOut += e.amt; } else expOnline += e.amt; });
    var expected = r2(sh.startCash + cashPay - cashRef - paidOut);
    var actual = opts.actual === undefined || opts.actual === null || opts.actual === '' ? null : r2(opts.actual);
    return {
      no: sh.no, store: STORE, pos: sh.pos || posName(), openedAt: sh.openedAt, openedBy: sh.openedBy || '',
      closedAt: opts.closedAt || null, closedBy: opts.closedBy || '', startCash: r2(sh.startCash),
      cashPayments: r2(cashPay), cashRefunds: r2(cashRef), paidOut: r2(paidOut), expected: expected, actual: actual,
      diff: actual === null ? null : r2(actual - expected),
      gross: r2(gross), refunds: r2(refunds), discounts: r2(disc), net: r2(gross - refunds - disc), cash: r2(salesCash), ewallet: r2(ewallet), orders: ss.length,
      expenses: ex, expCash: r2(expCash), expOnline: r2(expOnline), drinks: drinks, cups: cups, lids: lids
    };
  }
  function close(closedBy, actual) {
    var cur = shifts.cur; if (!cur) return null;
    var r = report(cur, { closedAt: Date.now(), closedBy: String(closedBy || '').trim(), actual: actual });
    shifts.hist.push(r); shifts.cur = null; rememberUser(r.closedBy); saveShifts(); return r;
  }

  /* ---------- receipts (p is the printer's line builder) ---------- */
  function sortedKeys(o) { return Object.keys(o).sort(); }
  function reportReceipt(p, r) {
    p.header(r.closedAt ? 'Shift report' : 'Shift report (still open)');
    p.text('Shift number: ' + r.no);
    p.text('Store: ' + r.store);
    p.text('POS: ' + r.pos);
    p.rule();
    p.row('Shift opened', fmtDT(r.openedAt));
    if (r.openedBy) p.text('  By: ' + r.openedBy, { indent: '      ' });
    p.row('Shift closed', r.closedAt ? fmtDT(r.closedAt) : 'not yet');
    if (r.closedAt && r.closedBy) p.text('  By: ' + r.closedBy, { indent: '      ' });
    p.rule(); p.center('Cash drawer'); p.rule();
    p.row('Starting cash', num(r.startCash));
    p.row('Cash payments', num(r.cashPayments));
    p.row('Cash refunds', num(r.cashRefunds));
    p.row('Paid out (expenses)', num(r.paidOut));
    p.row('Expected cash amount', num(r.expected));
    p.row('Actual cash amount', r.actual === null ? '-' : num(r.actual));
    p.row('Difference', r.diff === null ? '-' : (r.diff > 0 ? '+' : '') + num(r.diff), { b: true });
    p.rule(); p.center('Sales summary'); p.rule();
    p.row('Orders', String(r.orders));
    p.row('Gross sales', num(r.gross), { b: true });
    p.row('Refunds', num(r.refunds));
    p.row('Discounts', num(r.discounts));
    p.row('Net sales', num(r.net), { b: true });
    p.row('Cash', num(r.cash));
    p.row('E-wallet', num(r.ewallet));
    p.rule(); p.center('Expenses'); p.rule();
    if (!r.expenses.length) p.text('No expenses');
    r.expenses.forEach(function (e) {
      p.row(e.cat, num(e.amt));
      p.text('  ' + (e.src === 'online' ? 'Online' : 'Cash') + (e.note ? ' - ' + e.note : ''), { indent: '    ' });
    });
    p.row('Paid in cash', num(r.expCash));
    p.row('Paid online', num(r.expOnline));
    p.row('Total expenses', num(r.expCash + r.expOnline), { b: true });
    p.rule(); p.center('Cups used'); p.rule();
    if (!r.drinks) p.text('No drinks sold');
    sortedKeys(r.cups).forEach(function (k) { p.row(k, String(r.cups[k])); });
    if (r.drinks) p.row('Total cups', String(r.drinks), { b: true });
    p.rule(); p.center('Lids used'); p.rule();
    if (!sortedKeys(r.lids).length) p.text('No lids used');
    sortedKeys(r.lids).forEach(function (k) { p.row(k, String(r.lids[k])); });
    p.rule();
    p.center(fmtDT(r.closedAt || Date.now()));
    p.footer();
  }
  function saleReceipt(p, s) {
    p.header('Receipt', fmtDT(s.t));
    p.text('Order ' + s.n + (s.shift ? ' (shift ' + s.shift + ')' : ''));
    p.rule();
    s.lines.forEach(function (l) {
      var unit = l.price; l.addons.forEach(function (a) { unit += a.p; });
      p.row(l.qty + ' x ' + l.name, num(unit * l.qty));
      var extra = []; if (l.opt) extra.push(l.opt); l.addons.forEach(function (a) { extra.push('+ ' + a.n); });
      extra.forEach(function (x) { p.text('  ' + x, { indent: '    ' }); });
      if (l.note) p.text('  Note: ' + l.note, { indent: '    ' });
    });
    p.rule();
    if (s.disc) { p.row('Subtotal', num(s.gross)); p.row('Discount', '-' + num(s.disc)); }
    p.row('TOTAL', num(s.net), { b: true });
    p.row(s.pay === 'cash' ? 'Cash' : 'E-wallet', num(s.tend));
    if (s.pay === 'cash') p.row('Change', num(s.change));
    if (s.ref) p.center('REFUNDED', { b: true });
    p.footer();
  }

  window.MBShift = {
    num: num, sg: sg, fmtDT: fmtDT, fmtTime: fmtTime, phDate: phDate, r2: r2, cupName: cupName, lidName: lidName,
    sales: function () { return sales.sales; }, salesOf: salesOf, makeSale: makeSale, addSale: addSale, refund: refund,
    shifts: function () { return shifts; }, current: current, start: start, close: close, report: report, lastActual: lastActual,
    posName: posName, setPosName: setPosName, lastUser: lastUser, countedCash: countedCash, expensesBetween: expensesBetween,
    reportReceipt: reportReceipt, saleReceipt: saleReceipt
  };
})();
