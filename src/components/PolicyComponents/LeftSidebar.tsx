import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const LeftSidebar = () => {
    const location = useLocation();
    const { pathname } = location;

    return <div className="mr-[39px] w-[236px] mb-[20px] md:mb-0">
        <Link
            className={clsx("text-[16px] font-medium leading-[19px]",
                pathname === "/privacy" ? "text-[#00B1FF]" : "text-[#878D96]"
            )}
            to="/privacy"
        >
            Privacy Policy
        </Link>
        <div className="w-full mt-[11px] mb-[10px] border border-[0.7px] border-t-0 border-[#878D96]" />
        <Link
            className={clsx("text-[16px] font-medium leading-[19px]",
                pathname === "/cookie" ? "text-[#00B1FF]" : "text-[#878D96]"
            )}
            to="/cookie"
        >
            Cookie Policy
        </Link>
        <div className="w-full mt-[11px] border border-[0.7px] border-t-0 border-[#878D96]" />
    </div>
}

export default LeftSidebar;