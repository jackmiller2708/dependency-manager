import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { PopupComponent } from './../../atoms/popup/popup.component';
import { TextComponent } from '@components/atoms/text/text.component';
import { PopupMenuItem } from './models/popup-menu-item.model';
import { IconComponent } from '@components/atoms/icon/icon.component';
import { CommonModule } from '@angular/common';
import { List } from 'immutable';

@Component({
  selector: 'app-menu-popup',
  standalone: true,
  imports: [CommonModule, PopupComponent, IconComponent, TextComponent],
  templateUrl: './menu-popup.component.html',
  styleUrls: ['./menu-popup.component.scss'],
})
export class MenuPopupComponent {
  private _dropdownPosition: List<ConnectedPosition>;
  private _isShown: boolean;
  private _dataSource: List<PopupMenuItem> | undefined;
  private _target: Element | undefined;

  @HostBinding('class')
  private get _classes(): string[] {
    return ['hidden'];
  }

  @Input()
  set target(value: Element | undefined) {
    this._target = value;
  }

  get target(): Element | undefined {
    return this._target;
  }

  @Input()
  set dataSource(value: List<PopupMenuItem> | undefined) {
    this._dataSource = value;
  }

  get dataSource(): List<PopupMenuItem> | undefined {
    return this._dataSource;
  }

  @Input()
  set isShown(value: boolean) {
    this._isShown = value;
  }

  get isShown(): boolean {
    return this._isShown;
  }

  @Input()
  set dropdownPositions(value: List<ConnectedPosition>) {
    this._dropdownPosition = value;
  }

  get dropdownPositions(): ConnectedPosition[] {
    return this._dropdownPosition.toArray();
  }

  @Output()
  isShownChange: EventEmitter<boolean>;

  constructor() {
    this._isShown = false;

    this._dropdownPosition = List([
      { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
      { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
    ]);

    this.isShownChange = new EventEmitter();
  }

  onItemClick(handlerFn: () => void): void {
    handlerFn();
    this.isShownChange.emit(false);
  }
}
