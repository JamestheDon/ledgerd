# legerd

Ledgerd is a human readable cli interface for bitcoin nodes. 

## What is Ledgerd?
 ### "Building on Bitcoin"
A collection of programs and scripts designed to help bitcoin developers and node operators.

```javascript
//                       /)      /)              /)
//                      //  _  _(/ _    _  __  _(/
//                     (/__(/_(_(_(_/__(/_/ (_(_(_
//                               .-/
//                              (_/
```

<p align="center">
    <a href="https://github.com/JamestheDon/ledgerd">
    <img src="https://img.shields.io/badge/build-0.2.0-purple.svg?longCache=true" alt="Branch">
  </a>
</p>


## Heads up!

### Bitcoin Core nodes are safest to use as "hot wallets" storing small amouts of btc for short amounts of time.


## Current Support

Darwin (Mac)
Linux

## Bitcoin Core Sources
- https://bitcoincore.org/bin/

- https://github.com/bitcoin/bitcoin

- https://bitcoincore.org/en/download/

## Run CLI Instructions

```shell
# command `ledgerd` needs to be linked to access glodally.
# from inside the repo run:
$ npm link
$ ledgerd

# Without linking run:
$ node index.js
```

---

## Scripts:

- [x] `scripts/coreVersions.js`: curl available bin/pkgs for bitcoin-core and write to file `versions.json`.
- [ ] `scripts/coreInit.js`: build all important urls and env details.
- [ ] `scripts/coreInit.js`: Auth implementation.
- [ ] `scripts/coreInit.js`: bitcoin.conf creation.
- [x] `utils/auth.js`
- [ ] create configuration files, run a health check, include uptime...
- [x] `scripts/operations` {analyze}: tailing the debug.log and grep for progress status, shutdown info, errors.
### Get bitcoin-core binary files
- [ ] download desired bitcoin version pkgs 
```shell
$ wget https://bitcoincore.org/bin/bitcoin-core-0.21.1/bitcoin-0.21.1-osx.dmg
```
### Validate binary file integrity.
- [ ] Validate SHASUMs (MacOS)

```shell
# (MacOS)
# Validate SHASUMs example

$ gpg --keyserver
$ find SHASUMS.asc
$ gpg --verify SHASUMS.asc
```

## Program

- [x] `interface/main.js`: Main user interface (cli navigation).
- [ ] Login interface & script. (accept rpc passwords and usr name.) security?
