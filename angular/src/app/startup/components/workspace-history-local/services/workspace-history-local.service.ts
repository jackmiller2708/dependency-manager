import { BehaviorSubject, map, Observable } from 'rxjs';
import { InterProcessCommunicator } from '@shared/services/IPC/inter-process-communicator.service';
import { WorkspaceHistoryEndpoint } from '@models/app-endpoints';
import { IWorkspaceHistory } from '@interfaces/dtos';
import { WorkspaceHistory } from '@models/WorkspaceHistory.class';
import { Injectable } from '@angular/core';
import { Workspace } from '@models/Workspace.class';
import { List } from 'immutable';

@Injectable()
export class WorkspaceHistoryService {
  private readonly _history: BehaviorSubject<WorkspaceHistory | undefined>;
  readonly history$: Observable<WorkspaceHistory | undefined>

  constructor(private readonly _IPC: InterProcessCommunicator) {
    this._history = new BehaviorSubject<WorkspaceHistory | undefined>(undefined);
    this.history$ = this._history.asObservable();
  }

  openWorkspace(workspace?: Workspace): void {
    this._IPC
      .invoke<Workspace, string>(WorkspaceHistoryEndpoint.SET_LAST_OPENED, workspace)
      .pipe(
        map((json: string): IWorkspaceHistory | undefined => json ? JSON.parse(json) : json),
        map(this._dtoToData)
      )
      .subscribe((history: WorkspaceHistory | undefined): void => this._history.next(history));
  }

  loadLocalHistory(): void {
    this._IPC
      .invoke<void, string>(WorkspaceHistoryEndpoint.LOAD)
      .pipe(
        map((json: string): IWorkspaceHistory | undefined => json ? JSON.parse(json) : json),
        map(this._dtoToData)
      )
      .subscribe((history) => this._history.next(history));
  }

  private _dtoToData(dto: IWorkspaceHistory | undefined): WorkspaceHistory | undefined {
    if (!dto) {
      return dto;
    }

    const { workspaces, lastOpened } = dto;

    const workspaceList = List(workspaces.map((workspace) => new Workspace(workspace)));
    const lastOpenedRec = lastOpened ? new Workspace(lastOpened) : lastOpened;

    return new WorkspaceHistory({
      workspaces: workspaceList,
      lastOpened: lastOpenedRec,
    });
  }
}
