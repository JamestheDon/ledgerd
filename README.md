

```javascript
//                          /)      /)              /)   
//                         //  _  _(/ _    _  __  _(/   
//                        (/__(/_(_(_(_/__(/_/ (_(_(_    
//                                  .-/                  
//                                 (_/          
```
<p align="center">
    <a href="https://github.com/JamestheDon/ledgerd">
    <img src="https://img.shields.io/badge/build-passing-brightgreen.svg?longCache=true" alt="Branch">
  </a>
</p>

# legerd 
Ledgerd is a human readable cli interface for bitcoin nodes.           

## What is Ledgerd
A cli for managing and operating a Bitcoin Core node. By abstracting direct `bitcoin-cli` calls away from the user it allows for the execution of more complex strings of commands that generate information usefle to the user. 
> "useful to the user", what a concept lolz.

## Current Support
Mac os

## Requirements
Bitcoin Core : https://bitcoincore.org/bin/


  ```shell
  $ node -v 
      v14.16.1 
  $ bitcoind
  $ bitcoin-cli
  ```
## Run Instructions
```shell
# command `ledgerd` needs to be linked to access glodally.
# from inside the repo run:
$ npm link
$ ledgerd

# Without linking run:
$ node index.js
```
----

## TODOs:

### Need RPC creds
- Dont need 
- [] edit bitcoin.conf file 
- server 127.0.0.1:8332 add to bitcoin.config

###  Initial user interface (cli navigation), 
   - [ ] Login interface. (accept rpc passwords and usr name.) security?
   - [x] inital operation options. i.e run sync test, start node, add wallet, wallet bal. etc.



## Update/download and install bitcoin core

### check bitcoin core version number. 
 Bitcoin Core Repos:

(https://github.com/bitcoin/bitcoin) 

https://bitcoincore.org/en/download/
  
 ### Get current bitcoin-core binary files

```shell
$ wget https://bitcoincore.org/bin/bitcoin-core-0.21.1/bitcoin-0.21.1-osx.dmg
``` 

### Write "keep node updated" script. (alert if update needed)
  - Check bitcoin-core binary index for new bitcoin-core version.

### Validate SHASUMs (MacOS) 

 ```shell
 # shell command examples
 $ gpg --keyserver
 $ find SHASUMS.asc 
 $ gpg --verify SHASUMS.asc
 ```

- check nodes current env.
- [] os checking to determine what directories to look for, and what sys commands can be used.
- run a health check. include uptime...
### Start bitcoind
- set command execution path.

### Check sync progress.
  - [x] operation analyze: tailing the debug.log and grep for progress status, shutdown info, errors.
  ``` javascript
  // sudo node code.
  spawn("tail")
  spawn("grep -m 1 'progress='")
  ```