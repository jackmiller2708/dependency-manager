import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { CdkConnectedOverlay, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { List } from 'immutable';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  @ViewChild(CdkConnectedOverlay)
  private readonly _overlay!: CdkConnectedOverlay;
  
  private _isShown: boolean;
  private _target: Element | undefined;
  private _positions: List<ConnectedPosition>;

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
  set isShown(value: boolean) {
    this._isShown = value;
  }

  get isShown(): boolean {
    return this._isShown;
  }

  @Input()
  set positions(value: ConnectedPosition[]) {
    this._positions = List(value);
  }

  get positions(): ConnectedPosition[] {
    return this._positions.toArray();
  }

  @Output() 
  outsideClick: EventEmitter<void>;

  constructor() {
    this._isShown = false;
    this._positions = List();

    this.outsideClick = new EventEmitter();
  }

  onAttach(): void {
    if (!this._overlay) {
      return void setTimeout(() => this._overlay.overlayRef.updatePosition());
    }

    this._overlay.overlayRef.updatePosition();
  }
}
