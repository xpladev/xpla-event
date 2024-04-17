import React, { useState } from "react";
import Header from "./components/PolicyComponents/Header";
import LeftSidebar from "./components/PolicyComponents/LeftSidebar";
import Content from "./components/PolicyComponents/Content";
import cookieData from "./cookie.json";
import TopButton from "./components/PolicyComponents/TopButton";
import LanguageSelect from "./components/PolicyComponents/LanguageSelect";


const Cookie = () => {
    const [cookieIndex, setCookieIndex] = useState<number>(0);

    return <>
        <Header />
        <div className="w-full pt-[80px] flex justify-center items-start">
            <div className="w-full max-w-[1920px] pl-[20px] md:pl-[40px] pt-[20px] md:pt-[50px] pb-[200px] pr-[35px] flex md:flex-row flex-col ">
                <LanguageSelect classname="mb-[20px] block md:hidden"/>
                <LeftSidebar />
                <Content
                    title="Cookie Policy"
                    policiesData={cookieData}
                    index={cookieIndex}
                    setIndex={setCookieIndex}
                />
            </div>
            <TopButton />
        </div>
    </>
}

export default Cookie;