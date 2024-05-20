import { WalletStatus, useWallet } from "@xpla/wallet-provider";
import { CircularProgress } from "@mui/material";
import useTx from "../useQuery/useTx";

const Tx = () => {
  const { status, wallets } = useWallet();

  return (
    <div className="w-full max-[768px]:w-full main-shadow bg-white md:p-[30px] p-[8px] flex justify-center items-center rounded-full">
      <div className="w-full rounded-full flex md:px-[70px] px-[20px] md:py-[64px] py-[15px] flex-col flex-1 md:gap-[27px] bg-gradient-to-r to-[#0080FF] from-[#00AAFF] justify-center items-start">
        <div className="text-white font-pretendard md:text-[38px] font-semibold md:leading-[45px] text-[14px] leading-[14px] text-start md:mb-[0px] mb-[6px]">
          Transaction History
        </div>
        <div className="flex justify-end items-end w-full">
          <span className="font-pretendard md:text-[80px] text-[26px] md:leading-[78px] leading-[31px] text-white flex flex-1 justify-end mr-[10px]">
            {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 ? (
              <TxSum address={wallets[0].xplaAddress} />
            ) : (
              0
            )}
          </span>
          <span className="font-pretendard md:text-[32px] text-[12px] md:leading-[38px] leading-[14px] text-black">
            tx
          </span>
        </div>
      </div>
    </div>
  );
};
export default Tx;

const TxSum = ({ address }: { address: string }) => {
  const { data, isLoading } = useTx(address);
  return (
    <span>
      {isLoading ? (
        <CircularProgress style={{ color: "white" }} size={70} />
      ) : (
        data
      )}
    </span>
  );
};