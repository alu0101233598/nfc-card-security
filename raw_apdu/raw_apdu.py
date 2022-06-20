#!/usr/bin/python3
# -*- encoding: utf-8 -*-

#########################################################################
## This program utilizes Frida to display a live view of decrypted APDU
## packages sent between the eID and the reader. It is necessary for the
## Android device used along this tool to run the Frida server utility as
## root.
#########################################################################
## Copyright (C) 2022  Javier Correa Marichal
## 
## This program is free software: you can redistribute it and/or modify
## it under the terms of the GNU General Public License as published by
## the Free Software Foundation, either version 3 of the License, or
## (at your option) any later version.
## 
## This program is distributed in the hope that it will be useful,
## but WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU General Public License for more details.
## 
## You should have received a copy of the GNU General Public License
## along with this program.  If not, see <https://www.gnu.org/licenses/>.
#########################################################################

import frida, sys, signal, json, hexdump, time

# Constants
TARGET_PROCESS = 'Sample_Dnie_App'
start_time = time.perf_counter()


def message_handler(message, data):
  if message['type'] == 'error':
    print('[E]', message)
  if message['type'] == 'send':
    # Uncomment to display time since the process was hooked
    # print(f'== {time.perf_counter() - start_time} s')
    hexdump.hexdump(data)


def sig_handler(sig, frame):
  print('\n[!] Exiting')
  sys.exit(0)


if __name__ == '__main__':
  signal.signal(signal.SIGINT, sig_handler)
  print('[H] Attaching to USB device')
  device = frida.get_usb_device()
  print(f'[H] Attaching to target process: {TARGET_PROCESS}')
  process = device.attach(TARGET_PROCESS)
  with open('raw_apdu.js') as jscode:
    script = process.create_script(jscode.read())
  script.on('message', message_handler)
  print(f'[H] Loading JS Frida module')
  script.load()
  sys.stdin.read()

