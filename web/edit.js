'use strict';
// This Works is placed under the terms of the Copyright Less License,
// see file COPYRIGHT.CLL.  USE AT OWN RISK, ABSOLUTELY NO WARRANTY.

DomReady.then(_ => new Edit().main());

const tools =
  {
    untab(s)
      {
        const tabs = s.split('\t');
        for (let i=tabs.length-1; --i>=0; )
          tabs[i] += '        '.substr(tabs[i].length % 8);
        return tabs.join('');
      }
  };
const fns =
  {
    removeTrailingSpaces(s)
      {
        return s.split('\n').map(_ => _.replace(/\s+$/, ''));
      },
    replaceTabWithSpace(s)
      {
        return s.split('\n').map(_ => tools.untab(_));
      },
    removeMultipleSpaces(s)
      {
        return s.replace(/\s\s+/g,' ');
      }
  };

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
// WTF why is there no standard list for this?
const accels = 'Alt AltGraph CapsLock Control Fn FnLock Hyper Meta NumLock OS ScrollLock Shift Super Symbol SymbolLock'.split(' ');

class Edit
  {
  #edit
  #top
  #out
  #sel

  constructor(el, top)
    {
      this.#edit = E(el || 'edit');
      this.#top  = E(top || 'editbar');
    }
  out(...args) { this.#out.clr().text(...args) }
  async main()
    {
      const e = this.#top.clr().DIV;
      this.#sel = e.SELECT;
      e.BUTTON.text('run').on('click', _ =>
        {
          const fn = this.#sel.$option.$value;
          this.out('run ', fn);
          const t = fns[fn](this.#edit.$value);
          if (t)
            this.#edit.$value = isArray(t) ? t.join('\n') : t;
          this.#edit.$.focus();
        });
      this.#out = e.SPAN.style({ paddingLeft:'1ch' });
      this.out('experimental minimal text editing.  load/save not implemented, use clipboard');
      for (const a in fns)
        this.#sel.OPTION.text(a);
      window.addEventListener('keydown', _ => this.keydown(_));
    }
  keydown(ev)
    {
      let meta='';
      for (const a of accels)
        if (ev.getModifierState(a))
          meta+=`${a} `;
      this.out(`${meta}${ev.code}`);
    }
  };

