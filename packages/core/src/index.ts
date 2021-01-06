export class Hurl {
  dir: string;

  constructor(dir?: string) {
    this.dir = dir ?? process.cwd();
  }

  init() {
    console.log("initializing");
  }

  generate() {
    console.log("generating");
  }
}
