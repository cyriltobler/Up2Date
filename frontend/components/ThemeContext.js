// ThemeContext.js
import {createContext, useContext} from 'react';
import colors from '../constants/color'

const ThemeContext = createContext(colors.dark);

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
