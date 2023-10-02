import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { Either } from "@models/monads/either.model";
import { app } from "electron";
import { IO } from "@models/monads/io.model";

export class FileSystemService {
  get resourcePath(): string {
    return join(app.isPackaged ? process.resourcesPath : __dirname, "data");
  }

  exists(filePath: string): IO<boolean> {
    return new IO((): boolean => existsSync(filePath));
  }

  readFile(filePath: string): IO<Either<Error, string>> {
    return new IO((): Either<Error, string> => {
      try {
        return Either.right(readFileSync(filePath, { encoding: "utf-8" }));
      } catch (err) {
        return Either.left(err as Error);
      }
    });
  }

  writeFile(filePath: string, data: string): IO<Either<Error, string>> {
    return new IO((): Either<Error, string> => {
      try {
        mkdirSync(dirname(filePath), { recursive: true });
        writeFileSync(filePath, data);

        return Either.right(data);
      } catch (err) {
        return Either.left(err as Error);
      }
    });
  }
}
