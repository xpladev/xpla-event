import React, { useState } from "react";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import useLanguage from "../../zustand/useLanguage";
import clsx from "clsx";

const Header = () => {
    return <header className="w-full bg-black h-[80px] flex justify-center items-center">
        <div className="relative max-w-[1920px] w-full ml-[40px] mr-[35px] flex justify-start items-center">
            <div className="flex justify-center items-center">
                <img
                    src="/img/xplalogo.svg"
                    className="mr-[30px]"
                    alt="xpla-logo"
                    width="114px"
                    height="20px"
                />
                <span className="text-white leading-[35.8px] text-[30px] font-medium">
                    Policies
                </span>
            </div>
            <SelectLanguage />
        </div>
    </header>
}

export default Header;

const SelectLanguage = () => {
    const { language, setLanguage } = useLanguage();
    const [open, setOpen] = useState<boolean>(false);
    return <div className="absolute top-0 right-0">
        <div
            onClick={() => setOpen(!open)}
            className={clsx(
                "relative w-[120px]  bg-white",
                "hover:border hover:border-[#878D96]  hover:cursor-pointer",
                open ? "border border-[#878D96] border-b-0" : ""
            )}>
            <div className="  flex justify-between items-center py-[4.5px] pl-[10px] text-[#878D96] hover:text-black ">

                <span className="text-[16px] leading-[19px] font-medium">
                    {
                        language === "english" ? "English" : "한국어"
                    }
                </span>
                <KeyboardArrowDownRoundedIcon className={clsx("scale-[1.2] mr-[4.3px]",
                    open && "rotate-180"
                )} />
            </div>
            <div className={clsx("absolute w-[120px] left-[-0.9px] top-[33px] bg-white border border-[#878D96] border-t-0",
                !open && "hidden"
            )}>
                <div
                    onClick={() => setLanguage(language === "english" ? "korean" : "english")}
                    className="pl-[10px] py-[7px] text-[#878D96] hover:text-black">

                    <span className="text-[16px] leading-[19px] font-medium  ">
                        {
                            language !== "english" ? "English" : "한국어"
                        }
                    </span>
                </div>
            </div>
        </div>
    </div>
}