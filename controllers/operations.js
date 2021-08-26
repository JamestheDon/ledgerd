const cp = require('child_process');
const fs = require('fs');
const { stdout, stderr } = require('process');
// const spawn = require('child_process').spawn;

/**
 *  @spec Run checks for files relating to Bitcoin Core.
 *        after all checks pass startNode. 
 * 
 */
const env = process.platform


const startNode = () => {
    return new Promise((resolve, rej) => {
    if (nodeExists() === true) {
   //  bitcoind()
  nodeStatus()
    }
    
    })
}



// search for related bitcoind files.
// - check for  default Bitcoin dirs.   
// search for processes 'bitcoind'
const nodeExists = () => {
   
    try {
        const config = cp.execSync('find ~/"Library/Application Support/Bitcoin" -name "bitcoin.conf"', {encoding: 'utf-8'})
        // FgGreen = "\x1b[32m"
        console.log("\x1b[32m", config);
        // decode string
        return true
    } catch(error) {
        // FgYellow = "\x1b[33m"
        if (error.status === 1) {
            console.log("\x1b[33m",'~/"Library/Application Support/Bitcoin" directory doesn\'t exist;\n Is Bitcoin Core installed?"')
            return false
        } 
        if ( error.status === 127) {
            console.log('command not found, @todo: find other files related to node.')
            return false
        }
        
    }
}

const searchForPkg = () => {
    // search sys for bitcoin-0.21.0-osx.dmg
}


// returns a strings from debug.log
// this function should be called after a bitcoin node is found on system.
// add input param from a bitcoin dir search.
const analyze = () => {
            try {
    tail = cp.spawn('tail',   ["-f", "/Volumes/Shell1/debug.log"], {encoding: 'utf-8', stdio: 'pipe'});
    const grep = cp.spawn('grep', ["-m", "1",'progress=']);
    
    // errno: -32 "write EPIPE"
    // piping `tail` | `grep` is causing potential race conditions;
    // through broken pipes
    // patch: direct output to /dev/null
    tail.stdout.pipe(grep.stdin);
    grep.stdout.pipe(process.stdin);
    
    // tail err
    tail.stderr.on('data', (data) => {
       console.log('STDERRRR:=>',data, "\n TAIL ERROR")
       process.exit(1)
    })

    // grep err
    grep.stderr.on('data', (data) => {
        console.log('STDERRRR:=>',data, "\n GREP ERROR")
        process.exit(1)
     })

    grep.stdout.on('data', (data) => {
        //sigkill tail
        console.log('RESULTS:', data)
    })

    grep.stdout.on('close', () => {
    console.log('Closing...')
    process.exit(0)
    })
} catch(err) {
    console.log('errrrrr', err)
}
 //  const log = cp.spawn("tail",["-f", "/Volumes/Shell1/debug.log"], { encoding: 'utf-8', stdio: 'pipe'} )
  //  const stream = cp.spawn("grep", ["-e","Shutdown:"], { encoding: 'utf-8', stdio: 'pipe'})
  //  let buff = ''
    // log.stdout.on('data', function(data) {
    //     buff += data
    //        process.stdout.write(buff)
    // })
 //log.stdout.pipe(stream.stdin)
//stream.stdin.pipe(log.stdout)
    // stream.stdin.on('data', function(data) {
    //     buff += data
    //          process.stdout.write(buff)
    //   })

    // stream.stdout.on('data', function(data) {
    //     buff += data
    //     process.stdout.write(buff)
    // })
    

    // log.stdout.on('data', function(data) {
    //       buff += data
    //     process.stdout.write(buff)
        
    //   })
 
      
    
// stream.stdout.on('end', function() {
//         console.log('no more data')
      
//     })
    // try {
       
    //   // const status = cp.execSync("tail debug.log | grep -o 'Shutdown'", {cwd: '/Volumes/Bitcoin',encoding: 'utf-8'})
    //   // status.slice(0, 8). slices out "Shutdown" from log.
    //     console.log('checking debug log...', );
    //     return true
    // } catch (error) {
    //     if (error) {
    //         console.log('ErrorRRRR', error )
    //     }
        
    // }
    // tail debug.log | grep -o "Shutdown" && | grep -o 'progress'

}

// Start 
const start = ( ) => {
    return new Promise((resolve, reject) => {
        cp.exec('bitcoind -daemon', (err, stdout, stderr) => {
            if (err) {
                console.log('ERRRRR', err)
               
            }
            if (stderr) {
                console.log('stdERR:=>', stderr)
            }
            resolve(true)
            console.log('SUCCESS:=>',stdout)        
        })
    })
}

const stop = ( ) => {
    return new Promise((resolve, reject) => {
            cp.exec('bitcoin-cli stop', (err, stdout, stderr) => {
                if (err.code === 1) {
                    console.log('Start bitcoind first!')
                    resolve(true)
                }
                if (stderr) {
                    console.log('Start bitcoind first!')
                    resolve(true)
                }
                resolve(true)
                console.log(stdout)
            })
        
    })
 
}

const bitcoind = () => {
    try {
      const status = cp.execSync('bitcoind -daemon', {encoding: 'utf-8'})
        console.log(typeof status, status);
    } catch (error) {
        if (error.status === 1) {
            console.log('Bitcoin Core already running:', )
        }
        
    }
}

module.exports = {nodeExists, analyze, start, stop}


