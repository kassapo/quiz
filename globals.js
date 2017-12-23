"use strict";

const create = function (t) {
  return document.createElement(t)
};

const language = 'de';
const indices = {};
const terms = {};
const texts = {};
const easy = create('button');
const done = create('button');
const hard = create('button');
const next = create('button');
const sources = create('a');
const text = create('p');
const title = create('h1');
const oneMinute = 60;
const twoMinutes = 120;
