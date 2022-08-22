export default {
  headerMenu: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    columnGap: 2,
    rowGap: 1.5,
    width: '100%',
  },

  headerMenu_column: {
    flexDirection: 'column',
  },

  headerMenuLink: {
    display: 'block',
    position: 'relative',
    whiteSpace: 'nowrap',

    '&:visited': {
      color: 'inherit',
    }

  },

  headerMenuLink_active: {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -5,
      left: 0,
      width: '100%',
      height: 2,
      backgroundColor: 'primary.contrastText',
    },
  }
};