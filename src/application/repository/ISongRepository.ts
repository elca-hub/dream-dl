import {ISongInfoObj} from './ISongInfoObj';

export interface ISongRepository {
  getSongInfo(id: string): Promise<ISongInfoObj>;

  downloadSong(id: string): Promise<string>;

  set Id(id: string);
  get Id(): string;
}
