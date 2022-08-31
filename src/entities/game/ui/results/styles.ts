import { Theme } from '@mui/material';

const styles = {
  answersRow: {
    display: 'flex',
    columnGap: 1,
    alignItems: 'center',
    fontSize: '1rem'
  },

  wordsList: {
    display: 'flex', 
    flexDirection: 'column', 
    rowGap: 1, 
    height: 300, 
    overflow: 'auto',
    
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: ({ palette }: Theme) => palette.grey[200],
    },
    '&::-webkit-scrollbar-thumb': {
      background: ({ palette }: Theme) => palette.secondary.light,
      borderRadius: '2px'
    }
  },

  playButton: {
    p: 0, 
    mr: 1, 
    color: "info.light", 
    "&:hover": { color: "grey.700" },
  }
}

export default styles;