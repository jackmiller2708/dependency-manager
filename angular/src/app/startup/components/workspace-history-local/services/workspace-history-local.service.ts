import { InterProcessCommunicator } from '@shared/services/IPC/inter-process-communicator.service';
import { WorkspaceHistoryEndpoint } from '@models/app-endpoints';
import { IWorkspaceHistory } from '@interfaces/dtos';
import { WorkspaceHistory } from '@models/WorkspaceHistory.class';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  openWorkspace(): void {
    this._IPC
      .invoke<void, string>(WorkspaceHistoryEndpoint.SET_LAST_OPENED)
      .pipe(
        map((json: string) => JSON.parse(json)),
        map(this._dtoToData)
      )
      .subscribe((history) => this._history.next(history));
  }

  loadLocalHistory(): void {
    this._IPC
      .invoke<void, string>(WorkspaceHistoryEndpoint.LOAD)
      .pipe(
        map((json: string) => JSON.parse(json)),
        map(this._dtoToData)
      )
      .subscribe((history) => this._history.next(history));
  }

  private _dtoToData(dto: IWorkspaceHistory): WorkspaceHistory {
    const { workspaces, lastOpened } = dto;

    const workspaceList = List(workspaces.map((workspace) => new Workspace(workspace)));
    const lastOpenedRec = lastOpened ? new Workspace(lastOpened) : lastOpened;

    return new WorkspaceHistory({
      workspaces: workspaceList,
      lastOpened: lastOpenedRec,
    });
  }
}
