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
var paceObj = null;
Java.perform(function() {
  if (paceObj === null) {
    Java.choose('de.tsenger.androsmex.e.e', {
      onMatch: (instance) => paceObj = instance,
      onComplete: () => {}
    });
  }

  // Get the nonce from the response APDU
  // let asn1Class = Java.use('de.tsenger.androsmex.b.j');
  // asn1Class.a.implementation = function(i) {
  //   let ret = this.a(i);
  //   if (i === 0) {
  //     send('{"type": "encNonce"}', new Uint8Array(ret));
  //   }
  //   return ret;
  // };

  // SmartCardMRTDConnection
  let smartCardClass = Java.use('es.gob.jmulticard.d.b.b');
  smartCardClass.a.overload('[Ljava.lang.String;', 'de.tsenger.androsmex.d.d.g$d').implementation = function(a, b) {
    let modifiedA = Java.array('java.lang.String', ['044032']);
    let ret = null;
    let condition = false;
    do {
      try {
        ret = this.a(modifiedA, b);
      } catch(e) {
        if (true || e.message.includes('InvalidCanException') || e.message.includes('0x6300')) {
          continue;
        } else {
          console.log('[E]', e.message);
          throw e;
        }
      } finally {
        send('{"type": "poll"}');
        recv(function(outputJson) {
          condition = outputJson.condition;
        }).wait();
      }
    } while (condition);
    return ret;
  }

  let decryptClass = Java.use('de.tsenger.androsmex.c.a');
  decryptClass.a.overload('[B', '[B').implementation = function(key, data) {
    send('{"type": "key"}', new Uint8Array(key));
    send('{"type": "encNonce"}', new Uint8Array(data));
    let ret = this.a(key, data);
    send('{"type": "decNonce"}', new Uint8Array(ret));
    if (paceObj === null) {
      throw new Error("Couldn't find de.tsenger.androsmex.e.e");
    }
    paceObj.a(0, Java.array('byte', []));
    // return ret;
  }

  let ioExceptionClass = Java.use('java.io.IOException');
  ioExceptionClass.getMessage.implementation = function() {
    let error = this.getMessage();
    // console.log('[ERROR]', error);
    return '0x6300';
  }

  // Event logging 
  // let loggerClass = Java.use('a.a.a.a.a.a');
  // loggerClass.a.implementation = function(str) {
  //   console.log(`[V:${this._b.value}]`, str);
  // }
  // loggerClass.b.implementation = function(str) {
  //   console.log(`[E:${this._b.value}]`, str);
  // }
  // loggerClass.c.implementation = loggerClass.d.implementation = function(str) {
  //   console.log(`[I:${this._b.value}]`, str);
  // }
  // loggerClass.e.implementation = function(str) {
  //   console.log(`[W:${this._b.value}]`, str);
  // }

  // let commandApduClass = Java.use('javax.smartcardio.a');
  // let responseApduClass = Java.use('javax.smartcardio.b');

  // // public CommandAPDU(int cla, int ins, int p1, int p2, byte[] data, int ne);
  // commandApduClass.$init.overload('int', 'int', 'int', 'int', '[B', 'int').implementation = function(a, b, c, d, e, f) {
  //   this.$init(a, b, c, d, e, f);
  //   console.log(this.toString());
  //   send('{"type": "command"}', new Uint8Array(this._a.value));
  // };

  // // public ResponseAPDU(byte[] apdu);
  // responseApduClass.$init.implementation = function(a) {
  //   this.$init(a);
  //   console.log(this.toString());
  //   send('{"type": "response"}', new Uint8Array(this._a.value));
  // };
});
