import { EMPTY, Observable, from } from 'rxjs';
import { ipcRenderer } from 'electron';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InterProcessCommunicator {
  private readonly _ipcRenderer: typeof ipcRenderer | undefined;

  constructor() {
    this._ipcRenderer = window.require('electron').ipcRenderer;
  }

  invoke<P = unknown, T = unknown>(channel: string, args?: P): Observable<T> {
    const params = args ? JSON.stringify(args) : args;

    return this._ipcRenderer
      ? from(this._ipcRenderer.invoke(channel, params))
      : EMPTY;
  }
}
