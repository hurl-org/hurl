import { readdir } from "fs/promises";

export class Hurl {
  dir: string;

  constructor(dir?: string) {
    this.dir = dir ?? process.cwd();
  }

  async init(): Promise<void> {
    try {
      const contents = await readdir(this.dir);
      console.log(contents);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  generate(): void {
    console.log("generating");
  }
}
