import { ConnectType, useWallet, WalletStatus } from "@xpla/wallet-provider";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { selectConnection } from "./ConnectModal";
import { truncate } from "@xpla.kitchen/utils";
import "../../App.css";

export default function Connect() {
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const { status, availableConnections, connect, disconnect, wallets } =
    useWallet();

  const clickConnect = async () => {
    try {
      const selected = await selectConnection(
        availableConnections.filter(
          (connection) => connection.type === ConnectType.EXTENSION || connection.type === ConnectType.WALLETCONNECT
        )
      );

      if (!selected) {
        return;
      } else {
        setLoginLoading(true);
        const type = selected[0];
        const identifier = selected[1] || "";
        await connect(type, identifier);
        setLoginLoading(false);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (loginLoading) {
      const timer = setTimeout(() => {
        if (status !== WalletStatus.WALLET_CONNECTED) {
          window.location.reload();
        }
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [loginLoading, status]);

  return (
    <>
      {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 ? (
        <div className="relative flex justify-center items-center">
          <button
            className="flex md:min-w-[327px] w-full md:leading-[38px] leading-[25px] z-10 items-center justify-center gap-[10px] px-[45px] py-[10px] rounded-[100px] hover:cursor-pointer bg-gradient-to-r to-[#0080FF] from-[#00AAFF]"
            onClick={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            {showTooltip && (
              <div className="font-pretendard absolute tooltip md:text-[28px] text-[24px] md:leading-[33px] leading-[28px] hover:cursor-default">
                {truncate(wallets[0].xplaAddress, [5, 4])}
                <div
                  className="font-pretendard border-solid border-[1px] border-[#000080] text-[#000080] md:px-[28px] px-[4px] py-[8px] font-medium md:text-[22px] text-[19px] md:leading-[26px] leading-[22px] rounded-[8px] hover:cursor-pointer mt-[10px]"
                  onClick={() => disconnect()}
                >
                  Disconnect Wallet
                </div>
              </div>
            )}
            {truncate(wallets[0].xplaAddress, [5, 4])}
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setShowTooltip(false);
            clickConnect();
          }}
          className="flex md:min-w-[327px] md:leading-[38px] leading-[25px] z-10 items-center justify-center gap-[10px] px-[45px] py-[10px] rounded-[100px] hover:cursor-pointer bg-gradient-to-r to-[#0080FF] from-[#00AAFF]"
        >
          Connect Wallet
          {loginLoading && (
            <CircularProgress size={24} style={{ color: "white" }} />
          )}
        </button>
      )}
    </>
  );
}
