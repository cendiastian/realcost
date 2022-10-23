import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  emptyButton: {
    color: 'white',
    backgroundColor: '#f44336',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '10px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
    "&:hover": {
      color: 'white',
      backgroundColor: '#d32f2f'
    }
  },

  checkoutButton: {
    color: 'white',
    backgroundColor: '#00e676',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '10px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
    "&:hover": {
      color: 'white',
      backgroundColor: '#00c853'
    }
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    marginBottom: '3%',
    width: '100%',
    justifyContent: 'space-between',
  },
}));