import { WorkspaceHistoryEndpoint } from "@models/app-endpoint.model";
import { WorkspaceHistoryService } from "./workspace-history.service";
import { WorkspaceHistory } from "@models/workspace-history.model";
import { IAppController } from "@interfaces/app-controller.interface";
import { Controller } from "@decorators/controller.decorator";
import { Handler } from "@decorators/handler.decorator";

@Controller('workspace-history')
export class WorkspaceHistoryController implements IAppController {
  private readonly _service: WorkspaceHistoryService;

  constructor() {
    this._service = new WorkspaceHistoryService();
  }

  @Handler(WorkspaceHistoryEndpoint.LOAD)
  loadHistory(): string {
    const unwrap = (history: WorkspaceHistory): WorkspaceHistory => history;

    return JSON.stringify(this._service.getData().fold(unwrap, unwrap));
  }
}
