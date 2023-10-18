import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, ViewChild,   ElementRef, Output } from '@angular/core';
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
export class WorkspaceHistoryItemComponent
  implements IMutableComponent<WorkspaceHistoryItemComponent>
{
  @ViewChild('inputEl')
  private readonly _input!: ElementRef<HTMLInputElement>;

  private _dataSource: Workspace | undefined;
  private _extraMenuOptions: List<PopupMenuItem>;
  private _isEditing: boolean;
  private _isMenuShown: boolean;

  @Input()
  set dataSource(value: Workspace) {
    this._dataSource = this._dataSource ?? value;
  }

  get dataSource(): Workspace | undefined {
    return this._dataSource;
  }

  get isEditing(): boolean {
    return this._isEditing;
  }

  set isMenuShown(value: boolean) {
    this._isMenuShown = value;
  }

  get isMenuShown(): boolean {
    return this._isMenuShown;
  }

  get menuItems(): List<PopupMenuItem> {
    return this._extraMenuOptions;
  }

  @Output()
  readonly remove: EventEmitter<Workspace>;

  @Output()
  readonly rename: EventEmitter<Workspace>;

  constructor(
    private readonly _CDR: ChangeDetectorRef,
    private readonly _process: ProcessService
  ) {
    this._extraMenuOptions = this._initPopupMenuOptions();
    this._isEditing = this._isMenuShown = false;

    this.remove = new EventEmitter();
    this.rename = new EventEmitter();
  }

  setOption(key: keyof WorkspaceHistoryItemComponent, value: WorkspaceHistoryItemComponent[keyof WorkspaceHistoryItemComponent]): void {
    if (key === 'isEditing') {
      this._isEditing = value as boolean;
    }

    this._CDR.detectChanges();
  }

  onDropdownTriggerClick(): void {
    this._isMenuShown = true;
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
    this._CDR.detectChanges();

    this._input.nativeElement.focus();
    this.rename.emit(this._dataSource);
  }

  private _onRemoveOptionClick(): void {
    this.remove.emit(this._dataSource);
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