import { Dialog,  DialogContent } from '@mui/material';

type ModalRootProps = {
  open: boolean;
  children: React.ReactNode;
};

export default function ModalRoot({ open, children }: ModalRootProps) {

  return (
    <Dialog
      open={open}
      maxWidth='sm'
      fullWidth
    >
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}