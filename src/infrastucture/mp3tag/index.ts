import NodeID3 from 'node-id3';
import SongInfoData from '../../application/dto/songInfoData';

/**
 * mp3のタグ情報を設定する
 * @param {string} filePath ファイルのパス
 * @param {ISongInfoObj} songInfo 曲の情報
 */
export function attachMp3Tag(filePath: string, songInfo: SongInfoData): void {
  NodeID3.write({
    title: songInfo.Title,
    artist: songInfo.Artist,
  }, filePath);
}
