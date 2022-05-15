import { useContext } from 'react';
import { AppContext } from './AppContextProvider';

export default function useAppContext() {
    return useContext(AppContext);
}