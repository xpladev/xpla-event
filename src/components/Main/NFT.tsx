import { WalletStatus, useWallet } from "@xpla/wallet-provider";
import { CircularProgress, useMediaQuery } from "@mui/material";
import useNFT from "../useQuery/useNFT";
import { copyToClipboard } from "./Balance";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCallback, useState } from "react";
import clsx from "clsx";

const NFT = () => {
  const { status, wallets } = useWallet();
  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <div className="w-full main-shadow bg-white md:p-[30px] p-[8px] flex justify-center items-center rounded-full md:mb-[0px] mb-[20px]">
      <div className="w-full rounded-full flex md:px-[70px] px-[20px] md:py-[64px] py-[15px] flex-col flex-1 md:gap-[27px]  bg-gradient-to-r to-[#0080FF] from-[#00AAFF] justify-center items-start">
        <div className="text-white font-pretendard md:text-[38px] font-semibold md:leading-[45px] text-[14px] leading-[14px] md:mb-[0px] mb-[6px]">
          Your NFT
        </div>
        <div className="flex justify-end items-end w-full">
          <span className="font-pretendard md:text-[80px] text-[26px] md:leading-[78px] leading-[31px] text-white flex flex-1">
            {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 ? (
              <NFTSum address={wallets[0].xplaAddress} />
            ) : (
              0
            )}
          </span>
          <span className="font-pretendard md:text-[32px] text-[12px] md:leading-[38px] leading-[14px] text-black">
            NFT
          </span>
        </div>
      </div>
      <div className="w-full rounded-full flex md:px-[70px] px-[20px] md:py-[64px] py-[15px] flex-col flex-1 md:gap-[27px] bg-white justify-center items-center">
        <div className="text-black font-pretendard md:text-[38px] font-semibold md:leading-[45px] text-[14px] leading-[14px] md:mb-[0px] mb-[12px]">
          - Secret Code -
        </div>
        <div className="flex justify-center items-center w-full relative">
          {wallets.length > 0 ? (
            <ShowSecretCode address={wallets[0].xplaAddress} />
          ) : (
            <span className="font-pretendard md:text-[32px] md:leading-[38px] text-[12px] leading-[12px] text-[#0080FF]">
              You need{!isDesktop && <br/>} at least{isDesktop && <br/>} 1 NFT{!isDesktop && <br/>} to get Secret Code!
            </span>
          )}
          {status !== WalletStatus.WALLET_CONNECTED && (
            <div className="absolute blur-text h-[calc(100%+2px)] w-full" />
          )}
        </div>
      </div>
    </div>
  );
};
export default NFT;

const NFTSum = ({ address }: { address: string }) => {
  const { data, isLoading } = useNFT(address);
  return (
    <span>
      {isLoading ? (
        <CircularProgress style={{ color: "white" }} size={70} />
      ) : (
        data || 0
      )}
    </span>
  );
};

const ShowSecretCode = ({ address }: { address: string }) => {
  const { data, isLoading } = useNFT(address);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [copyAnimation, setCopyAnimation] = useState<boolean>(true);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  
  const handleClickCopy = useCallback((link : string) => {
    setCopyAnimation(true);
    setIsCopy(true);
    setTimeout(() => {
      setCopyAnimation(false);
    }, 1000);
    setTimeout(() => {
      setIsCopy(false);
    }, 1500);
    copyToClipboard(link);
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress style={{ color: "white" }} size={70} />
      ) : (data || 0) < 1 ? (
        <span className="font-pretendard md:text-[32px] md:leading-[38px] text-[12px] leading-[12px] text-[#0080FF]">
          You need{!isDesktop && <br/>} at least{isDesktop && <br/>} 1 NFT{!isDesktop && <br/>} to get Secret Code!
        </span>
      ) : (
        <span className="w-full relative font-pretendard md:text-[32px] md:leading-[38px] text-[14px] leading-[12px] text-[#0080FF]">
          {process.env.REACT_APP_NFT}
          <div className="absolute md:top-[0px] top-[-6px] right-[0px] ">
            <div className="releative">
              <ContentCopyIcon
                onClick={() =>
                  handleClickCopy(process.env.REACT_APP_NFT || "")
                }
                className="w-[10px] h-[10px] scale-y-[-1] hover:opacity-80 hover:cursor-pointer"
                style={{ color: "#636161", width: isDesktop ? 40 : 14 }}
              />
              {isCopy && (
                <img
                  src="/img/copy.svg"
                  className={clsx(
                    "absolute md:left-[3px] left-[2px] md:bottom-[37px] bottom-[20px] w-[60px] ",
                    !copyAnimation && "fadeOut"
                  )}
                />
              )}
            </div>
          </div>
        </span>
      )}
    </>
  );
};
