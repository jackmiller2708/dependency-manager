import { WorkspaceHistoryItemComponent, WorkspaceHistoryLocalComponent } from './components';
import { WorkspaceHistoryService } from './services/workspace-history-local.service';
import { DisplayListComponent } from '@components/molecules/display-list/display-list.component';
import { ButtonComponent } from '@components/atoms/button/button.component';
import { TextComponent } from '@components/atoms/text/text.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [WorkspaceHistoryLocalComponent, WorkspaceHistoryItemComponent],
  imports: [CommonModule, DisplayListComponent, TextComponent, ButtonComponent],
  exports: [WorkspaceHistoryLocalComponent],
  providers: [WorkspaceHistoryService],
})
export class WorkspaceHistoryLocalModule {}
