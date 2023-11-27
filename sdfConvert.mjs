import { exec } from "child_process";
import { promises, unlinkSync } from "fs";
import { SDF_DELIMITER } from "./common/constants.mjs";

export async function convertSmiToSdf(smiles, name) {
  const tmpFileName = "xyz.temp.sdf";

  const { readFile } = promises;

  return new Promise((resolve, reject) => {
    exec(`obabel -:"${smiles}" -osdf --gen2D`, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }

      //   if (stderr) {
      //     console.error(`stderr: ${stderr}`);
      //     return;
      //   }
      // let content = "";
      // readFile(tmpFileName, "utf8")
      //   .then((data) => {
      //     content = data;
      //     if (name) {
      //       content = `${name}\n${data}\n${SDF_DELIMITER}\n`;
      //     }
      //     unlinkSync(tmpFileName);
      //     resolve(content);
      //   })
      //   .catch((err) => reject(err));
      resolve(`${name}${stdout}`);
    });
  });
}
