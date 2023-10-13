import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List } from 'immutable';

@Component({
  selector: 'app-display-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss'],
})
export class DisplayListComponent {
  private _dataSource: List<unknown> | undefined;
  private _itemTemplate: TemplateRef<any> | undefined;
  private _direction: 'horizontal' | 'vertical';

  @HostBinding('class')
  private get _classes(): string[] {
    return ['flex', this._direction === 'vertical' ? 'flex-col' : 'flex-row', "gap-2"];
  }

  @Input()
  set dataSource(value: List<unknown>) {
    this._dataSource = value;
  }

  get dataSource(): List<unknown> | undefined {
    return this._dataSource;
  }

  @Input()
  set itemTemplate(value: TemplateRef<any>) {
    this._itemTemplate = value;
  }

  get itemTemplate(): TemplateRef<any> | undefined {
    return this._itemTemplate;
  }

  @Input()
  set direction(value: 'horizontal' | 'vertical') {
    this._direction = value;
  }

  get direction(): 'horizontal' | 'vertical' {
    return this._direction;
  }

  constructor() {
    this._direction = 'vertical';
  }
}
