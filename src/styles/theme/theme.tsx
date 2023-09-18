import { ThemeOptions } from '@mui/material/styles';

export const customTheme = (): ThemeOptions => {
  return {
    palette: {
      common: {
        black: '#24262b',
        white: '#FFFFFF',
      },
      primary: {
        main: '#273472',
        light: '#4EB0E3',
        dark: '#1B144B',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#EE4978',
        light: '#FE719A',
        dark: '#B43B66',
        contrastText: '#FFFFFF',
      },
      success: {
        main: '#80B914',
        light: '#BDE750',
        dark: '#4D7D08',
      },
      warning: {
        main: '#FFA70F',
        light: '#FFC34B',
        dark: '#B76907',
      },
      info: {
        main: '#6690FF',
        light: '#ADC8FF',
        dark: '#102693',
      },
      error: {
        main: '#FF3A28',
        light: '#FF785D',
        dark: '#B61C35',
      },
      text: {
        primary: '#24262b',
        secondary: '#727578',
        // hint: "#FFFFFF",
        disabled: '#BDBDBD',
      },
      divider: 'rgba(140, 140, 140, 0.2)',
      background: {
        default: '#F4F7FA',
        paper: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: "'Nunito', sans-serif",
      h1: {
        fontWeight: 600,
        fontSize: '2.625rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        textTransform: 'uppercase',
      },
      h2: {
        fontWeight: 200,
        fontSize: '2.625rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      h3: {
        fontWeight: 300,
        fontSize: '1.875rem',
        lineHeight: 1,
        letterSpacing: '0.00938em',
        textTransform: 'uppercase',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        textTransform: 'uppercase',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        textTransform: 'uppercase',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        textTransform: 'none',
      },
      subtitle1: {
        fontWeight: 300,
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        textTransform: 'uppercase',
      },
      subtitle2: {
        fontWeight: 600,
        fontSize: '0.75rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        textTransform: 'uppercase',
      },
      body1: {
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      body2: {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      button: {
        fontWeight: 700,
        fontSize: '1rem',
        lineHeight: '24px',
        letterSpacing: '0.00938em',
      },
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 10,
            color: '#24262b',
            boxShadow: 'none',
            border: '1px solid rgba(140, 140, 140, 0.2)',
          },
          elevation: {
            boxShadow: 'none',
          },
          elevation1: {
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
          },
          elevation4: {
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.16)',
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'standard',
          'aria-orientation': 'vertical',
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: '#F0F0F0',
          },
          track: {
            color: 'rgba(34, 31, 31, 0.26)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            padding: 24,
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            color: '#24262b',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#24262b',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#FFFFFF',
            color: '#24262b',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '6px !important',
            padding: '12px 24px !important',
          },
          contained: {
            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
            width: '100%',
          },
          text: {
            padding: '8px 24px !important',
          },
          textSizeSmall: {
            padding: '4px 8px !important',
            fontSize: 12,
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          select: {
            color: '#24262b',
          },
          displayedRows: {
            color: '#727578',
          },
          selectLabel: {
            color: '#727578',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            whiteSpace: 'nowrap',
            color: '#1B144B',
          },
          body: {
            color: '#595E5F',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'standard',
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
          indicator: {
            display: 'none',
          },
          scroller: {
            paddingBottom: 8,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            '&$MuiTab.selected': {
              borderRadius: 4,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
              zIndex: 100,
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          colorPrimary: {
            padding: '9px !important',
            '& svg': {
              // fill: "#0098A6",
            },
            '& .MuiInput-underline:hover:before': {
              borderBottomColor: '#0098A6',
            },
            '& .MuiInput-underline:hover:after': {
              borderBottomColor: '#0098A6',
            },
          },
          indeterminate: {
            '& svg': {
              fill: '#0098A6',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: '#24262b',
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: '#24262b',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            width: '54px',
            height: '54px',
            background: '#F4F7FA',
            color: '#273472',
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: '#24262b',
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            background: '#FFFFFF !important',
          },
          circular: {
            borderRadius: '50% !important',
          },
          extended: {
            borderRadius: 'unset',
          },
        },
      },
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: '0 16px !importan   t',
            background: '#ffffff',
            width: '100%',
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            borderRadius: 4,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            borderRadius: 4,
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: 16,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paperWidthSm: {
            maxWidth: 1020,
          },
          root: {
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
          },
          paper: {
            justifyContent: 'space-between',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: 24,
            color: '#273472',
            flexGrow: 0,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: 0,
            flexGrow: 2,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: '16px 24px',
            background: '#F4F7FA',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 16,
            flexGrow: 0,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 40,
          },
        },
      },
      MuiStep: {
        styleOverrides: {
          root: {
            '&.MuiStep-horizontal': {
              padding: 0,
            },
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            color: '#273472',
            '&.Mui-completed': {
              color: '#273472',
            },
            '&.Mui-active': {
              color: '#273472',
            },
          },
        },
      },
      MuiStepConnector: {
        styleOverrides: {
          root: {
            maxWidth: 32,
            '&.MuiStepConnector-horizontal': {
              paddingRight: 8,
              paddingLeft: 8,
            },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          text: {
            fill: '#273472',
            fontWeight: 700,
          },
          root: {
            color: 'white',
            borderRadius: '50%',
            border: '1px solid #273472',
            '&.Mui-completed': {
              color: 'white',
              borderRadius: '50%',
              border: '1px solid #80B914',
              background: '#80B914',
            },
            '&.Mui-active': {
              text: {
                fill: '#FFF',
                fontWeight: 700,
              },
              color: '#273472',
              borderRadius: '50%',
              border: '1px solid #273472',
            },
          },
        },
      },
    },
  };
};
