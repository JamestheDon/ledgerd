/**
 *  @SPEC this module uses sys cmds `curl` & `grep` to retreive \n
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
"use strict";
const cp = require("child_process");
const fs = require("fs");
const reset = "\x1b[0m";
const cyan = "\x1b[36m";

const getBitVer = () => { 
  // const regeex = ".......-....-d.d.d";
  //.......\-....\-\(\d\+\.\)\?\(\d+\.\)\?\(\*|\d\+\)$
  
    // curl Bitcoin COre versions avail for download.
    // --silent option stops curl.stderr from receiving the curl progess data.
    const curl = cp.spawn(
      "curl",
      ["--silent", "https://bitcoincore.org/bin/"],
      {
        encoding: "utf-8",
      }
    );
    const grep = cp.spawn("grep", ["bitcoin-core"], { encoding: "utf-8" });
    //  Piping of `curl` to `grep`
    curl.stdout.pipe(grep.stdin);
    // curl ERRORS
    curl.stderr.on("data", (data) => {
      /** @BUG Why is this logging curl progress data? */
      console.log(data.toString());
    });
    // grep ERRORS
    grep.stderr.on("data", (data) => {
      console.log("STDERRRR2:=>", data, "\n GREP ERROR");
    });
    let buffer = "";
    grep.stdout.on("data", (data) => {
      buffer += data;
      const isoString = buffer.split("\n");
      const final = [];
      isoString.map((item) => {
        const version = {
          ver: "",
        };
        if (item.slice(28, 29) === ".") {
          version.ver = item.slice(9, 31);
          return final.push(version);
        }
        if (item.slice(28, 29) === '"') {
          version.ver = item.slice(9, 28);
          return final.push(version);
        }
        if (item.slice(28, 29) === ">") {
          version.ver = item.slice(9, 27);
          return final.push(version);
        }
        if (item.slice(9, 26) === "") {
          return;
        }
        version.ver = item.slice(9, 29);
        final.push(version);
      });

      for (let i = final.length; i--; ) {
        console.log("Bitcoin Core Versions:", final[i]);
      }

      console.log(`${cyan}FINALLY${reset}: ${final.length}`);

      fs.writeFileSync(
        "./versions.json",
        JSON.stringify(final),
        "utf8",
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });

    grep.stdout.on("close", (data) => {
      console.log("grep finished...", data);
      // process.exit(0);
    });

};

/**
 *
 *
 *
 */

getBitVer();
// module.exports = {getBitVer}
