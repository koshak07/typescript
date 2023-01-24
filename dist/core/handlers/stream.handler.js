"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Streamhandler = void 0;
class Streamhandler {
    constructor(logger) {
        this.logger = logger;
    }
    processOutput(stream) {
        stream.stdout.on("data", (data) => {
            this.logger.log(data.toString());
        });
        stream.stdout.on("data", (data) => {
            this.logger.error(data);
        });
        stream.on("close", () => {
            this.logger.end();
        });
    }
}
exports.Streamhandler = Streamhandler;
