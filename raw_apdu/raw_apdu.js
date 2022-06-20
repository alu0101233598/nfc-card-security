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

  let commandApduClass = Java.use('javax.smartcardio.a');
  let responseApduClass = Java.use('javax.smartcardio.b');

  // public CommandAPDU(int cla, int ins, int p1, int p2, byte[] data, int ne);
  commandApduClass.$init.overload('int', 'int', 'int', 'int', '[B', 'int').implementation = function(a, b, c, d, e, f) {
    this.$init(a, b, c, d, e, f);
    console.log(this.toString());
    send("{type: 'command'}", new Uint8Array(this._a.value));
  };

  // public ResponseAPDU(byte[] apdu);
  responseApduClass.$init.implementation = function(a) {
    this.$init(a);
    console.log(this.toString());
    send("{type: 'response'}", new Uint8Array(this._a.value));
  };
});
