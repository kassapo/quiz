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

const create = function (t) {
  return document.createElement(t)
};

function append(e) {
  return document.body.appendChild(e);
}

function insert(e) {
  return document.body.insertBefore(e, sources);
}

function remove(e) {
  document.body.removeChild(e);
}

const language = 'de';
const indices = {};
const terms = {};
const texts = {};
const easy = create('button');
const done = create('button');
const hard = create('button');
const next = create('button');
const sources = create('div');
const text = create('p');
const title = create('h1');
const oneMinute = 60;
const twoMinutes = 120;
