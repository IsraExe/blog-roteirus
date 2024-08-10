'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { TextField, Button, FormControl, Typography, Box } from '@mui/material';
import dynamic from 'next/dynamic';

const ReactQuillEditor = dynamic(() => import('@/components/Editor'), { ssr: false });

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPending, setIsPending] = useState(false);

  const getContent = (data: any) => setContent(data);

  const handlePreview = () => {
    sessionStorage.setItem('content', content);
    window.open('/preview', '_blank');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const blog = { title, content };

    console.log(blog)

    setIsPending(true);

    // await fetch('http://localhost:3001/blogs', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(blog)
    // })
    setIsPending(false);

    console.log('New blog added successfully');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Navbar title='Novo Post' />
      <Box sx={{ minWidth: '70%', borderRadius: '5px', padding: 2, marginTop: '60px', boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)' }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin='normal'>
            <TextField
              label='Blog title'
              variant='outlined'
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <Typography variant='h6' component='label'>
              Blog body
            </Typography>
            <Box sx={{ height: '30em', border: '1px solid #ccc', borderRadius: 1 }}>
              <ReactQuillEditor getContent={getContent} />
            </Box>
          </FormControl>
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Button variant='contained' onClick={handlePreview}>
              Preview
            </Button>
          </Box>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isPending}
          >
            {isPending ? 'Adding blog...' : 'Add blog'}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Create;
