const { methodsMap } = require("./config");
const exec = require('child_process').exec;
const file = require('fs')

const upperFirst = (string) => {
  if (!string) {
    return ''
  }
  return string[0].toUpperCase() + string.substring(1)
};

const generateKey = (url) => {
  let key = "";
  let keyArray = url.match(/(?<={.*Key}\/)(.*)/)[0].split(/-|\//);
  const LEN = keyArray.length - 1;
  key = keyArray[LEN];
  for (let index = 0; index < LEN; ++index) {
    key += upperFirst(keyArray[index]);
  }
  return key;
};

const copyToClipboard = (text, func) => {
  let tempFile = "tempFile.txt";
  let command = `clip < ${tempFile}`
  file.writeFileSync(tempFile, text);
  let cmdFile = 'copy.bat';
  file.writeFileSync(cmdFile, command);
  exec(cmdFile, (err, stdout, stderr) => {
    if(err || stderr){
      console.log(err, stderr)
      return;
    }
    file.unlinkSync(cmdFile)
    file.unlinkSync(tempFile)
    func(text, stdout)
  })
}

module.exports.generate = (urlList) => {
  // step1: 处理url
  let result = {};
  urlList.map((url) => {
    const key = generateKey(url);
    const type = url.match(/(?=[^\/]*$).+?$/i)[0];
    if (!result[key]) {
      result[key] = {
        url,
        method: methodsMap[type],
      };
    }
  });
  // step2: 生成对应的 json stringify
  result = JSON.stringify(result)
  result = result.substring(1, result.length - 1);
  result = result.replace(/"(\w+)"\s*:/g, "$1:")
  // step3: 复制到剪贴版
  copyToClipboard(result, () => {
      console.log(result)
  })
};
