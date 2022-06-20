/* Copyright (C) 2022  Javier Correa Marichal
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

console.log('[+] Frida hooked up!');
Java.perform(function() {
  let loggerClass = Java.use('a.a.a.a.a.a');

  loggerClass.a.implementation = function(str) {
    console.log(`[V:${this._b.value}]`, str);
  }
  loggerClass.b.implementation = function(str) {
    console.log(`[E:${this._b.value}]`, str);
  }
  loggerClass.c.implementation = loggerClass.d.implementation = function(str) {
    console.log(`[I:${this._b.value}]`, str);
  }
  loggerClass.e.implementation = function(str) {
    console.log(`[W:${this._b.value}]`, str);
  }
});
