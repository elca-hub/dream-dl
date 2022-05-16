import router from './router';

import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
