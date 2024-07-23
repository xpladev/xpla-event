import { useMediaQuery } from "@mui/material";
import "./App.css";
import Modal from "./components/Modal";
import EventMain from "./components/EventMain";
import { WalletStatus, useWallet } from "@xpla/wallet-provider";
import { useEffect } from "react";
import VerifyConnect from "./components/Connect/VerifyConnect";
import clsx from "clsx";

function App() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { status, wallets, refetchStates } = useWallet();

  useEffect(() => {
    if (status === WalletStatus.WALLET_CONNECTED && wallets.length > 0) {
      setInterval(() => {
        refetchStates()
      }, 50 * 1000)
    }
  }, [status]);


  return (
    <div className="App">
      <header className="App-header">
        <div className="w-[1180px] flex justify-between font-sora-700 text-gradient-moreblue md:text-[30px] text-[16px]">
          <span>XPLA EVENT</span>
          <div className="flex justify-center items-center md:gap-[15px]">
            <img
              src="/img/discordlogo.svg"
              width="30px"
              height="30px"
              alt="discordlogo"
              onClick={() => {
                window.open("https://discord.gg/xpla");
              }}
              className="md:w-[30px] w-[22px] md:h-[30px] h-[22px] md:hover:cursor-pointer md:hover:opacity-80"
            />
          </div>
        </div>
      </header>
      <div className={clsx("relative bg-[#000503] flex justify-center items-center md:px-[20px] ", (status === WalletStatus.WALLET_CONNECTED && wallets.length > 0) ? "md:h-[1000px] h-[330px] overflow-visible" : "md:h-[calc(100vh-280px)] h-[calc(100vh-160px)] overflow-hidden")}>
        <div className="absolute w-full max-w-[1919px] md:h-[1800px] h-[calc(100vh-160px)] top-0 right-0 bg-bluelemon " />
        <div className="w-[1180px] h-full flex flex-col md:gap-[80px] justify-center md:items-start items-center relative">
          <div className="flex flex-col md:gap-[15px] justify-start font-sora-700  md:text-start text-center md:mb-[0px] mb-[20px]">
            <div className="text-gradient-moreblue">
              <span className="md:text-[65px] text-[36px] md:leading-[82px] leading-[40px]">
                XPLA DROPS IS ONGOING!
              </span>
            </div>
            <span className="md:text-[30px] md:mt-[0px] mt-[9px] md:leading-[36px] text-[13px] font-medium leading-[16px] text-white">
            Connect your wallet {isMobile && <br />}  and check your assets.
            </span>
          </div>
          <div className="flex md:flex-row flex-col justify-start md:gap-[20px] text-white font-sora-500 md:text-[30px] text-[20px]">
            <VerifyConnect />
          </div>
          {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0
            ?
            <img
              src="/img/newwallet.svg"
              className="block max-[1400px]:hidden absolute left-[774px] "
              alt="vault-wallet"
              width="506px"
              height="620px"
            />
            :
            <img
              src="/img/newwallet.svg"
              className="block max-[1400px]:hidden absolute left-[774px] "
              alt="vault-wallet"
              width="506px"
              height="620px"
            />
          }
        </div>
      </div>
      <EventMain />
      <Modal />
    </div>
  );
}

export default App;
