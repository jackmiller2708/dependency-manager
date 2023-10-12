import { ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { InterProcessCommunicator } from '@shared/services/IPC/inter-process-communicator.service';
import { WindowEndpoint } from '@models/app-endpoints';
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

  constructor(
    private readonly _IPC: InterProcessCommunicator,
    private readonly _CDR: ChangeDetectorRef
  ) {
    this._isWindowMaximize = this._isWindowMaximized;
    this._isFullscreen = false;
    this._isWindowActive = document.hasFocus();
    this._ngDestroy$ = new Subject();
  }

  ngOnInit(): void {}

  onWindowCommandExecute(command: WindowEndpoint): void {
    this._isWindowMaximize = command === WindowEndpoint.MAXIMIZE;

    this._IPC.invoke(command);
    this._CDR.detectChanges();
  }
}
