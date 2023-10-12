import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, WorkspaceRoutingModule],
})
export class WorkspaceModule {}
