import { WorkspaceHistoryLocalComponent } from './components/workspace-history-local/workspace-history-local.component';
import { WorkspaceHistoryGitComponent } from './components/workspace-history-git/workspace-history-git.component';
import { RouterModule, Routes } from '@angular/router';
import { StartupComponent } from './startup.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: StartupComponent,
    children: [
      { path: 'history-local', component: WorkspaceHistoryLocalComponent },
      { path: 'history-git', component: WorkspaceHistoryGitComponent },
      { path: '**', redirectTo: 'history-local' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupRoutingModule {}
