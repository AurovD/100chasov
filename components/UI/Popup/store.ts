import {create} from 'zustand';
import { devtools } from 'zustand/middleware'

interface PopupState {
    status: boolean;
    changeStatus: () => void;
    openPopup: () => void,
    closePopup: () => void,
    contents: {title: string, content: string | JSX.Element},
    changeContent: (title: string, content: string | JSX.Element) => void
}

const usePopupStore = create<PopupState>()(devtools((set) => ({
    status: false,
    changeStatus: () => set((state) =>  ({ status: !state.status}), false, "changeStatus"),
    contents: {title: "", content: ""},
    openPopup: () => set((state) => ({status: true}), false, "openPopup"),
    closePopup: () => set((state) => ({status: false}), false, "closePopup"),
    changeContent: (title, content) =>
        set((state) => ({
            ...state,
            contents: { title, content },
        }), false, "changeContent"),
}), {serialize: { options: true },  name: "popupStore"}))
export default usePopupStore;

