import { genRpcAuthStr } from "../utils/auth.js";

const userAuth = () => {
  //  return new Promise((resolve, reject) => {
  process.stdout.write(
    `\n Time to create rpc credintials...\n Input a username. \n > `
  );
  process.stdin.resume();
  process.stdin.setEncoding("utf-8");

  const auth = [];
  let exe = false;
  if (auth.length <= 0) {
    console.log("imput");
    process.stdin.on("data", (data) => {
      const user = data.trim();
      auth.push(user);
      console.log("user pushed");
      if (auth.length <= 2) {
        process.stdout.write(`\n Password? \n > `);
        process.stdin.on("data", (data) => {
          return auth.push(data.trim());
        });
        console.log("\n herer", auth);
        if (auth.length === 2){
            process.stdin.pause()
        }
      }

    });
  }

  // if (auth != [] && auth.length <= 1)
  //   if (exe === true) {

  //   }

  return auth;
  //  })
};
//   switch (data) {
//       case '':
//           break;
//       case '':
//           break;
//   }

userAuth();
