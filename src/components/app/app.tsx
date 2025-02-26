import { BrowserRouter } from 'react-router';

import { AppHeader, AppContent } from '@components';
import { BASE_URL } from '../../constants';

import '../../index.css';
import styles from './app.module.css';

const App = () => (
  <BrowserRouter basename={BASE_URL}>
    <div className={styles.app}>
      <AppHeader />
      <AppContent />
    </div>
  </BrowserRouter>
);

export default App;
