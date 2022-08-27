const styles = {
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
      sm: 'flex',
    },
    justifyContent: 'flex-end',
    marginRight: 3,
  },

  headerMenuBoxColumn: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    padding: 3,
    pl: 0,
    pr: 0,
    backgroundColor: 'primary.dark',
  },

  menuOpenedStyles: (scrollbarWidth: number) => ({
    position: 'fixed',
    top: 0,
    pr: `${scrollbarWidth}px`,
  })
}

export default styles;