import { ICommandExec } from "../../core/executor/command.types";

export interface IFfmpegInput {
  width: number;
  heigth: number;
  path: string;
  name: string;
}
export interface ICommandExecFfmpeg extends ICommandExec {
  output: string;
}
