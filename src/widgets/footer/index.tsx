import React from 'react';
import styles from './styles.module.scss';
import { Box, Link, List, ListItem, Theme, Typography } from '@mui/material';
import { RssLogo } from 'shared/components/rss-logo';

const githubLinks = [
  { 
    href: '#', 
    text: 'GithubLink1'
  },
  { 
    href: '#', 
    text: 'GithubLink2'
  },
  { 
    href: '#', 
    text: 'GithubLink3'
  },
];

export const Footer = () => {
  const footerStyles = {
    left: (theme: Theme) => theme.spacing(3),
    bottom: 0,
    width: (theme: Theme) => `calc(100% - ${theme.spacing(6)})`,
  }
  return (
    <Box component="footer" className={styles.footer} sx={footerStyles}>
      <Typography variant="body2">
        2022
      </Typography>
      <RssLogo />
      <List className={styles.githubLinksList}>
        {githubLinks.map(({ href, text }, i) => (
          <ListItem key={i}>
            <Link href={href}>{text}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}