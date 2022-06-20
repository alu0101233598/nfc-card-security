## Brute-force attack against PACE protocol

In order to run this script, it is necessary for the Android device used along to run the Frida server utility as tool. For more information on how to do this, please refer to the [official Frida documentation](https://frida.re/docs/android/).

### pace.js

Script to brute-force the CAN associated to a given eID. Testing all possible codes in the given keyspace could take up to 17 days, given an average execution time of 1500 ms for each PACE attempt.

```bash
frida -U --no-pause -l pace.js "Sample_Dnie_App"
```
