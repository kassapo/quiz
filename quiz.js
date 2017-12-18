"use strict";
let button, text, title;
const go = function () {
  let duration = 120;
  const t = function () {
    if (duration !== -1) {
      duration -= 1;
      const m = (duration / 60) >> 0;
      const s = duration - m * 60;
      title.innerText = m + ':' + (s > 9 ? s : '0' + s);
      if (duration > 0) setTimeout(t, 1e3); else {
        set(next, 'next', 'intro', 'fail');
      }
    }
  };
  button.onclick = function () {
    duration = -1;
    set(next, 'next', 'intro', 'success');
  };
  button.innerText = texts[language]['done'];
  text.innerText = texts[language]['guessing'];
  t();
};
const next = function () {
  if (indices.length == 0) {
    indices.length = terms.length;
    indices.fill().map((_, i) => indices[i] = i);
  }
  set(go, 'go', 'prepare');
  title.innerText = pick();
};
const pick = function () {
  const random = function (length) {
    return Math.floor(Math.random() * length);
  };
  const i = indices[language].splice(random(indices[language].length), 1);
  const variants = terms[language][i];
  return variants.length > 0 ? variants[random(variants.length)] : variants[0];
};
const reset = function () {
  button.onclick = next;
  button.innerText = texts[language]['next'];
  text.innerText = texts[language]['intro'];
  title.innerText = texts[language]['title'];
};
const set = function (bc, bi, te, ti) {
  button.onclick = bc;
  button.innerText = texts[language][bi];
  text.innerText = texts[language][te];
  if (ti) title.innerText = texts[language][ti];
};
const setup = function () {
  const c = function (n, id, cn, t) {
    const e = document.createElement(n);
    e.id = id;
    e.className = cn;
    e.textContent = t;
    return document.body.appendChild(e);
  };
  document.body.innerHTML = '';
  title = c('h1', 'term', 'mdc-typography--display1', texts.de.title);
  text = c('p', 'description', 'mdc-dialog__body', texts.de.intro);
  button = c('button', 'next', 'mdc-button mdc-button--raised', texts.de.next);
  button.onclick = next;
};
