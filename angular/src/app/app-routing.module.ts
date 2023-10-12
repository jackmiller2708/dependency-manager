import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'startup',
    loadChildren: () =>
      import('./startup/startup-routing.module').then(
        (m) => m.StartupRoutingModule
      ),
  },
  {
    path: 'workspace',
    loadChildren: () =>
      import('./workspace/workspace-routing.module').then(
        (m) => m.WorkspaceRoutingModule
      ),
  },
  { path: '**', redirectTo: 'startup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
