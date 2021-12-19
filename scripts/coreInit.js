/**
 * @spec examine env looking for btc core files & data & capabilities
 *
 */
import { stat, writeFile, mkdir } from "fs";
import { homedir, platform } from "os";
import { spawn, exec } from "child_process";
//import * as versions from "../scripts/versions.json";
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

// 4 ports needed? bitcoind & lnd
const ports = [];
const startPort = [8333]; // startPort 8333 is where the port generation starts from.

export const Node = function (opts) {
  if (!(this instanceof Node)) return new Node(opts);
  // a node needs a database, whats the url?
  this.pkg = "ledgerd/";
  this.uri = this.checkEnv();
  this.auth = "";
  this.port = 8333;
  this.rpcPort = 8334;
};

Node.prototype = {
  checkEnv: function () {
    if (env === "darwin") {
      const macDefaultUrl = "/Library/Application Support/Bitcoin/";
      const uri = home + macDefaultUrl + this.pkg;
      this.uri = uri;
      return uri;
      //  Node.prototype.init(uri);
    }
    if (env === "linux") {
      const linuxDefaultUrl = "/.bitcoin/";
      const uri = home + linuxDefaultUrl;
      return uri;
      //  Node.prototype.init(env, home);
    }
  },

  ensureDir: function (uri) {
    return new Promise((resolve, reject) => {
      let result = { uri: uri };

      //changed from depreciated fs.exists()
      stat(uri, (err, stats) => {
        if (stats) {
          return resolve([true, "Dir exists!"]);
        } else {
          //create parent & child dir
          mkdir(uri, { recursive: true }, (err) => {
            if (err) {
              return reject(err);
            }
            console.log("created " + uri);
            resolve([true, "Dir created!"]);
          });
        }
      });
    });
  },
  rpcAuth: async function () {
    // minimise async functions.
    const { rpcAuth } = await import("../interface/auth.js");
    return rpcAuth;
    // if
  },

  genParamaters: function () {
    const port = 0;
    const rpcPort = 0;
  },

  genConf: function (auth) {
    // cookie handling?
    //  -rpccookiefile.
    stat(this.uri + "bitcoin.conf", (err, stats) => {
      if (stats) {
        console.log([true, "Config already exists!"]);
        // check current conf to new conf;
        // update if needed.
        return;
      } else {
        // What shouldnt be overwritten?
        const conf = `
        regtest=1
        debug=rpc
        server=1
        ${auth}
        datadir=${this.uri}
        [regtest]
        bind=127.0.0.1:${this.port}
        rpcport=${this.rpcPort}
        port=${this.port}
    
        `;

        if (err.errno === -2) {
          console.log("No .conf file found; \nCreating now::");
          writeFile(this.uri + "bitcoin.conf", conf, (err) => {
            if (err) console.log(err);
            console.log("bitcoin.conf:", true);
          });
        }
      }
    });
  },

  init: function () {
    console.log("initing:");
    // gen rpc auth string
    this.ensureDir(this.uri).then((res) => {
      console.log("directory state::", res);
      if (res[0] === true) {
      }
    });
    this.rpcAuth().then((res) => {
      // config needs db & port numbers paramaters.
      this.genConf(res);
    });
    // this.rpcAuth().then((res) => {
    //   // config needs db & port numbers paramaters.
    //   this.genConf(res);
    // });

    console.log("uri here::", this.uri);

    // this.rpcAuth();
  },
};

const opts = { port: 8333, rpcPort: 8334 };
// const node0 = Node(opts);

// node0.init();
