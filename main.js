const fs = require("fs");
const chalk = require("chalk");
const cp = require("child_process");

/**
 *  @requires bitcoind 
 *  @requires bitcoin-cli
 *  @todo handle relative paths for bitcoin-cli commands
 */


const isNodeRunning = () => {
  try {
   // execSync is using a global bitcoin-cli
    const status = cp.execSync("bitcoin-cli uptime", { encoding: "utf8" });
    return true;
  } catch (err) {
    return false;
  }
};

const startNode = () => {
  try {
    const start = cp.execSync("bitcoind -daemon", {encoding: 'utf8'})
    console.log(chalk.greenBright('execSync fired!'), start.toString())
    return true
  } catch (err) {
    console.log(chalk.redBright('Critical error!!!'), err)
    return false
  }
}

 

const Ledger = () => {
  console.log(chalk.magenta("Ledger started!"),'\n');
  const nodeStatus = isNodeRunning();
  if (nodeStatus === false) {
    console.log(chalk.greenBright('NODE RUNNING'),'=', nodeStatus)
   
    startNode();
    console.log(chalk.greenBright('Node starting'))
     // needs a wait period before running isNodeRunning();
      setTimeout(function() {
        const status = isNodeRunning();
        console.log('Node syncing in progress:', status)
      }, 30000)
    
  }
 
};

Ledger()

