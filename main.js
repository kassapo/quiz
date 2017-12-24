"use strict";

/*
 Copyright © 2017 Ulrich Becker, ub@kassapo.com

 This file is part of Ratespiel.

 Ratespiel is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Ratespiel is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with Ratespiel.  If not, see <http://www.gnu.org/licenses/>.

 The source code is available at https://kassapo.github.com/quiz
 */

const go = function (duration) {
  const t = function () {
    if (duration !== -1) {
      const m = (duration / 60) >> 0;
      const s = duration - m * 60;
      title.textContent = m + ':' + (s > 9 ? s : '0' + s);
      if (duration > 0) {
        setTimeout(t, 1e3);
      } else {
        text.textContent = texts[language].intro;
        title.textContent = texts[language].fail;
        remove(done);
        insert(next);
      }
      duration -= 1;
    }
  };
  done.onclick = function () {
    duration = -1;
    text.textContent = texts[language].intro;
    title.textContent = texts[language].success;
    remove(done);
    insert(next);
  };
  text.textContent = texts[language].guessing;
  remove(hard);
  remove(easy);
  insert(done);
  t();
};

const pick = function () {
  const random = function (length) {
    return Math.floor(Math.random() * length);
  };
  const i = indices[language].splice(random(indices[language].length), 1);
  const variants = terms[language][i];
  return variants.length > 0 ? variants[random(variants.length)]
    : variants[0];
};

const setup = function () {
  const a = create('a');
  a.href = 'https://github.com/kassapo/quiz';
  a.textContent = texts[language].sources;
  easy.onclick = () => go(oneMinute);
  easy.textContent = texts[language].easy;
  done.textContent = texts[language].done;
  hard.onclick = () => go(twoMinutes);
  hard.textContent = texts[language].hard;
  next.onclick = function () {
    if (indices.length === 0) {
      indices.length = terms.length;
      indices.fill().map((_, i) => indices[i] = i);
    }
    title.textContent = pick();
    text.textContent = texts[language].prepare;
    remove(next);
    insert(easy);
    insert(hard);
  };
  next.textContent = texts[language].next;
  sources.appendChild(a);
  text.textContent = texts[language].intro;
  title.textContent = texts[language].title;
  append(title);
  append(text);
  append(next);
  append(sources);
};

window['setup'] = setup; /* export, called from body.onload */