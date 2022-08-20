import React from 'react';
import { Page } from 'pages/page';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { advantages } from 'shared/constants/advanages';

export const MainPage = () => {
  return (
    <Page pageClassName="main" title="Главная">
      <Grid container component="section">
        <Typography sx={{width: 1, m: '5vh 0', typography: { xs: 'h5', md: 'h3'}}}/*  variant="h5" component="h3" */>
          RSLang - удобное приложение для изучения английского языка!
        </Typography>
        <Typography sx={{typography: { xs: 'h6', md: 'h4'}}}/*  variant="h5" component="h3" */>
          Наши преимущества:
        </Typography>

        <div style={{margin: '5vh 0'}}>
          {advantages.map((item, index) => {
            return (
              <Accordion key={index}>
                <AccordionSummary id={`panel${index}-header`} aria-controls={`panel${index}-content`} expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{typography: { xs: 'h6', md: 'h4'}}}>
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{fontSize: { xs: '14px', md: '16px'}}}>
                    {item.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </div>
      </Grid>
      <Grid container component="section">
        <Typography variant="h5" component="h3">
          О команде
        </Typography>
      </Grid>
    </Page>
  )
}

