import { WalletStatus, useWallet } from "@xpla/wallet-provider";
import { CircularProgress, useMediaQuery } from "@mui/material";
import useNFT from "../useQuery/useNFT";
import { copyToClipboard } from "./Balance";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const NFT = () => {
  const { status, wallets } = useWallet();

  return (
    <div className="min-[1180px]:w-full max-[768px]:w-full main-shadow bg-white md:p-[30px] p-[8px] flex justify-center items-center rounded-full">
      <div className="w-full rounded-full flex md:px-[70px] px-[20px] md:py-[64px] py-[15px] flex-col flex-1 md:gap-[27px] gap-[6px] bg-gradient-to-r to-[#0080FF] from-[#00AAFF] justify-center items-start">
        <div className="text-white font-pretendard md:text-[38px] font-semibold md:leading-[45px] text-[14px] leading-[14px]">
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
      <div className="w-full rounded-full flex md:px-[70px] px-[20px] md:py-[64px] py-[15px] flex-col flex-1 md:gap-[27px] gap-[6px] bg-white justify-center items-center">
        <div className="text-black font-pretendard md:text-[38px] font-semibold md:leading-[45px] text-[14px] leading-[14px]">
          - Secret Code -
        </div>
        <div className="flex justify-center items-center w-full relative">
          {wallets.length > 0 ? (
            <ShowSecretCode address={wallets[0].xplaAddress} />
          ) : (
            <span className="font-pretendard md:text-[32px] md:leading-[38px] text-[10px] leading-[12px] text-[#0080FF]">
              You need at least <br />1 NFT to get Secret Code!
            </span>
          )}
          {status !== WalletStatus.WALLET_CONNECTED && (
            <div className="absolute blur-text h-full w-full" />
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

  return (
    <>
      {isLoading ? (
        <CircularProgress style={{ color: "white" }} size={70} />
      ) : (data || 0) < 1 ? (
        <span className="font-pretendard md:text-[32px] md:leading-[38px] text-[10px] leading-[12px] text-[#0080FF]">
          You need at least <br />1 NFT to get Secret Code!
        </span>
      ) : (
        <span className="w-full relative font-pretendard md:text-[32px] md:leading-[38px] text-[10px] leading-[12px] text-[#0080FF]">
          {process.env.REACT_APP_NFT}
          <ContentCopyIcon
            onClick={() => copyToClipboard(process.env.REACT_APP_NFT)}
            className="absolute md:top-[5px] top-[-6px] right-[0px] w-[10px] h-[10px] scale-y-[-1] hover:opacity-80 hover:cursor-pointer"
            style={{ color: "#636161", width : isDesktop ? 40 : 10 }}
          />
        </span>
      )}
    </>
  );
};
