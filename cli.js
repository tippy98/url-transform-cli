const { Command } = require("commander");
const program = new Command();
const api = require('./src/index.js')
program.version("0.0.1");

// TODO: generate file
program
      .command("-g -generate", "针对重新生成 url.js 的需求，目标是生成对应文件。")
      .action((source, destionation) => {
        api.ouputFile(destionation).then(() => {
          console.log('--------⚡️ 文件已生成----------')
        })
        console.log(destionation)
      })

program
      .option("-p -paste", "针对后续添加新 url 的需求，目标是接受参数，自动转换为对应格式，并且放置在剪贴版上。")
      .action((source, destionation) => {
        api.generate(destionation)
        console.log('--------⚡️ 转换完成已放入剪贴版----------')
      })

program.parse(process.argv);