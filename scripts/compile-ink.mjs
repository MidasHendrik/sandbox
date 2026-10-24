import { Compiler } from "inkjs/full";
import { readFileSync, writeFileSync } from "fs";

const source = readFileSync("story/main.ink", "utf8");
const compiler = new Compiler(source);
const story = compiler.Compile();
writeFileSync("story/main.json", story.ToJson());
console.log("Compiled story/main.ink -> story/main.json");
