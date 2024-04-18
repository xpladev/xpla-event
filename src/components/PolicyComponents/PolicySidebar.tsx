import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const PolicySidebar = () => {
    const location = useLocation();
    const { pathname } = location;

    return <div className="flex flex-col md:flex-row">
        <Link
            className={clsx("text-[16px] font-medium leading-[19px] mr-[12px]",
                pathname === "/privacy" ? "text-[#00B1FF]" : "text-[#878D96]"
            )}
            to="/privacy"
        >
            Privacy Policy
        </Link>
        <div className="md:hidden w-full mt-[11px] mb-[10px] border border-[0.7px] border-t-0 border-[#878D96]" />
        <div className="hidden md:block border-r-[0.7px]  border-[#878D96] mr-[12px]" />
        <Link
            className={clsx("text-[16px] font-medium leading-[19px] ",
                pathname === "/cookie" ? "text-[#00B1FF]" : "text-[#878D96]"
            )}
            to="/cookie"
        >
            Cookie Policy
        </Link>
    </div>
}

export default PolicySidebar;