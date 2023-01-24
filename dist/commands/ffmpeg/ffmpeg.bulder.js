"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegBuilder = void 0;
class FfmpegBuilder {
    constructor() {
        this.options = new Map();
        this.options.set("-c:v", "libx264");
    }
    input(inputPath) {
        this.inputPath = inputPath;
        return this;
    }
    setVideoSize(width, heigth) {
        this.options.set("-s", `${width}x${heigth}`);
        return this;
    }
    output(outputPath) {
        if (!this.inputPath) {
            throw new Error("Не задан параметр Input");
        }
        const args = ["-i", this.inputPath];
        this.options.forEach((value, key) => {
            args.push(key);
            args.push(value);
        });
        args.push(outputPath);
        return args;
    }
}
exports.FfmpegBuilder = FfmpegBuilder;
