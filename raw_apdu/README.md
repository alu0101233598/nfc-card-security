## Live analysis of decrypted APDU packages between the eID and the reader

In order to run this script, it is necessary for the Android device used along to run the Frida server utility as tool. For more information on how to do this, please refer to the [official Frida documentation](https://frida.re/docs/android/).

### raw_apdu.py

Shows a live analysis of decrypted APDU packages between the eID and the reader. It can optionally show how much time has passed since the beginning of the hook, in order to profile the performed operations.

```bash
python raw_apdu.py
```

### sniffing.js

Shows only the information thrown by the logger object created during runtime.

```bash
frida -U --no-pause -l sniffing.js "Sample_Dnie_App"
```
