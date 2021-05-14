import { DefaultTheme } from "@react-navigation/native"


const AppTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        background: '#eef2f4',
        card: '#191919',
        text: 'white',
        border: '#191919',
        notification: 'white',
    }
}


export { AppTheme }