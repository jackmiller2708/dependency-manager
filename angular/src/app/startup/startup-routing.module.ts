import { RouterModule, Routes } from '@angular/router';
import { StartupComponent } from './startup.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: StartupComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupRoutingModule {}
