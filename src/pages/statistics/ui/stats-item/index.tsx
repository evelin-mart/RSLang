import React from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';

type StatsItemProps = React.PropsWithChildren & {
  title: string;
  rows: { title: string, value: string | number }[];
}

export const StatsItem = ({ title, rows }: StatsItemProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h5">{title}</Typography>
        {rows.map(({ title, value }, i) => (
          <Box key={i} sx={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: 3,
            alignItems: "flex-end",
            pb: 0.5,
            borderBottom: "dotted 1px #ccc" }}>
            <Typography variant="h6" sx={{
              color: "grey.700",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.2" }}>
              {title}:
            </Typography>
            <Typography component="div" sx={{ color: "info.main", fontSize: "1.2rem", lineHeight: "1" }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}