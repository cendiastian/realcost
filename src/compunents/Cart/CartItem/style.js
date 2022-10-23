import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cartActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  deleteIcon: {
    color: '#ff3d00',
    cursor: 'pointer'
  }
}));