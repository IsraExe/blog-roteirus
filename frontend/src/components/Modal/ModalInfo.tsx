import { Box, Typography, DialogTitle } from '@mui/material';
import { ElementType } from 'react';

type ModalInfoProps = {
  title: string;
  information: string;
  icon: ElementType;
};

export const ModalInfo = ({ title, information, icon: Icon }: ModalInfoProps) => {
  return (
    <Box textAlign='center'>
      <Box>
        <Icon sx={{ fontSize: 40, color: 'green.600' }} />
      </Box>
      <Box>
        <DialogTitle>
          {title}
        </DialogTitle>
        <Typography variant='body2' color='text.secondary' mb={2}>
          {information}
        </Typography>
      </Box>
    </Box>
  );
};
