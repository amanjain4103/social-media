import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MyAlert(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
          props.error
          ?
          (
            <Alert severity="error">{props.message}</Alert>
          )
          :
          (
            <Alert severity="success">{props.message}</Alert>
          )
      }
    </div>
  );
}
