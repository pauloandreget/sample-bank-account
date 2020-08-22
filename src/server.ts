import settings from './config/settings';
import connect from './config/connect';
import app from './app';

connect(settings.MONGO_URL);

app.listen(settings.PORT, () => {
  console.log(`Server is listening on port ${settings.PORT}`);
});
