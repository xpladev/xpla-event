import React, { useState } from "react";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import clsx from "clsx";

const DateSelect = () => {
    const sampleDate = ["2024-02-01", "2024-01-11", "2023-12-13", "2023-08-13"]
    const [dateIndex, setDateIndex] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    return <div
        onClick={() => setOpen(!open)}
        className={clsx(
            "relative w-[300px]  bg-[#EEF7FF]",
            "hover:border hover:border-black  hover:cursor-pointer",
            open ? "border border-black border-b-0" : ""
        )}>
        <div className="flex justify-between items-center py-[6.5px] pl-[10px] text-black ">

            <span className="text-[16px] leading-[20px] font-normal">
                {getDateFormat(sampleDate[dateIndex])} {
                    dateIndex === 0 && "(Latest Update)"
                }
            </span>
            <KeyboardArrowDownRoundedIcon className={clsx("scale-[1.2] mr-[11.3px]",
                open && "rotate-180"
            )} />
        </div>
        <div className={clsx("absolute w-[300px] left-[-0.9px] top-[33px] bg-[#EEF7FF] border border-black border-t-0",
            !open && "hidden"
        )}>
            {/* {
                sampleDate.filter((d, i) => i !== dateIndex).map((date, i) => <div
                    onClick={() => {
                        (dateIndex <= i) ? setDateIndex(i + 1) : setDateIndex(i) 
                    }}
                    className="pl-[10px] py-[6.5px] text-black font-normal hover:font-semibold hover:bg-[#CBE8FF]">

                    <span className="text-[16px] leading-[20px]">
                        {getDateFormat(date)} {
                            dateIndex > 0 && i === 0 && "(Latest Update)"
                        }
                    </span>
                </div>)
            } */}

            {
                sampleDate.map((date, i) => <div
                    onClick={() => {
                        setDateIndex(i)
                    }}
                    className="pl-[10px] py-[6.5px] text-black font-normal hover:font-semibold hover:bg-[#CBE8FF]">

                    <span className="text-[16px] leading-[20px]">
                        {getDateFormat(date)} {
                            i === 0 && "(Latest Update)"
                        }
                    </span>
                </div>)
            }
        </div>
    </div>
}

export default DateSelect;

const getDateFormat = (date: string) => {
    const d = new Date(date);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

// document.write("The current month is " + );