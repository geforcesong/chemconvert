import { convertSmiToSdf } from "./sdfConvert.mjs";
import fs from "fs";
import readline from "readline";

async function processLineByLine() {
  const fileStream = fs.createReadStream("./files/mytest881.smi");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let fileContent = "";
  let procssingCount = 0;
  for await (const line of rl) {
    console.log("Processing line: ", ++procssingCount);
    if (line.trim()) {
      const [smiles, name] = line.split(" ");
      const sdf = await convertSmiToSdf(smiles, name);
      fileContent += sdf;
    }
  }
  fs.writeFileSync("./files/mytest881.sdf", fileContent);
}

processLineByLine();
