# NFC card security assessment

This repository contains the code developed for my Final Degree Project.

- Javier Correa Marichal
- Mentored by Pino Caballero Gil and Carlos Rosa Remedios
- Computer Engineering Degree
- University of La Laguna 2021/22

### 🖊 [The report is now publicly available!](https://riull.ull.es/xmlui/handle/915/28735)

## Abstract

In this Final Degree Project, a study of the security status of contactless cards that incorporate an NFC interface has been carried out. This technology is frequently used within organisations as an authentication and control mechanism, limiting the access of personnel to highly sensitive areas. Also cards that incorporate this technology are, for example, some government documents for citizen identification, such as the latest version of the Spanish electronic National Identity Card.

A security breach in any of these credentials could have a major impact on the final users, endangering the resources and sensitive information protected by them. This study documents the operation of the security mechanisms implemented in several NFC tags to protect them against common attack vectors. In addition, various real practical scenarios are explored where these mechanisms are put to the test through security audits.

## Code

The code included in this repository was developed during this study in order to test the security mechanisms embedded into the Spanish eID.

It utilizes Frida's API hooking technique to dinamically modify the behaviour of the [Android SDK provided by the Spanish government](https://www.dnielectronico.es/PORTALDNIE/PRF1_Cons02.action?pag=REF_1120). This way, the default APK bundled with this SDK can be used to carry out quick investigations like the ones showcased in this project. In particular, the code in this repository was used to carry out the following research:

- Live analysis of decrypted APDU packages between the eID and the reader
- Brute-force attack against PACE protocol
- Security analysis of the pseudorandom number generator (PRNG)
