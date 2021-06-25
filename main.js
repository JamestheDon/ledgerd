const fs = require("fs");
const chalk = require("chalk");
const cp = require("child_process");
const readline = require("readline");
const { resolve } = require("path");
const { rejects } = require("assert");

/**
 *  @requires bitcoind
 *  @requires bitcoin-cli
 *  @todo handle relative paths for bitcoin-cli commands
 */

const rl = readline.createInterface(process.stdin, process.stdout);

const isNodeRunning = () => {
  try {
    const status = cp.execSync("bitcoin-cli uptime", { encoding: "utf8" });
    return true;
  } catch (err) {
    return false;
  }
};

const startNode = () => {
  try {
    const start = cp.execSync("bitcoind -daemon", { encoding: "utf8" });
    console.log(chalk.magentaBright(start.toString(), "..."));
    return true;
  } catch (err) {
    console.log(chalk.redBright("Critical error!!!"));
    return false;
  }
};

const activeWallet = () => {
  const walletStatus = cp.execSync(`bitcoin-cli ${cmd}`, { encoding: "utf8" });
};

/**
 * @q1
 *  @desc Btc Address intake. 
 * 
 * 
 */
const q1 = () => {
  return new Promise((resolve, reject) => {
    rl.question("Enter Bitcoin address now:", function (answer) {
      console.log("question answer:", answer);
    //  rl.close()
      resolve(answer);
    });
  });
};


/**
 * @q2
 * @desc Wallet mgmt.
 * @todo if ! Wallet, createnwallet, else unlockwallet
 * 
 * 
 */
const q2 = () => {

  return new Promise((resolve, reject) => {
    /** @second question */
    rl.question("Enter new wallet name", function (answer) {
      console.log("question answer:", answer);
      // need to execute ```createwallet``` before \n
      /// address bal's can be searched.
      resolve(answer)
    });
  });
};

const main = async () => {
  /** 
   * @main this is the main prg, creates/unlocks wallet, collects addresses 
   * 
   * */
  console.log(chalk.magenta("Main function comencing:"), "\n");
  // 
  await q1();

  await q2().then((res) => {
    process.stdout.write(res);
  });
    // Must run rl.close() on last question ran.
  rl.close();
};

const Ledger = () => {
  console.log(chalk.magenta("Ledger started!"), "\n");
  /** @desc env checking  */
  const runNodeCheck = () => {
    const nodeStatus = isNodeRunning();
    return nodeStatus;
  };

  if (runNodeCheck() === false) {
    nodeStatus = runNodeCheck();
    console.log(chalk.blue("NODE RUNNING"), "=", nodeStatus);
    startNode();
    console.log(chalk.greenBright("Please Wait..."));
    /** @desc start progress indicator  */
    let n = 0;
    let k = "#";
    const progress = setInterval(function () {
      // this callback will execute every second until we call
      // the clearInterval method
      process.stdout.write(`\rloaded::${chalk.blue(k.repeat(n))}> `);
      n++;
      if (n === 30) {
        /** @todo go ahead and really log the dude out */
        console.log(isNodeRunning());
      main();
        clearInterval(progress);
        // main()
      }
    }, 999);
  }

  if (runNodeCheck() === true) {
    // run if Bitcoin Core aka. ```bitcoind``` is already running.
    console.log("Ledger already running!");
    main();
  }
};

Ledger();
