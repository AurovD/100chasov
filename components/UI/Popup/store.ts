import {createStore} from '../../../store/createStore';
import { devtools } from 'zustand/middleware'

interface PopupState {
    status: boolean;
    changeStatus: () => void;
    openPopup: () => void,
    closePopup: () => void,
    contents: {title: string, content: string | JSX.Element},
    changeContent: (title: string, content: string | JSX.Element) => void
}

const usePopupStore = createStore<PopupState>((set) => ({
    status: false,
    changeStatus: () => set((state) =>  ({ status: !state.status})),
    contents: {title: "", content: ""},
    openPopup: () => set((state) => ({status: true})),
    closePopup: () => set((state) => ({status: false})),
    changeContent: (title, content) =>
        set((state) => ({
            ...state,
            contents: { title, content },
        })),
}), "Popup")
export default usePopupStore;

