import {Request, Response, Router} from 'express';

/* Application */
import SongApplication from '../application/songApplication';

/* Repository */
import SongRepository from '../interface/repository/songRepository';

const songApplication = new SongApplication(new SongRepository());

// eslint-disable-next-line new-cap
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('pages/index');
});

router.get('/dl', async (req: Request, res: Response) => {
  const ytid = req.query.ytid; // youtubeのid
  if (ytid === undefined) {
    res.status(400).send('youtubeのidが指定されていません');
    return;
  }
  const songData = await songApplication.getSongInfo(ytid as string);
  console.log(songData);
  await songApplication.downloadSong(ytid as string);
  res.send('pages/dl');
});

export default router;
