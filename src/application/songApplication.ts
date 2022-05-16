import {ISongRepository} from './repository/ISongRepository';
import SongInfoData from './dto/songInfoData';

/**
 * 曲情報のアプリケーションクラス
 */
export default class SongApplication {
  private songRepository: ISongRepository;

  /**
   * コンストラクタ
   * @param {ISongRepository} songRepository - 曲のリポジトリ
   */
  constructor(songRepository: ISongRepository) {
    this.songRepository = songRepository;
  }

  /**
   * youtubeのidから曲情報を取得する
   * @param {string} id youtubeのid
   * @return {Promise<any>} 曲情報
   */
  public async getSongInfo(id: string): Promise<any> {
    const songInfo = await this.songRepository.getSongInfo(id);
    const songInfoData = new SongInfoData(
        id,
        songInfo.title,
        songInfo.artist,
        songInfo.imgUrl,
    );
    return songInfoData;
  }
}
