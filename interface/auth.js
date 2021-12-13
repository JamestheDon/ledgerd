import { genRpcAuthStr } from "../utils/auth.js";
/**
 *  @returns array of of length of 2 with a username & password strings.
 */
 const authInterface = () => {
  return new Promise((resolve, reject) => {
    const auth = [];
    const questions = ["Input a username:", "Input a Password:"];
  //  process.stdout.write('\n\nInput a username:');
    const ask = (i) => {
      process.stdout.write(`\n\n${questions[i]}`);
    };

    process.stdin.on("data", (data) => {
    // todo1: remove spaces; no spaces!
      auth.push(data.toString().trim());

      if (auth.length < questions.length) {
        ask(auth.length);
      } else if (auth.length === 2) {
        resolve(auth);
        process.stdin.pause();
      }
    });
    ask(0);
  });
};

export const rpcAuth = await authInterface().then((res) => {
// dont pass passwords in plain text form.
 // console.log("prototype.auth", res);
  // todo1: normalize input values here.
  const val = genRpcAuthStr(res[0], res[1])
  return val;
}).catch((err) => {
    console.log('Authentication failed', err)
});
//console.log("values:", rpcAuth);
