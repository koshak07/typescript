import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommandExec } from "../../core/executor/command.types";
import { FileService } from "../../core/files/file.service";
import { Streamhandler } from "../../core/handlers/stream.handler";
import { IStreamLogger } from "../../core/handlers/stream.logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.bulder";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();
  constructor(logger: IStreamLogger) {
    super(logger);
  }
  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>("Ширина", "number");
    const heigth = await this.promptService.input<number>("Высота", "number");
    const path = await this.promptService.input<string>(
      "Путь до файла",
      "input"
    );
    const name = await this.promptService.input<string>("Имя", "input");
    return { width, heigth, path, name };
  }
  protected build({
    width,
    heigth,
    path,
    name,
  }: IFfmpegInput): ICommandExecFfmpeg {
    const output = this.fileService.getFilePath(path, name, "mp4");
    const args = new FfmpegBuilder()
      .input(path)
      .setVideoSize(width, heigth)
      .output(output);
    return { command: "ffmpeg", args, output };
  }
  protected spawn({
    output,
    command,
    args,
  }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output);
    return spawn(command, args);
  }
  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const handler = new Streamhandler(logger);
    handler.processOutput(stream);
  }
}
