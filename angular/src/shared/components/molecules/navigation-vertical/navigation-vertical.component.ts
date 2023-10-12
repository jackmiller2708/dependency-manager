import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { NavigationItem } from './models/NavigationItem.class';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { List } from 'immutable';

@Component({
  selector: 'app-navigation-vertical',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-vertical.component.html',
  styleUrls: ['./navigation-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationVerticalComponent {
  private _dataSource: List<NavigationItem> | undefined;
  private _activeItemClassNames: List<string>;
  private _itemClassNames: List<string>;

  @HostBinding('class')
  private get _classes(): string[] {
    return ['flex', 'flex-col', 'gap-2'];
  }

  @Input()
  set dataSource(value: List<NavigationItem>) {
    this._dataSource = value;
  }

  get dataSource(): List<NavigationItem> | undefined {
    return this._dataSource;
  }

  @Input()
  set activeItemClassNames(value: string[]) {
    this._activeItemClassNames = List(value);
  }

  get activeItemClassNames(): string[] {
    return this._activeItemClassNames.toArray();
  }

  @Input()
  set itemClassNames(value: string[]) {
    this._itemClassNames = List(value);
  }

  get itemClassNames(): string[] {
    return this._itemClassNames.toArray();
  }

  constructor() {
    this._activeItemClassNames = this._itemClassNames = List();
  }
}
