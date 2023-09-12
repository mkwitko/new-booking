/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        b2bSmall: '0.375rem',
        b2b: '0.625rem',
      },
      backgroundImage: {
        'buildings-dark':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #110E2C 87.50%), url("/img/LoginBackground.png")',
        'overlay-shadow-gradient':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #110E2C 87.50%)',
        'default-card': 'linear-gradient(#71C0E9, #135476)',
        'visa-card': 'linear-gradient(#F5F5F5, #CECECE)',
        'master-card': 'linear-gradient(#F5F5F5, #CECECE)',
      },
      boxShadow: {
        b2b: 'rgba(0, 0, 0, 0.15) 0px 7px 10px',
      },
      colors: {
        primary: {
          DEFAULT: '#273472',
          50: '#7E8DD3',
          100: '#6F7FCE',
          200: '#5064C3',
          300: '#3C50AF',
          400: '#314290',
          500: '#273472',
          600: '#192148',
          700: '#0A0E1E',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        primaryLight: {
          DEFAULT: '#4EB0E3',
          50: '#EDF7FC',
          100: '#DBEFF9',
          200: '#B8DFF4',
          300: '#94CFEE',
          400: '#71C0E9',
          500: '#4EB0E3',
          600: '#2299D7',
          700: '#1A77A6',
          800: '#135476',
          900: '#0B3246',
          950: '#07202D',
        },
        primaryDark: {
          DEFAULT: '#1B144B',
          50: '#5948CE',
          100: '#4B38CA',
          200: '#3E2EAC',
          300: '#32258B',
          400: '#271D6B',
          500: '#1B144B',
          600: '#0B081F',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        secondary: {
          DEFAULT: '#EE4978',
          50: '#FEF1F5',
          100: '#FCDEE7',
          200: '#F8B9CB',
          300: '#F594AF',
          400: '#F16E94',
          500: '#EE4978',
          600: '#E91652',
          700: '#B61140',
          800: '#830C2E',
          900: '#4F071C',
          950: '#360513',
        },
        secondaryLight: {
          DEFAULT: '#FE719A',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFEBF0',
          300: '#FFC2D4',
          400: '#FE9AB7',
          500: '#FE719A',
          600: '#FE3972',
          700: '#FD024B',
          800: '#C5013A',
          900: '#8E012A',
          950: '#720122',
        },
        secondaryDark: {
          DEFAULT: '#B43B66',
          50: '#E9BDCD',
          100: '#E4AEC1',
          200: '#DA8FAA',
          300: '#D07092',
          400: '#C6527B',
          500: '#B43B66',
          600: '#8A2D4E',
          700: '#5F1F36',
          800: '#35111E',
          900: '#0B0406',
          950: '#000000',
        },
        success: '#80B914',
        successLight: '#BDE750',
        successDark: '#4D7D08',
        warning: '#FFA70F',
        warningLight: '#FFC34B',
        warningDark: '#B76907',
        info: '#6690FF',
        infoLight: '#ADC8FF',
        infoDark: '#102693',
        error: '#FF3A28',
        errorLight: '#FF785D',
        errorDark: '#B61C35',
        textPrimary: '#24262b',
        textSecondary: '#727578',
        textTertiary: '#007380',
        textHint: '#FFFFFF',
        textLight: '#FFFFFF',
        textDisabled: '#BDBDBD',
        borderColor: '#8C8C8C',
        backgroundDefault:'#F4F7FA',
      },
      fontSize: {
        xlarge: '1.875rem',
        large: '1.5rem',
        normal: '1rem',
        small: '0.75rem',
        extraSmall: '0.625rem',
      },
      gridTemplateColumns: {
        'credit-card': '1.25rem, 1fr, 1fr',
      },
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
}
