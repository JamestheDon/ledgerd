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
import  { rpcAuth} from "../interface/auth.js";
/**
 * @Name coreInit , "bitcoin core initiate"
 * @SPEC Single production node.
 * @REQ dir urls (bitd, lnd), ports, auth* = create config.
 *
 */

// todo: Promot in a cli for user options. auth
const myArgs = process.argv.slice(2);

const pkgName = "ledgerd"; // Directory to build network in.
const ip = "127.0.0.1:";

const windows = "UsersYourUserNameAppdataRoamingBitcoin"; // (Vista and 7)

const env = platform();
const home = homedir();
const paths = [];

// 4 ports needed? bitcoind & lnd
const ports = [];
const startPort = [8333]; // startPort 8333 is where the port generation starts from.

const Node = function (opts) {
  if (!(this instanceof Node)) return new Node(x);
  // a node needs a database, whats the url?
};

Node.prototype = {
  auth: async function()  {
    console.log("RPC auth:", rpcAuth);
    // const val =  await authInterface().then((res) => {
    //     console.log('prototype.auth', res)
    //     return res
    // })
    // console.log('values:', val)


  },

  init: function()   {
    console.log("init:");
   this.auth()
    // What needs to be done so a node can start.
    // if started already then -> this
  },
};

if (env === "darwin") {
  const macBaseDir = "/Library/Application Support/Bitcoin/";
  const uri = home + macBaseDir;
  Node.prototype.init();
}
if (env === "linux") {
  const linuxBaseDir = "/.bitcoin/";
  const uri = home + linuxBaseDir;
  Node.prototype.init();
}

const opts = { user: "first", password: "here" };
//const node0 = Node(opts);
//node0.auth();
