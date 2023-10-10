import { IAppController } from "@interfaces/app-controller.interface";
import { Controller } from "@decorators/controller.decorator";

@Controller("workspace")
export class WorkspaceController implements IAppController {}
