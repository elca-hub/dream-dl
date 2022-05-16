import {Request, Response, Router} from 'express';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('pages/index');
});

export default router;
