import { genRpcAuthStr } from "../utils/auth.js";
/**
 *  @returns array of of length of 2 with a username & password strings.
 */
 const questions = ["Username?", "Password?"];
 const auth = [];
 
 const ask = (i) => {
   process.stdout.write(`\n\n${questions[i]} >`);
 }
 
 process.stdin.on("data", (data) => {
   auth.push(data.toString().trim());
   if (auth.length < questions.length) {
     ask(auth.length);
   } else {
     process.exit();
   }
 });
 
 process.on("exit", function () {
 //   process.stdout.write(
 //     `\n\n${auth[1]}${auth[0]}, ${auth[2]}\n\n`
 //   );
 
 });
 ask(0);
 
