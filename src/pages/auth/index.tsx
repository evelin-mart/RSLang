import { Page } from 'pages/page';
import { PAGES } from '../../shared/components/constants';

export const AuthPage = () => {
  return (
    <Page pageName={PAGES.AUTH} title='Авторизация'>
      Форма авторизации
    </Page>
  );
};
