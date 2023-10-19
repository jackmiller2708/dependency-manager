import { FileSystemService } from "@services/file-system/file-system.service";
import { IWorkspaceHistory } from "@interfaces/workspace-history.interface";
import { WorkspaceHistory } from "@models/workspace-history.model";
import { Workspace } from "@models/workspace.model";
import { Either } from "@models/monads/either.model";
import { List } from "immutable";
import { join } from "path";
import { IO } from "@models/monads/io.model";

export class WorkspaceHistoryService {
  private readonly _core: WorkspaceHistoryServiceCore;

  constructor() {
    this._core = new WorkspaceHistoryServiceCore();
  }

  getData(): Either<WorkspaceHistory, WorkspaceHistory> {
    return this._core.loadData().run();
  }

  updateAndPersistData(updaterFn: (value: WorkspaceHistory) => Either<WorkspaceHistory, WorkspaceHistory>): Either<WorkspaceHistory, WorkspaceHistory> {
    return this._core
      .loadData()
      .map((output: Either<WorkspaceHistory, WorkspaceHistory>): Either<WorkspaceHistory, WorkspaceHistory> =>
        output
          .chain(updaterFn)
          .chain((data: WorkspaceHistory): Either<WorkspaceHistory, WorkspaceHistory> => this._core.saveData(data).run())
      )
      .run();
  }
}

class WorkspaceHistoryServiceCore {
  private readonly HISTORY_FILE: string;
  private readonly _fs: FileSystemService;

  private get _destinationFilePath(): string {
    return join(this._fs.resourcePath, this.HISTORY_FILE);
  }

  constructor() {
    this.HISTORY_FILE = "workspace.history.json";
    this._fs = new FileSystemService();
  }

  loadData(): IO<Either<WorkspaceHistory, WorkspaceHistory>> {
    const filePath = this._destinationFilePath;

    return this._fs
      .exists(filePath)
      .chain((isExist: boolean): IO<Either<Error, string>> => {
        return isExist
          ? this._fs.readFile(filePath)
          : this._fs.writeFile(filePath, JSON.stringify(new WorkspaceHistory()));
      })
      .map(this._processRawData.bind(this));
  }

  saveData(data: WorkspaceHistory): IO<Either<WorkspaceHistory, WorkspaceHistory>> {
    return this._fs
      .writeFile(this._destinationFilePath, JSON.stringify(data))
      .map(this._processRawData.bind(this));
  }

  private _parseData(json: string): Either<Error, IWorkspaceHistory> {
    try {
      return Either.right(JSON.parse(json));
    } catch (error) {
      return Either.left(error as Error);
    }
  }

  private _rawDataMapper({ workspaces, lastOpened }: IWorkspaceHistory): Either<WorkspaceHistory, WorkspaceHistory> {
    return Either.right<WorkspaceHistory, WorkspaceHistory>(
      new WorkspaceHistory({
        workspaces: List(workspaces.map((workspace) => new Workspace(workspace))),
        lastOpened: lastOpened ? new Workspace(lastOpened) : lastOpened,
      })
    );
  }

  private _processRawData(output: Either<Error, string>): Either<WorkspaceHistory, WorkspaceHistory> {
    return Either.right<WorkspaceHistory, IWorkspaceHistory>(
      output.chain(this._parseData).fold(
        () => new WorkspaceHistory(),
        (wh: IWorkspaceHistory) => wh
      )
    ).chain(this._rawDataMapper);
  }
}
