#!/usr/bin/env node
  /**
   *  @requires bitcoind
   *  @requires bitcoin-cli
   *  @todo code to start node, checking for sync progress and display results in cli. 
   */
'use strick';
const {cmdPrompt} = require('./interface/main.js')



const main = async () => {
cmdPrompt()
}

main()



