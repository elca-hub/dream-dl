import {ISongInfoObj} from './ISongInfoObj';

export interface ISongRepository {
  getSongInfo(id: string): Promise<ISongInfoObj>;
}
