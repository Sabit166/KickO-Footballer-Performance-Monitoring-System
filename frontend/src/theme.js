import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#0d47a1', // dark blue
		},
		secondary: {
			main: '#1976d2', // lighter blue
		},
		background: {
			default: '#0a1929', // very dark blue
			paper: '#102040',
		},
		text: {
			primary: '#ffffff',
			secondary: '#b0bec5',
		},
	},
});

export default theme;
