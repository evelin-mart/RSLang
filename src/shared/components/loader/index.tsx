import styles from './styles.module.scss';
import React from 'react';
import { Theme, Box } from '@mui/material';

const ldsDualRing = {
  '&::after': {
    border: ({ palette: { primary }}: Theme) => `6px solid ${primary}`,
    borderColor: ({ palette: { primary }}: Theme) => `${primary} transparent ${primary} transparent`,
  }
}

export const Loader = () => {
  return (
    <Box className={styles.ldsDualRing} sx={ldsDualRing}></Box>
  )
};
