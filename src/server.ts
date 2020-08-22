import settings from './config/settings';
import app from './app';

app.listen(settings.PORT, () => {
  console.log(`Server is listening on port ${settings.PORT}`);
});
