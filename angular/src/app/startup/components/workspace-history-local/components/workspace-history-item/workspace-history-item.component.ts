import { Component, Input } from '@angular/core';
import { Workspace } from '@models/Workspace.class';

@Component({
  selector: 'app-workspace-history-item',
  templateUrl: './workspace-history-item.component.html',
  styleUrls: ['./workspace-history-item.component.scss'],
})
export class WorkspaceHistoryItemComponent {
  private _dataSource: Workspace | undefined;

  @Input()
  set dataSource(value: Workspace) {
    this._dataSource = value;
  }

  get dataSource(): Workspace | undefined {
    return this._dataSource;
  }
}
