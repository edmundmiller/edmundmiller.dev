import { Runtime } from 'foldkit';
import '../styles/global.css';
import '../styles/prose.css';
import '../styles/logo.css';
import { Message, Model, init, subscriptions, update } from './model';
import { view } from './view';
import { installAnalytics } from './analytics';

const application = Runtime.makeApplication({
  Model,
  init,
  update,
  view,
  subscriptions,
  container: document.getElementById('root'),
  routing: {
    onUrlRequest: (request) => Message.ClickedLink({ request }),
    onUrlChange: (url) => Message.ChangedUrl({ url }),
  },
});

Runtime.hydrate(application);
installAnalytics();
