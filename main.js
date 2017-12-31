"use strict";
/*
 Copyright © 2017 Ulrich Becker, ub@kassapo.com

 This file is part of Quiz.

 Quiz is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Quiz is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with Quiz.  If not, see <http://www.gnu.org/licenses/>.

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
        text.textContent = selectedTexts().intro;
        title.textContent = selectedTexts().fail;
        remove(done);
        insert(next);
        insert(topics.container);
      }
      duration -= 1;
    }
  };
  done.onclick = function () {
    duration = -1;
    text.textContent = selectedTexts().intro;
    title.textContent = selectedTexts().success;
    remove(done);
    insert(next);
    insert(topics.container);
  };
  text.textContent = selectedTexts().guessing;
  remove(hard);
  remove(easy);
  insert(done);
  t();
};
const pick = function () {
  const random = function (length) {
    return Math.floor(Math.random() * length);
  };
  const r = random(selectedIndices().length);
  const i = selectedIndices().splice(r, 1);
  const variants = selectedTerms()[i].split("|");
  return variants.length > 1
    ? variants[0] + variants[1 + random(variants.length - 1)]
    : variants[0];
};
const setup = function () {
  selection.language = 'de';
  selection.topic = 'jobs';
  const a = create('a');
  a.href = 'https://github.com/kassapo/quiz';
  a.textContent = selectedTexts().sources;
  easy.onclick = () => go(oneMinute);
  easy.textContent = selectedTexts().easy;
  done.textContent = selectedTexts().done;
  hard.onclick = () => go(twoMinutes);
  hard.textContent = selectedTexts().hard;
  next.onclick = function () {
    if (selectedIndices().length === 0) {
      selectedIndices().length = selectedTerms().length;
      selectedIndices().fill().map((_, i) => selectedIndices()[i] = i);
    }
    title.textContent = pick();
    text.textContent = selectedTexts().prepare;
    remove(next);
    remove(topics.container);
    insert(easy);
    insert(hard);
  };
  next.textContent = selectedTexts().next;
  sources.appendChild(a);
  text.textContent = selectedTexts().intro;
  title.textContent = selectedTexts().title;
  topic.textContent = selectedTexts().topics[selection.topic];
  topics.container = create('div');
  topics.items = {};
  topics.text = create('span');
  topics.text.textContent = selectedTexts().changeTopic;
  topics.container.appendChild(topics.text);
  Object.keys(selectedTexts().topics).map(t => {
    topics.items[t] = create('button');
    topics.items[t].onclick = function () {
      selection.topic = t;
      topic.textContent = selectedTexts().topics[t];
      topics.container.innerHTML = '';
      topics.container.appendChild(topics.text);
      Object.keys(topics.items).map(i => {
        if (i !== t) topics.container.appendChild(topics.items[i]);
      });
    };
    topics.items[t].textContent = selectedTexts().topics[t];
    if (t !== selection.topic) {
      topics.container.appendChild(topics.items[t]);
    }
  });
  append(topic);
  append(title);
  append(text);
  append(next);
  append(topics.container);
  append(sources);
};
window['setup'] = setup;
/* export, called from body.onload */