import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

// https://astro.build/config
export default defineConfig({
  site: 'https://0xph03n1x.github.io',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'Mihail Lazarov',
      openGraph: {
        home: {
          title: 'Mihail Lazarov',
          description: 'Mihail Lazarov\'s personal blog.'
        },
        blog: {
          title: 'Blog',
          description: 'News and guides.'
        },
        projects: {
          title: 'Projects',
          description: 'Personal projects.'
        }
      },
      // giscus: {
      //   repository: 'louisescher/spectre',
      //   repositoryId: 'R_kgDONjm3ig',
      //   category: 'General',
      //   categoryId: 'DIC_kwDONjm3is4ClmBF',
      //   mapping: 'pathname',
      //   strict: true,
      //   reactionsEnabled: true,
      //   emitMetadata: false,
      //   lang: 'en',
      // }
    })
  ],
  // adapter: node({
  //   mode: 'standalone'
  // })
});