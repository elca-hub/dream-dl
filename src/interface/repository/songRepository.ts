import {ISongInfoObj} from '../../application/repository/ISongInfoObj';
import {ISongRepository} from '../../application/repository/ISongRepository';

import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

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

  /**
   *
   *
   * @param {string} id
   * @return {*}  {Promise<any>}
   * @memberof SongRepository
   */
  async downloadSong(id: string): Promise<any> {
    const fileName = `${id}.mp3`;
    const filePath = path.join(__dirname, '../../../downloads', fileName);
    const fileUrl = 'localhost:8080/downloads/';
    const stream = ytdl(`https://www.youtube.com/watch?v=${id}`, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    const proc = ffmpeg(stream);

    return new Promise((resolve, reject) => {
      proc
          .on('error', (err) => {
            reject(err);
          })
          .on('end', () => {
            resolve(fileUrl);
          })
          .save(filePath);
    });
  }
}
