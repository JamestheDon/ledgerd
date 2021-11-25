"use strict";
const cp = require("child_process");
const fs = require("fs");
const storage = require('node-persist');
const reset = "\x1b[0m";
const cyan = "\x1b[36m";

/**
 *  @desc this module uses sys cmds `curl` & `grep` to retreive \n
 *        bitcoin core binary releases from bitcoincore.org and Write found versions to database.
 * 
 *        Compare versions to btc-core thats installed to found versions.
 *  @todo: Map though versions.json to determine most recent version.
 *  @todo: return last few versions.
 *  @todo: create new `curl` target url for downloading binary pkgs for updates.
 * 
 * https://bitcoincore.org/bin/
 * https://bitcoin.org/bin/
 * 
 */

const getBitVer = () => {
  const regeex = ".......-....-d.d.d";
  //.......\-....\-\(\d\+\.\)\?\(\d+\.\)\?\(\*|\d\+\)$
  try {
      // Use sys commands to GET by `curl` current Bitcoin Core 
      // versions avail for download. 
    const curl = cp.spawn("curl", ["https://bitcoincore.org/bin/"], {
      encoding: "utf-8",
    });
    // Piping of `curl` response to `grep` to seach for keyword 'bitcoin-core'
    const grep = cp.spawn("grep", ["bitcoin-core"], { encoding: "utf-8" });

    //  Pipe curl data to grep.
    curl.stdout.pipe(grep.stdin);

    //  outputs to terminal
    //  grep.stdout.pipe(process.stdin);

    // curl ERRORS
    curl.stderr.on("data", (err) => {
      console.log(
        "STDERRRR1:=>",
        err.toString(),
        "Is the `curl` cmd installed?"
      );
    });

    // grep ERRORS
    grep.stderr.on("data", (data) => {
      console.log("STDERRRR2:=>", data, "\n GREP ERROR");
    });

    let buffer = "";
    grep.stdout.on("data", (data) => {
      // take care of empty strings.
      buffer += data;
      const isoString = buffer.split("\n");
      let versions = "";
      const final = []
      isoString.map((item, i) => {
        const version = {
          ver: null
        }
       // console.log(`${cyan}Found versions:${reset}`, item.slice(9, 28));
       version.ver = item.slice(9, 28) + ",";
        versions += item.slice(9, 28) + ",";
        final.push(version)
      });
      const content = versions.split(",");
    for (let i = final.length; i--;) {
      console.log('this', final[i])
    }
   
     console.log(`${cyan}FINALLY${reset}: ${final.length}` )
      fs.writeFileSync(
        "./versions.json",
        JSON.stringify(content),
        "utf8",
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });

    grep.stdout.on("close", () => {
      console.log("grep finished...");
      process.exit(0);
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

/**
 * 
 * 
 * 
 */

getBitVer();
// module.exports = {getBitVer}
