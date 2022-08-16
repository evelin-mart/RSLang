import React from 'react';
import styles from './styles.module.scss';
import { Box, Link, List, ListItem, Typography } from '@mui/material';
import { RssLogo } from 'widgets/rss-logo';

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
  return (
    <Box component="footer" className={styles.footer} maxWidth="lg">
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