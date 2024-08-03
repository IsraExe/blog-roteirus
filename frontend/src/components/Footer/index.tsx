import { Container, Typography, Link } from '@mui/material';
import styles from './footer.module.css';

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <Container className={styles['footer-container']}>
      <Typography variant='body2' color='text.secondary' align='center'>
        Copyright © <Link color='inherit' href='#'> Roteirus </Link> {currentYear}.
      </Typography>
    </Container>
  );
  
};