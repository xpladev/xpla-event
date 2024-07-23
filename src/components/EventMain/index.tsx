import { WalletStatus, useWallet } from "@xpla/wallet-provider";
import Balance from "./Balance";
import Stake from "./Stake";
import Tx from "./Tx";

const EventMain = () => {
  const { status, wallets } =
    useWallet();

  return (
    <div className="flex flex-col justify-center bg-black items-center">
      {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 &&
        <>
          <div className="md:max-w-[1180px] md:w-full md:mt-[80px] mt-[25px] md:mb-[86px] mb-[24px] flex flex-col md:gap-[80px] justify-center items-center md:px-[0px] px-[20px] ">
            <Balance />
            <Stake />
            <Tx />
          </div>
          <div className="md:max-w-[937px] max-w-[354px] text-[#0080FF] md:mb-[70px] mb-[30px] font-pretendard md:text-[20px] md:leading-[24px] text-[12px] leading-[11px] md:w-full text-center max-[1180px]:px-[20px] ">
            * If the information displayed on your dashboard is inaccurate, please
            refresh your browser to update it.
          </div>
        </>
      }
      <div className="w-full md:h-[200px] h-[80px] flex justify-center items-center bg-[#404040] px-[20px]">
        <div className="md:max-w-[1180px] md:w-full flex md:flex-row flex-col-reverse md:justify-between justify-center items-center text-[#D9D9D9] font-pretendard md:leading-[24px] md:text-[20px] text-[8px]">
          <span className="md:mt-[0px] mt-[10px] font-normal">
            Copyright © 2023{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://xpla.io/"
              className="underline"
            >
              XPLA
            </a>
            .{" "} All rights reserved.
          </span>
          <div className="flex md:gap-[22px] font-semibold md:leading-[18px] ">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/privacy-policy"
              className="md:hover:cursor-pointer md:hover:opacity-80 md:mr-[0px] mr-[20px]"
            >
              Privacy Policy
            </a>
            <div className="md:h-[18px] border-solid border-r-[1px] border-[#DDDDDD] md:mr-[0px] mr-[20px]" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/cookie-policy"
              className="md:hover:cursor-pointer md:hover:opacity-80 md:mr-[0px] mr-[20px]"
            >
              Cookie Policy
            </a>
            <div className="md:h-[18px] border-solid border-r-[1px] border-[#DDDDDD] md:mr-[0px] mr-[20px]" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://assets.xpla.io/pdf/TERMS_OF_USE.pdf"
              className="md:hover:cursor-pointer md:hover:opacity-80"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMain;
