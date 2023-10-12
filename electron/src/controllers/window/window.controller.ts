import { WindowEndpoint } from "@models/app-endpoint.model";
import { Controller } from "@decorators/controller.decorator";
import { AppService } from "@services/app/app.service";
import { Handler } from "@decorators/handler.decorator";

@Controller("window")
export class WindowController {
  @Handler(WindowEndpoint.MAXIMIZE)
  maximize(): void {
    AppService.window!.maximize();
  }

  @Handler(WindowEndpoint.MINIMIZE)
  minimize(): void {
    AppService.window!.minimize();
  }

  @Handler(WindowEndpoint.CLOSE)
  close(): void {
    AppService.window!.close();
  }

  @Handler(WindowEndpoint.RESTORE)
  restore(): void {
    AppService.window!.restore();
  }
}
