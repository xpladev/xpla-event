import React from "react";
import Balance from "./Balance";
import NFT from "./NFT";
import Stake from "./Stake";
import Tx from "./Tx";
const Main = () => {
  return (
    <div className="flex flex-col justify-center bg-white items-center">
      <div className="md:w-[1180px] md:mt-[80px] mt-[25px] md:mb-[86px] mb-[24px] flex flex-col md:gap-[80px] gap-[20px] justify-center items-center">
        <Balance />
        <NFT />
        <Stake />
        <Tx />
      </div>
      <div className="md:max-w-[937px] max-w-[254px] text-[#0080FF] md:mb-[70px] mb-[30px] font-pretendard md:text-[20px] md:leading-[24px] text-[9px] leading-[11px] md:w-full text-center">
      💡 If the information displayed on your dashboard is inaccurate, please
        refresh your browser to update it.
      </div>
    </div>
  );
};

export default Main;
