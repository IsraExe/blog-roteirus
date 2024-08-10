'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

type NavbarProps = {
  title: string
};

const Navbar = ({ title }: NavbarProps) => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box>
          <Button color='inherit' component={Link} href='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} href='/create'>
            Create
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;