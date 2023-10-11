import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppEvent } from '@interfaces/IEvent.interface';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly _appEvents: Subject<AppEvent>;
  readonly appEvents$: Observable<AppEvent>;

  constructor() {
    this._appEvents = new Subject();
    this.appEvents$ = this._appEvents.asObservable();
  }

  emit(event: AppEvent): void {
    this._appEvents.next(event);
  }
}
