import React from 'react';
import styles from './styles.module.scss';
import { Box, Link, List, ListItem, Theme, Typography } from '@mui/material';
import { RssLogo } from 'shared/components/rss-logo';
import { githubLinks } from 'shared/constants/team-github-links';

export const Footer = () => {
  return (
    <Box component="footer" className={styles.footer} sx={{bottom: 0, width: 1}}>
      <Typography variant="body2">
        2022
      </Typography>
      <RssLogo />
      <List className={styles.githubLinksList}>
        {githubLinks.map(({ href, text }, i) => (
          <ListItem key={i}>
            <Link href={href} className={styles.githubLink}>{text}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}