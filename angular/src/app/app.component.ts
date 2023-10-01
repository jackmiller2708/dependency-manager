import { InterProcessCommunicator } from 'src/shared/services/IPC/inter-process-communicator.service';
import { WorkspaceHistoryEndpoint } from '@models/app-endpoint.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _IPC: InterProcessCommunicator) {}

  ngOnInit(): void {
    this._IPC.invoke(WorkspaceHistoryEndpoint.LOAD).subscribe(console.log);
  }
}
