import styles from './styles.module.scss';
import React from 'react';
import { Theme, Box } from '@mui/material';

const defaultSize = 80;

const ldsDualRing = (size?: number) => ({
  width: size || defaultSize,
  height: size || defaultSize,
  '&::after': {
    border: ({ palette: { secondary }}: Theme) => `6px solid ${secondary.main}`,
    borderColor: ({ palette: { secondary }}: Theme) => (
      `${secondary.main} transparent ${secondary.main} transparent`
    ),
  }
});

export const Loader = ({ size }: { size?: number }) => {
  return (
    <Box className={styles.ldsDualRing} sx={ldsDualRing(size)}></Box>
  )
};
