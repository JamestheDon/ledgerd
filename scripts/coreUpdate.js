// todo: wget and download latest bitcoin core version.

const latestVer = async function () {
    // JSON modules are experimental.
    // $"node --experimental-json-modules coreInit.js"
    // todo: send to a wget function for download.
    const data = await import("../scripts/versions.json");
    const latestVersion = data.default.length - 1;
    const ver = data.default[latestVersion];
    return ver.ver;
  },

const getVersion = latestVer().then((res) => {
    console.log('versions', res)
})

