import { WalletStatus, useWallet } from "@xpla/wallet-provider";
import { CircularProgress} from "@mui/material";
import BigNumber from "bignumber.js";
import useStake from "../useQuery/useStake";

const Stake = () => {
  const { status, wallets } = useWallet();

  return (
    <div className="w-full main-shadow bg-white md:p-[30px] p-[8px] flex justify-center items-center rounded-full md:mb-[0px] mb-[20px]">
      <div className="w-full rounded-full flex md:px-[70px] px-[20px] md:py-[64px] py-[15px] flex-col flex-1 md:gap-[27px] bg-gradient-to-r to-[#0080FF] from-[#00AAFF] justify-center items-start">
        <div className="text-white font-pretendard md:text-[38px] font-semibold md:leading-[45px] text-[14px] leading-[14px] md:mb-[0px] mb-[6px]">
          Staked XPLA
        </div>
        <div className="flex justify-end items-end w-full">
          <span className="font-pretendard md:text-[80px] text-[26px] md:leading-[78px] leading-[31px] text-white flex flex-1 justify-end mr-[10px]">
            {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 ? (
              <StakeSum address={wallets[0].xplaAddress} />
            ) : (
              0
            )}
          </span>
          <span className="font-pretendard md:text-[32px] text-[12px] md:leading-[38px] leading-[14px] text-black">
            XPLA
          </span>
        </div>
      </div>
    </div>
  );
};
export default Stake;

const StakeSum = ({ address }: { address: string }) => {
  const { data, isLoading } = useStake(address);
  const delegations = data
    ? data[0].filter(({ balance }) => balance.amount.greaterThan(0))
    : [];
  const delegationsAllXPLA =
    delegations.length !== 0
      ? delegations
          .map(({ balance }) => balance.amount)
          .reduce((a, b) => a.add(b))
      : 0;
  return (
    <span>
      {isLoading ? (
        <CircularProgress style={{ color: "white" }} size={70} />
      ) : (
        onlyInt(delegationsAllXPLA.toString()) || 0
      )}
    </span>
  );
};

export const onlyInt = (num: string) => {
  return new BigNumber(num).dividedBy(10 ** 18).toFixed(0, 1);
};
