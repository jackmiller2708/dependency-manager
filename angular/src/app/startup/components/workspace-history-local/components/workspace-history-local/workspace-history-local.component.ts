import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
import { WorkspaceHistoryService } from '../../services/workspace-history-local.service';
import { WorkspaceHistory } from '@models/WorkspaceHistory.class';
import { PopupMenuItem } from '@components/molecules/menu-popup/models/PopupMenuItem.class';
import { Workspace } from '@models/Workspace.class';
import { Helper } from '@shared/helper.class';
import { List } from 'immutable';

@Component({
  selector: 'app-workspace-history-local',
  templateUrl: './workspace-history-local.component.html',
  styleUrls: ['./workspace-history-local.component.scss'],
  providers: [WorkspaceHistoryService],
})
export class WorkspaceHistoryLocalComponent implements OnInit, OnDestroy {
  private readonly _ngDestroy: Subject<void>;
  private _workspaces: List<Workspace>;
  private _isReady: boolean;

  @HostBinding('class')
  private get _classes(): string[] {
    return ['flex', 'flex-col', 'gap-4', 'h-full'];
  }

  get workspaces(): List<Workspace> {
    return this._workspaces;
  }

  get isNoPreviouslyOpenedWorkspace(): boolean {
    return this._workspaces.size === 0;
  }

  get isReady(): boolean {
    return this._isReady;
  }

  constructor(
    private readonly _service: WorkspaceHistoryService,
    private readonly _CDR: ChangeDetectorRef
  ) {
    this._isReady = false;
    this._ngDestroy = new Subject();
    this._workspaces = List();
  }

  ngOnInit(): void {
    this._initStores();
    this._service.loadLocalHistory();
  }

  ngOnDestroy(): void {
    this._ngDestroy.next();
  }

  onOpenWorkspaceBtnClick(): void {
    this._service.openWorkspace();
  }


  private async _processDataSource(data: WorkspaceHistory): Promise<void> {
    // if (data.lastOpened) {
    //   this._loaderService.setLoading(true);

    //   await firstValueFrom(
    //     this._loaderService.isLoading$.pipe(
    //       filter((value: boolean): boolean => value),
    //       switchMap(() => this._loaderService.loadAnimationFinish$)
    //     )
    //   );

    //   return void this._navigator.navigate(['/', 'project'], {
    //     queryParams: { workspace: JSON.stringify(data.lastOpened) },
    //   });
    // }

    // this._workspaceItems = List();

    this._workspaces = data.workspaces;
    this._isReady = true;
    this._CDR.detectChanges();
  }

  private _initStores() {
    const _register = Helper.makeObservableRegistrar.call(
      this,
      this._ngDestroy
    );
    const workspaceHistory$ = this._service.history$.pipe(
      filter((data) => !!data)
    ) as Observable<WorkspaceHistory>;

    _register(workspaceHistory$, this._processDataSource);
  }
}
