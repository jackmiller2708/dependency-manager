import { Component, HostBinding, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly _ngDestroy$: Subject<void>;
  private _isWindowActive: boolean;
  private _isWindowMaximize: boolean;
  private _isFullscreen: boolean;

  @HostBinding('class')
  private get _classes(): string[] {
    return ['h-screen', 'w-screen', 'flex', 'flex-col'];
  }

  private get _isWindowMaximized(): boolean {
    return (
      window.innerWidth === screen.availWidth &&
      (window.innerHeight === screen.availHeight || this._isFullscreen)
    );
  }

  get isWindowActive(): boolean {
    return this._isWindowActive;
  }

  get isFullscreen(): boolean {
    return this._isFullscreen;
  }

  get isWindowMaximize(): boolean {
    return this._isWindowMaximize;
  }

  constructor() {
    this._isWindowMaximize = this._isWindowMaximized;
    this._isFullscreen = false;
    this._isWindowActive = document.hasFocus();
    this._ngDestroy$ = new Subject();
  }

  ngOnInit(): void {}
}
