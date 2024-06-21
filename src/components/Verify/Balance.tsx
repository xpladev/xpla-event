import { WalletStatus, useWallet } from "@xpla/wallet-provider";
import useBalance from "../useQuery/useBalance";
import { CircularProgress, useMediaQuery } from "@mui/material";
import BigNumber from "bignumber.js";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCallback, useState } from "react";
import clsx from "clsx";

const Balance = () => {
  const { status, wallets } = useWallet();
  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <div className="w-full rounded-full drop-shadow bg-[#0080FF]/[.30] md:p-[30px] p-[8px] flex justify-center items-center md:mb-[0px] mb-[20px] ">
      <div className="w-full rounded-full flex md:px-[70px] px-[20px] md:py-[64px] py-[15px] flex-col flex-1 md:gap-[27px] bg-gradient-to-r to-[#0080FF] from-[#00AAFF] justify-center items-start">
        <div className="text-white font-pretendard md:text-[38px] font-semibold md:leading-[45px] text-[14px] leading-[14px] md:mb-[0px] mb-[6px]">
          Your XPLA
        </div>
        <div className="flex justify-end items-end w-full">
          <span className="font-pretendard md:text-[80px] text-[26px] md:leading-[78px] leading-[31px] text-white flex flex-1">
            {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 ? (
              <XPLABalance address={wallets[0].xplaAddress} />
            ) : (
              0
            )}
          </span>
          <span className="font-pretendard md:text-[32px] text-[12px] md:leading-[38px] leading-[14px] text-black">
            XPLA
          </span>
        </div>
      </div>
      <div className="w-full rounded-full flex md:px-[70px] px-[20px] md:py-[64px] py-[15px] flex-col flex-1 md:gap-[27px] justify-center items-center">
        <div className="flex flex-col justify-center items-start w-full relative">
          <span className="font-pretendard md:text-[32px] md:leading-[38px] text-[12px] leading-[12px] text-white text-left">
            You need{!isDesktop && <br/>} at least 1 XPLA<br/> to get Discord Role
          </span>
        </div>
      </div>
    </div>
  );
};
export default Balance;

const XPLABalance = ({ address }: { address: string }) => {
  const { data, isLoading } = useBalance(address);
  return (
    <span>
      {isLoading ? (
        <CircularProgress style={{ color: "white" }} size={70} />
      ) : (
        onlyInt(data?.balance.amount || "0")
      )}
    </span>
  );
};

export const onlyInt = (num: string) => {
  return new BigNumber(num).dividedBy(10 ** 18).toFixed(0, 1);
};

export async function copyToClipboard(text?: string | number) {
  if (text === undefined) return false;

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text.toString());
  }
  return true;
}