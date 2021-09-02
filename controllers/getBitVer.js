"use strict";
const cp = require("child_process");
const fs = require("fs");
const { version } = require("process");

const reset = "\x1b[0m";
const cyan = "\x1b[36m";

/**
 *  @desc this module uses sys cmds `curl` & `grep` to retreive \n
 *        bitcoin core binary releases from bitcoincore.org and Write found versions to database.
 * 
 *        Compare versions to btc-core thats installed to found versions.
 *  @TODO Map though versions.json to determine most recent version.
 *  
 *  @TODO create new `curl` target url for downloading binary pkgs for updates.
 * 
 */

const getBitVer = () => {
  const regeex = ".......-....-d.d.d";
  //.......\-....\-\(\d\+\.\)\?\(\d+\.\)\?\(\*|\d\+\)$
  try {
    const curl = cp.spawn("curl", ["https://bitcoincore.org/bin/"], {
      encoding: "utf-8",
    });
    const grep = cp.spawn("grep", ["bitcoin-core"], { encoding: "utf-8" });

    //  Pipe curl data to grep.
    curl.stdout.pipe(grep.stdin);

    //  outputs to terminal
    //  grep.stdout.pipe(process.stdin);

    //   bug, function is receiving pkg details data from `curl`,
    //   which is non-erring data.
    curl.stderr.on("data", (err) => {
      console.log(
        "STDERRRR1:=>",
        err.toString(),
        "Is the `curl` cmd installed?"
      );
    });

    // grep err
    grep.stderr.on("data", (data) => {
      console.log("STDERRRR2:=>", data, "\n GREP ERROR");
    });

    let buffer = "";
    grep.stdout.on("data", (data) => {
      buffer += data;
      const isoString = buffer.split("\n");

      let versions = "";
      isoString.map((item) => {
        console.log(`${cyan}Found versions:${reset}`, item.slice(9, 28));
        versions += item.slice(9, 28) + ",";
      });
      const content = versions.split(",");
      const currVer = console.log(versions.split(","));
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


getBitVer();
// module.exports = {getBitVer}
