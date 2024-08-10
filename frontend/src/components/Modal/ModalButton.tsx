import { Button, CircularProgress, ButtonProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface ModalButtonProps extends ButtonProps {
  text: string;
  loading?: boolean;
};

export function ModalButton({ text, loading, ...props }: ModalButtonProps) {
  const buttonStyles: SxProps<Theme> = {
    width: '100%',
    borderRadius: '8px',
    px: 3,
    py: 2,
    textTransform: 'none',
    fontWeight: 'bold',
  };

  return (
    <Button
      type='button'
      sx={buttonStyles}
      {...props}
      startIcon={loading ? <CircularProgress size={24} /> : null}
    >
      {loading ? 'Carregando...' : text}
    </Button>
  );
}
