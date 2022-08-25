import { Box, List, ListItem } from '@mui/material';
import { AggregatedWord } from 'shared/api/users-aggregated-words';

type WordsListProps = {
  correctWords: AggregatedWord[];
  failedWords: AggregatedWord[];
}

export const ResultsWordsList = ({ correctWords, failedWords }: WordsListProps) => {
  
  const correctListItems = correctWords.map((word) => {
    return (
      <ListItem 
        key={word.id} 
        sx={{ color: "success.light" }}>
        {word.word} - {word.wordTranslate}
      </ListItem>
    );
  });

  const failedListItems = failedWords.map((word) => {
    return (
      <ListItem 
        key={word.id} 
        sx={{ color: "error.light" }}>
        {word.word} - {word.wordTranslate}
      </ListItem>
    );
  });
    
  return (
    <Box sx={{ height: 200, overflowY: "auto", pt: 1, pb: 1, bgcolor: "grey.50" }}>
      <List>
        {failedListItems}
        {correctListItems}          
      </List>
    </Box>
  )
}
