const styles = {
  gameContainer: {
    height: 'calc(100% - var(--header-height))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '100%',
  },
  
  answersContainer: {
    display: "flex",
    columnGap: 2,
    justifyContent: "center",
    flexWrap: "wrap",
    mt: 5,
    width: '100%',
  },

  answerButton: {
    fontSize: "1rem",
    textTransform: "none",
    minWidth: "fit-content",
    maxWidth: 200,
  }
}

export default styles;