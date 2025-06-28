import React, {createContext} from "react";
export const Menu = createContext(true);

export default function MenuContext({children}){
    const [isOpen, setIsOpen] = React.useState(() => window.innerWidth > 700);
    return (
        <Menu.Provider value={{isOpen, setIsOpen}}>{children}</Menu.Provider>
    );
}