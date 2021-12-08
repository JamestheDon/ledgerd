/**
 *  @spec This module provides a node operation interface.
 * 
 */
const {nodeExists, start, stop, analyze} = require('../scripts/operations.js')

 // Terminal Coloring 
 const green = '\x1b[32m'
 const yellow = '\x1b[33m'
 const cyan = "\x1b[36m"
 const magenta = "\x1b[35m"
 const Dim = "\x1b[2m"
 const reset = "\x1b[0m" // resets terminal color to white.
 const b = '\u20bf'
 const Blink = "\x1b[5m"
 const _ = "\x1b[4m"

 let exe = false;


    const userInput = (exe) => {
        return new Promise((resolve, reject) => {
            try {
                // Writes to console inital cli choices.
                if (exe === false) {
                process.stdout.write(` \n \n \n ${green}
                /)      /)              /)   
               //  _  _(/ _    _  __  _(/   
              (/__(/_(_(_(_/__(/_/ (_(_(_    
                        .-/                  
                       (_/  ${reset}${yellow}${b}   ${b}  
                  ${b}      ${b}      ${b}   ${b}
                    ${b}  ${b}   ${b}  ${b}
                   ${b}      ${b}    ${b}     ${b}
                 ${b}      ${b}       ${b}    ${b}
                                      ${reset}`)
                process.stdout.write(`${Dim}\n By James Hawkins \n MIT License \n ${reset}`)
                       }
                process.stdout.write(`\n ${b}-------------------------${b} \n | ${green}What do you want to do? ${reset}| \n ${b}-------------------------${b} \n \n 1) Ledger \n 2) bitcoind options \n 3) Check sync prog.\n 4) Config \n 5) Exit Ledgerd \n`)
                process.stdin.resume()
                process.stdin.setEncoding('utf-8')
                let buffer = '';
                process.stdin.on('data', (data) => {
                    
                    buffer += data.trim()
                    resolve( buffer)
                 //   process.stdin.pause() // when to exit or pause?
                })
                // process.stdout.end()
            } catch (error) {
                console.log(error)
            }
    
        })
    } 
    
    const cmdPrompt = () => {
        userInput(exe).then((res) => {
            exe = true
            switch (res) {
                
                case '1':  
                    console.log(`${green}Open Ledger\\${reset}`) 
                    ledgerController() 
                    break;
                case '2': 
                    console.log(`${green}bitcoind options\\${reset}`) 
                    bitcoindController()
                    break;
                case '3':
                    console.log('Checking sync progress now.')
                    analyze()
                    break;
                case '4':
                    console.log('Finding Bitcoin core files...') 
                    
                    break;
                case '5':
                    console.log('Shuting down Ledgerd.') 
                    process.exit(0)
                    break;
                default:
                    // "\x1b[0m" reset terminal color
                    console.log(yellow, "Invalid option. \n" , reset)
                    cmdPrompt()
            }
        }).catch((error) => {
            console.log('This is it!!!', error)
        })
        
    }


    const ledgerInterface = (exe) => {
    
        return new Promise((resolve, reject) => {
            if (exe === false) {
                process.stdout.write(`${cyan}Ledger${reset}`)
            }
            process.stdout.write(`\n a) Balance \n b) Add Account \n c) Add Wallet. \n d) Unlock Wallet \n f) Main Menu \n`)
            process.stdin.resume()
            process.stdin.setEncoding('utf-8')
            let buf = ''
            process.stdin.on('data', (data) => {
                buf += data.trim()
                resolve(buf)
                process.stdin.pause()
            })
        })
    }

    const ledgerController = () => {
        ledgerInterface(exe).then((res) => {
        exe = true;
            switch (res) {
                case 'a':
                    console.log('Showing Balance...')
                    break; // operation 
                case 'b':
                    console.log('Adding Account...')
                    break;
                case 'c':
                    console.log('Adding Wallet...')
                    break;
                case 'd':
                    console.log('Unlocking Wallet...')
                    break;
                case 'e':
                    console.log('Listing Transactions...')
                    break;
                case 'f':
                    console.log('Main Menu...')
                cmdPrompt()
                    break;
                default:
                    console.log(`${red}Invalid Option ${reset}`)
                    ledgerController()

            }
        }).catch((err) => {
            console.log('No, this is it!!', err)
        })
    }

// operation of main interface: #2 "2) bitcoind options"    
// Bitcoin node user interface
const bitcoindInterface = () => {
    return new Promise((resolve, reject) => {
        process.stdout.write(`${cyan}Bitcoin Core Node Operations${reset}`)
        process.stdout.write(`\n a) Start bitcoind \n b) Stop bitcoind \n c) Check for bitcoin-core update. \n d) Unlock Wallet. \n e) Main Menu \n`)
        process.stdin.resume()
        process.stdin.setEncoding('utf-8')
        let buf = ''
        process.stdin.on('data', (data) => {
            buf += data.trim()
            resolve(buf)
           
           // process.stdin.pause()
        })
    })
}

// Bitcoin controller
const bitcoindController = () => {
 bitcoindInterface().then((res) => {
     switch (res) {
        case 'a':
            console.log('Start Bitcoind.')
            start().then((res) => {
                if (res === true) {
                    bitcoindController()
                }
            })
            break;
        case 'b':
            console.log('Shuting down bitcoind.') 
            stop().then((res) => {
                if (res === true) {
                    bitcoindController()
                }
            }) 
            break;
        case 'c':
            console.log('Check for Bitcoin Core updates.')
            break;
        case 'd':
            console.log('Unlock wallet.')
            break;
        
        case 'e':
            console.log('Main Menu...')
            cmdPrompt()
            break;
        default:
            console.log('Invalid Option')
     }
 })
      

}

 //   cmdPrompt()
module.exports = {cmdPrompt}