# Guessing game

One out of a group of players is given a random term to present to the others.
The others may attempt to guess the term within one, or two minutes.
Repeat.

  * The first screen asks the group to pick one of their members.
Everybody else should not look at the screen.

  * The second screen presents the term.
The presenter chooses how much time to give the guessers.  

  * The third screen has the timer counting down.
The counting can be interrupted if the term has been guessed.
The game will return to the first screen.

  * The fourth screen appears when the count down runs out.
From it you can return to the first screen.

The game does not keep score.
All it does is pick a term and run the timer.

Play online at <https://kassapo.github.io/quiz/>

## Google Closure Compiler

```
$ brew install closure-compiler
```

Use `compile` script to generate `quiz.js` from `globals.js`, `i18n.js` and
`main.js`.

## License

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
