/**
 * ダウンロード対象の曲情報を表すモデル
 */
export default class SongModel {
  private id: string;
  private title: string;
  private artist: string;
  private imgUrl: string;

  /**
   * コンストラクタ
   * @param {number} id - youtubeのid
   * @param {string} title - 曲名
   * @param {string} artist - アーティスト名
   * @param {string} imgUrl - 曲のサムネイル画像のURL
   */
  constructor(id: string, title: string, artist: string, imgUrl: string) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.imgUrl = imgUrl;
  }
}
