import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  makeStyles
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyle = makeStyles(() => ({
  dialogAction: {
    justifyContent: 'center'
  }
}));

const DialogComponent = ({
  size = false,
  fullWidth = false,
  isOpenDialog,
  setIsOpenDialog,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  title = '',
  content = '',
  titleStyle = {},
  contentStyle = {},
  isFooter = true
}) => {
  const classes = useStyle();

  const handleClose = () => setIsOpenDialog(false);

  return (
    <div>
      <Dialog
        open={isOpenDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsOpenDialog(false)}
        maxWidth={size}
        fullWidth={fullWidth}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={titleStyle}>
          {title}
        </DialogTitle>
        <DialogContent style={contentStyle}>{content}</DialogContent>
        {isFooter && (
          <DialogActions
            classes={{
              root: classes.dialogAction
            }}
          >
            <Button onClick={onCancel ? onCancel : handleClose} color="primary">
              {cancelText}
            </Button>
            <Button onClick={onOk} color="primary" variant="contained">
              {okText}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default DialogComponent;
