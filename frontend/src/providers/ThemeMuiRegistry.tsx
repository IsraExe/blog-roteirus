'use client';
import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import createCache, { Options } from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({

  palette: {

    primary: {
      main: '#570404',
      light: '#9c1e24',
      dark: '#8b0707'
    },

    secondary: {
      main: '#213E00',
      light: '#08C46B',
      dark: '#029851'
    },

    error: {
      main: '#D44E5A',
    },

    text: {
      primary: '#242424',
      secondary: '#363636'
    }
  },

  typography: {
    fontFamily: [
      'Comfortaa'
    ].join(','),
  }
});

type ThemeRegistryProps = {
  options: Options;
  children: React.ReactNode;
}


export default function ThemeMuiRegistry(props: ThemeRegistryProps) {
  const { options, children } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);

    cache.compat = true;

    const prevInsert = cache.insert;

    let inserted: string[] = [];

    cache.insert = (...args) => {

      const serialized = args[1];

      if (cache.inserted[serialized.name] === undefined) inserted.push(serialized.name);

      return prevInsert(...args);
    };
    const flush = () => {

      const prevInserted = inserted;
      inserted = [];
      return prevInserted;

    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <AppRouterCacheProvider>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
}
