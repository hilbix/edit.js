'use strict';
// This Works is placed under the terms of the Copyright Less License,
// see file COPYRIGHT.CLL.  USE AT OWN RISK, ABSOLUTELY NO WARRANTY.

{
  let cleaner;
  let el;
  const errs = [], cleans=[];
  const out = () =>
    {
      let x;
      if (!el && !(el = document.getElementById('err')))
        return window.setTimeout(out, 333);

      while (x = errs.shift())
        {
          cleans.push(x);
          el.appendChild(x);
        }
      if (cleans.length && !cleaner)
        cleaner	= window.setTimeout(clean, 11111);
    }
  const clean = () =>
    {
      if (!cleans.length)
        return;
      cleans.shift().remove();
      cleaner	= cleans.length ? window.setTimeout(clean, 11111) : void 0;
    }
  const log = (...msg) =>
    {
      msg	= msg.join(' ');
      console.log(msg);
      const d = document.createElement('pre');
      d.appendChild(document.createTextNode(msg));
      errs.push(d);
      out();
    }
  function prom(p)
    {
      console.log('here', p, Object.getOwnPropertyNames(p), Object.getOwnPropertySymbols(p));
      p.catch(_ => { console.log('c', `${_}`, _.stack) });
//      for (const a of Object.getOwnPropertySymbols(p)) console.log(a, p[a]);
    }
  window.addEventListener('unhandledrejection', e => { log('PROMISE:', e.reason.stack); e.preventDefault() });
  window.addEventListener('error', e => { log('ERROR:', e.message, "\n   ", e.filename, e.lineno, e.colno); e.preventDefault() });
}

