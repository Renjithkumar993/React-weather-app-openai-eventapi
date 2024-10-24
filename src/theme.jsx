

import {
  createBaseThemeOptions,
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';

export const myTheme = createUnifiedTheme({
...createBaseThemeOptions({
  palette: {
    ...palettes.light,

    primary: {
      main: '#1e3a8a', 
    },
    secondary: {
      main: '#D03DF3',
    },
    error: {
      main: '#e74c3c', 
    },
    warning: {
      main: '#f39c12', 
    },
    info: {
      main: '#3498db', 
    },
    success: {
      main: '#27ae60', 
    },
    background: {
      default: '#f3f4f6', 
      paper: '#ffffff', 
    },
    banner: {
      info: '#D03DF3', 
      error: '#e74c3c', 
      text: '#1e3a8a', 
      link: '#D03DF3', 
    },
    errorBackground: '#ffe6e6', 
    warningBackground: '#fff5cc', 
    infoBackground: '#d6eaf8', 
    navigation: {
      background: '#1e3a8a', 
      indicator: '#d97706',
      color: '#ffffff',
      selectedColor: '#f8f9fa',
      navItem: {
        hoverBackground: '#d97706', 
      },
    },
  },
}),
defaultPageTheme: 'home',
fontFamily: 'Poppins, sans-serif',
pageTheme: {
  home: genPageTheme({
    colors: ['#1e3a8a', '#D03DF3'], 
    shape: shapes.wave,
  }),
  documentation: genPageTheme({
    colors: ['#1e3a8a', '#D03DF3'], 
    shape: shapes.wave2,
  }),
  tool: genPageTheme({
    colors: ['#D03DF3', '#1e3a8a'], 
    shape: shapes.round,
  }),
  service: genPageTheme({
    colors: ['#1e3a8a', '#D03DF3'], 
    shape: shapes.wave,
  }),
  website: genPageTheme({
    colors: ['#1e3a8a', '#D03DF3'], 
    shape: shapes.wave,
  }),
  library: genPageTheme({
    colors: ['#1e3a8a', '#D03DF3'],
    shape: shapes.wave,
  }),
  other: genPageTheme({
    colors: ['#f3f4f6', '#D03DF3'], 
    shape: shapes.wave,
  }),
  app: genPageTheme({
    colors: ['#1e3a8a', '#D03DF3'], 
    shape: shapes.wave,
  }),
  apis: genPageTheme({
    colors: ['#1e3a8a', '#D03DF3'],
    shape: shapes.wave,
  }),
},
components: {
  BackstageHeader: {
    styleOverrides: {
      header: ({ theme }) => ({
        boxShadow: 'none',
        borderBottom: `4px solid ${theme.palette.primary.main}`
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '16px',
        boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)', 
        backgroundColor: 'white',
        padding: '16px',
      },
    },
  },
  BackstageItemCardHeader: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
      },
    },
  },
  CatalogReactUserListPicker: {
    styleOverrides: {
      root: {
        backgroundColor: '#a6a6a6',
        color: '#ffffff',
        border: '1px solid #1e3a8a'
        
      },
    },
  },
    MuiPaper: {
      styleOverrides: {
        root: {
          maxWidth: '1200px', 
          margin: '0 auto',  
        
        },
      }
    }
},
});
