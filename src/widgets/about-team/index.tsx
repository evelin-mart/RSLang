import { Typography } from '@mui/material'
import React from 'react'
import { DeveloperCard } from 'shared/components/developer-card'
import { ourTeam } from 'shared/constants/our-team'

export const AboutTeam = () => {
  return (
    <>
      <Typography component={'div'} sx={{width: 1, m: '5vh 0', typography: { xs: 'h6', md: 'h4'}}}>
          Наша команда:
      </Typography>
      <div style={{position: 'relative', display: 'flex', justifyContent: 'space-around', margin: '0 auto', flexWrap: 'wrap', gap: '10px'}}>
        {ourTeam.map(item => <DeveloperCard key={item.name} name={item.name} description={item.description} image={item.image}/>)}
      </div>
    </>
  )
}
