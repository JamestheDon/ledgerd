// import { genRpcAuthStr } from "../utils/auth.js";
/**
 *  @returns array of of length of 2 with a username & password strings.
 */
 export const authInterface = () => {
    return new Promise((resolve, reject) => {
      const auth = [];
      const questions = ["Username?", "Password?"];
  
      const ask = (i) => {
        process.stdout.write(`\n\n${questions[i]} > `);
      };
  
      process.stdin.on("data", (data) => {
        auth.push(data.toString().trim());
  
        if (auth.length < questions.length) {
          ask(auth.length);
        } else if (auth.length === 2) {
          resolve(auth);
          process.stdin.pause()
        } 
      });
      ask(0);
    });
  };
