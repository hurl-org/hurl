const Reset = "\x1b[0m";
// const Bright = "\x1b[1m";
// const Dim = "\x1b[2m";
// const Underscore = "\x1b[4m";
// const Blink = "\x1b[5m";
// const Reverse = "\x1b[7m";
// const Hidden = "\x1b[8m";

// const FgBlack = "\x1b[30m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
// const FgBlue = "\x1b[34m";
// const FgMagenta = "\x1b[35m";
// const FgCyan = "\x1b[36m";
// const FgWhite = "\x1b[37m";

// const BgBlack = "\x1b[40m";
// const BgRed = "\x1b[41m";
// const BgGreen = "\x1b[42m";
// const BgYellow = "\x1b[43m";
// const BgBlue = "\x1b[44m";
// const BgMagenta = "\x1b[45m";
// const BgCyan = "\x1b[46m";
// const BgWhite = "\x1b[47m";

const logger = {
  green: (str: string) => {
    return FgGreen + str + Reset;
  },
  red: (str: string) => {
    return FgRed + str + Reset;
  },
  yellow: (str: string) => {
    return FgYellow + str + Reset;
  },
  success: (str: string, extra = "") => {
    const colored = logger.green(str) + " " + extra;
    logger.line(colored);
  },
  error: (err: Error) => {
    logger.line(logger.red("Hurl ERROR"));
    console.error(err);
  },
  warn: (warning: string) => {
    logger.line(logger.yellow(warning), console.warn);
  },
  line: (str: string, func = console.log) => {
    func(`\n${str}`);
  },
};

export default logger;
