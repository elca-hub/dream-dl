import {ISongInfoObj} from '../../application/repository/ISongInfoObj';
import {ISongRepository} from '../../application/repository/ISongRepository';

import ytdl from 'ytdl-core';

/**
 * 曲情報のリポジトリクラス
 */
export default class SongRepository implements ISongRepository {
  /**
   * 曲情報を戻す
   * @param {string} id youtubeのid
   * @return {Promise<ISongInfoObj>} 曲情報
   */
  async getSongInfo(id: string): Promise<ISongInfoObj> {
    const data = await ytdl.getInfo(id); // youtubeのデータを取得
    const thumbnails = data.videoDetails.thumbnails; // サムネイル情報
    const songInfo: ISongInfoObj = {
      title: data.videoDetails.title,
      artist: data.videoDetails.author.name,
      imgUrl: thumbnails[thumbnails.length - 1].url,
    };
    return songInfo;
  }
}
