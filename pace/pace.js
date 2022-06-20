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
  // SmartCardMRTDConnection
  let smartCardClass = Java.use('es.gob.jmulticard.d.b.b');
  smartCardClass.a.overload('[Ljava.lang.String;', 'de.tsenger.androsmex.d.d.g$d').implementation = function(a, b) {
    let modifiedA = Java.array('java.lang.String', ['000001', '000002', '000003']);
    // Returns the correct CAN
    let ret = this.a(modifiedA, b);
    console.log('[+]', ret);
    return ret;
  }

  // Shows thrown exceptions to the user
  let ioExceptionClass = Java.use('java.io.IOException');
  ioExceptionClass.getMessage.implementation = function() {
    let error = this.getMessage();
    console.log('[ERROR]', error);
    return error;
  }
});
