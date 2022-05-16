import {Request, Response, Router, NextFunction} from 'express';
import fs from 'fs';
import path from 'path';

/* Application */
import SongApplication from '../application/songApplication';

/* Repository */
import SongRepository from '../interface/repository/songRepository';

/* DTO */
import SongInfoData from '../application/dto/songInfoData';

const songApplication = new SongApplication(new SongRepository());

// eslint-disable-next-line new-cap
const router = Router();

const initId = (req: Request, res: Response, next: NextFunction) => {
  const id = songApplication.getID();
  if (id) {
    const fileName = `${id}.mp3`;
    const filePath = path.join(__dirname, '../../downloads', fileName);
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      // ファイルを削除
      fs.unlinkSync(filePath);
      songApplication.saveId('');
    }
  }
  next();
};

router.use(initId);

router.get('/', (req: Request, res: Response) => {
  res.render('pages/index');
});

router.get('/preview', async (req: Request, res: Response) => {
  const url = req.query.url as string;
  if (url === undefined) {
    res.status(400).send('youtubeのidが指定されていません');
    return;
  }
  // urlからyoutubeのidを取得する
  const ytid = url.split('v=')[1];
  const songData: SongInfoData = await songApplication.getSongInfo(
    ytid as string,
  );
  songApplication.saveId(songData.Id);
  res.render('pages/preview', {songData});
});

router.post('/download', async (req: Request, res: Response) => {
  const id = songApplication.getID();

  if (id === '') return res.redirect('/');

  const sd = await songApplication.getSongInfo(id);
  const dlPath = await songApplication.downloadSong(id);
  return res.download(dlPath, `${sd.Title}.mp3`);
});

export default router;
