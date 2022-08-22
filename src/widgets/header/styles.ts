export default {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'var(--header-height)',
  },
  
  headerMenuBox: {
    flexGrow: 1,
    display: {
      xs: 'none',
      md: 'flex'
    },
  },

  headerMenuBoxColumn: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    padding: 3,
    backgroundColor: 'primary.dark',
  }
}