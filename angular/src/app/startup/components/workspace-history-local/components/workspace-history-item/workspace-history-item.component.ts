import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IMutableComponent } from '@interfaces/IMutableComponent.interface';
import { ProcessService } from '@shared/services/process/process.service';
import { PopupMenuItem } from '@components/molecules/menu-popup/models/PopupMenuItem.class';
import { Workspace } from '@models/Workspace.class';
import { List } from 'immutable';

@Component({
  selector: 'app-workspace-history-item',
  templateUrl: './workspace-history-item.component.html',
  styleUrls: ['./workspace-history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceHistoryItemComponent implements IMutableComponent<WorkspaceHistoryItemComponent> {
  @ViewChild('inputEl')
  private readonly _input!: ElementRef<HTMLInputElement>;

  private _dataSource: Workspace | undefined;
  private _extraMenuOptions: List<PopupMenuItem>;
  private _isEditing: boolean;

  @Input()
  set dataSource(value: Workspace) {
    this._dataSource = value;
  }

  get dataSource(): Workspace | undefined {
    return this._dataSource;
  }

  get isEditing(): boolean {
    return this._isEditing;
  }

  readonly itemRemove: EventEmitter<Workspace>;
  readonly itemRename: EventEmitter<Workspace>;

  constructor(
    private readonly _CDR: ChangeDetectorRef,
    private readonly _process: ProcessService
  ) {
    this._extraMenuOptions = this._initPopupMenuOptions();
    this._isEditing = false;

    this.itemRemove = new EventEmitter();
    this.itemRename = new EventEmitter();
  }

  setOption(key: keyof WorkspaceHistoryItemComponent, value: WorkspaceHistoryItemComponent[keyof WorkspaceHistoryItemComponent]): void {
    if (key === 'isEditing') {
      this._isEditing = value as boolean;
    }

    this._CDR.detectChanges();
  }

  private _onShowInExplrOptionClick(): void {
    this._process
      .execute('start', ['""', `"${this._dataSource?.path}"`], { shell: true })
      .subscribe();
  }

  private _onCopyPathOptionClick(): void {
    this._process
      .execute('echo|set', ['/p', '=', `"${this._dataSource?.path}"`, '|', 'clip'], { shell: true })
      .subscribe();
  }

  private _onRenameMenuOptionClick(): void {
    this._isEditing = true;
    this._input.nativeElement.focus();

    this.itemRename.emit(this._dataSource);
  }

  private _onRemoveOptionClick(): void {
    
  }

  private _initPopupMenuOptions(): List<PopupMenuItem> {
    return List([
      new PopupMenuItem({
        content: 'Show in Explorer',
        onClick: this._onShowInExplrOptionClick.bind(this),
      }),
      new PopupMenuItem({
        content: 'Copy path',
        onClick: this._onCopyPathOptionClick.bind(this),
      }),
      new PopupMenuItem({ separator: true }),
      new PopupMenuItem({
        content: 'Rename...',
        onClick: this._onRenameMenuOptionClick.bind(this),
      }),
      new PopupMenuItem({
        content: 'Remove from Recents...',
        className: 'font-medium text-red-500 hover:!bg-red-100',
        onClick: this._onRemoveOptionClick.bind(this),
      }),
    ]);
  }
}
