import { WorkspaceHistoryGitComponent, WorkspaceHistoryLocalModule } from './components';
import { NavigationVerticalComponent } from '@components/molecules/navigation-vertical/navigation-vertical.component';
import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [StartupComponent, WorkspaceHistoryGitComponent],
  imports: [
    CommonModule,
    NavigationVerticalComponent,
    StartupRoutingModule,
    WorkspaceHistoryLocalModule,
  ],
})
export class StartupModule {}
