import styles from './styles.module.scss';
import React from 'react';
import { Theme, Box } from '@mui/material';

const ldsDualRing = {
  '&::after': {
    border: ({ palette: { primary }}: Theme) => `6px solid ${primary.main}`,
    borderColor: ({ palette: { primary }}: Theme) => (
      `${primary.main} transparent ${primary.main} transparent`
    ),
  }
}

export const Loader = () => {
  return (
    <Box className={styles.ldsDualRing} sx={ldsDualRing}></Box>
  )
};
