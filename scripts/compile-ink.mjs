import { Compiler } from "inkjs/full";
import { readFileSync, writeFileSync, readdirSync } from "fs";

const inkFiles = readdirSync("story").filter((name) => name.endsWith(".ink"));

for (const file of inkFiles) {
  const source = readFileSync(`story/${file}`, "utf8");
  const compiler = new Compiler(source);
  const story = compiler.Compile();
  const outFile = file.replace(/\.ink$/, ".json");
  writeFileSync(`story/${outFile}`, story.ToJson());
  console.log(`Compiled story/${file} -> story/${outFile}`);
}
