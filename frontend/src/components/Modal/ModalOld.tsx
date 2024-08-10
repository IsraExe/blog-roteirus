import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Modal = ({ handleSubmit, closeModal, icon, title, information, open }: any) => {
  return (
    <Dialog open={open} onClose={closeModal} fullWidth>
      <DialogTitle>
        <Typography variant="h6">{title || 'Deseja atualizar este artigo?'}</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={closeModal}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{information}</Typography>
        {icon && React.cloneElement(icon, { style: { width: '15em' } })}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
