/**
 * @spec examine env looking for btc core files & data & capabilities
 *  
 *  @Q Details to know about the system useful to for node operators.
 *  how much space avail? 
 *  what platform?
 * 
 *  BONUS: How "clean" is the env?
 *          Having the peace of mind knowing that some basic explotis are accounted for.
 */

 import { stat, writeFile, mkdir } from "fs";
 import { homedir, platform } from "os";
 import { spawn, exec } from "child_process";
 import { genRpcAuthStr } from "../utils/auth.js";
 /**
  * @Name coreInit , "bitcoin core initiate"
  * @SPEC Single production node.
  * @REQ dir urls (bitd, lnd), ports, auth* = create config.
  *
  */
 
 // todo: Promot in a cli for user options. auth
 
 const pkgName = "ledgerd"; // Directory to build network in.
 const ip = "127.0.0.1:";
 
 const windows = "UsersYourUserNameAppdataRoamingBitcoin"; // (Vista and 7)
 
 const env = platform();
 const home = homedir();
 const paths = [];
 
 // 4 ports needed? bitcoind & lnd
 const ports = [];
 const startPort = [8333]; // startPort 8333 is where the port generation starts from.
 
 const Node = function (x) {
   if (!(this instanceof Node)) return new Node(x);
   // a node needs a database, whats the url?
   if (env === "darwin") {
     const macBaseDir = "/Library/Application Support/Bitcoin/";
     const uri = home + macBaseDir;
     this.init();
   }
   if (env === "linux") {
     const linuxBaseDir = "/.bitcoin/";
     const uri = home + linuxBaseDir;
     this.init();
   }
 };
 
 Node.prototype = {
   auth: function () {
 const auth = genRpcAuthStr('turtle', 'thisisnotapassword')
 console.log('heeeerrrr', auth)
   },
 
   init: function () {
     console.log("init:");
     // What needs to be done so a node can start.
     // if started already then -> this
   },
 };
 const opts = { user: "first", password: "here" };
 const node0 = Node(opts);
  node0.auth();