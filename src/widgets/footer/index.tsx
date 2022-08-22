import styles from './styles.module.scss';
import { Link, List, ListItem, Stack, Typography } from '@mui/material';
import { RssLogo } from 'shared/components/rss-logo';
import { githubLinks } from 'shared/constants/team-github-links';
import classNames from 'classnames';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={classNames('container', styles.wrapper)}>
        <Stack direction='column' spacing={1}>
          <Typography variant='body1' className={styles.description}>
            © 2022 RSLang
          </Typography>
          <Stack direction='row' spacing={1} sx={{ 'margin-top': 0 }}>
            <a
              href='https://github.com/Color-zebra/RSLang/tree/main'
              target='_blank'
              rel='noreferrer'
              title='source code'
            >
              <div className={styles.github}></div>
            </a>
            <a
              href='https://www.youtube.com/'
              target='_blank'
              rel='noreferrer'
              title='presentation'
            >
              <div className={styles.youtube}></div>
            </a>
          </Stack>
        </Stack>
        <List className={styles.githubLinksList}>
          {githubLinks.map(({ href, text }, i) => (
            <ListItem key={i}>
              <Link href={href} target='_blank' rel='noreferrer'>
                {text}
              </Link>
            </ListItem>
          ))}
        </List>
        <RssLogo />
      </div>
    </div>
  );
};
