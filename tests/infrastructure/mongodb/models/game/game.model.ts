export class Game {
  readonly gameId: string;
  readonly name: string;
  readonly ultraCloudId?: string;
  readonly isDeleted?: boolean;
  readonly type?: string;

  constructor(gameId: string, name: string, ultraCloudId?: string, isDeleted?: boolean, type?: string) {
    this.gameId = gameId;
    this.name = name;
    this.ultraCloudId = ultraCloudId;
    this.isDeleted = isDeleted;
    this.type = type;
  }
}

