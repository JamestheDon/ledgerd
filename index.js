#!/usr/bin/env node
  /**
   *  @requires bitcoind
   *  @requires bitcoin-cli
   *  
   */
'use strick';
const {cmdPrompt} = require('./interface/main.js')



const main = async () => {
cmdPrompt()
}

main()



