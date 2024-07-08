import { useMediaQuery } from "@mui/material";
import "./App.css";
import Modal from "./components/Modal";
import Verify from "./components/Verify";
import { WalletStatus, useConnectedWallet, useWallet } from "@xpla/wallet-provider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import VerifyConnect from "./components/Connect/VerifyConnect";
import clsx from "clsx";
import ModalVerify from "./components/ModalVerify";

function AppVerify() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { status, wallets, refetchStates } = useWallet();
  const connectedWallet = useConnectedWallet();
  const [buttonText, setButtonText] = useState<string>("Sign Message");
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (status === WalletStatus.WALLET_CONNECTED && wallets.length > 0) {
      setInterval(() => {
        refetchStates()
      }, 50 * 1000)
    }
  }, [status]);

  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("discord");

  if (!queryParam) {
    window.location.replace("/");
    return <></>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="w-[1180px] flex justify-between font-sora-700 text-gradient-moreblue md:text-[30px] text-[16px]">
          <span>XPLA Wallet Verification</span>
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
                Verify your {isMobile && <br />} XPLA wallet!
              </span>
            </div>
            <span className="md:text-[30px] md:mt-[0px] mt-[9px] md:leading-[36px] text-[13px] font-medium leading-[16px] text-white">
              Check Your Eligibility
              {isMobile && <br />} for the Discord Role
            </span>
          </div>
          <div className="flex md:flex-row flex-col justify-start md:gap-[20px] text-white font-sora-500 md:text-[30px] text-[20px]">
            <VerifyConnect />
            {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 && connectedWallet &&
              (buttonText !== "Back to Discord!" ? <button
                onClick={async () => {
                  try {
                    const queryJson = JSON.parse(Buffer.from(queryParam, 'base64').toString());
                    const { userId, interactionToken, timestamp, username } = queryJson;
                    const startTime = new Date(timestamp);
                    const now = new Date();
                    const diffMin = (now.getTime() - startTime.getTime()) / (60 * 1000);

                    if (diffMin > 5) {
                      setError("Time over!")
                      throw new Error("Time Over!");
                    }

                    const signMessages = `XPLA_Bot asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees.\n\n- User : ${username} | ${userId}\n- Timestamp : ${timestamp}`;
                    const result = await connectedWallet.signBytes(Buffer.from(signMessages));

                    const a = await axios.post(`${process.env.REACT_APP_ENV === "development" ? "http://localhost:5641" : "https://dimension-discord.xpla.dev"}/signresult`, {
                      signbytes: result,
                      address: connectedWallet.xplaAddress,
                      userId,
                      interactionToken,
                      username,
                      timestamp,
                    });

                    if (a.data?.result) {
                      setError(undefined);
                      setButtonText("Back to Discord!")
                    } else {
                      setError(a.data?.reason || "");
                      throw new Error("Sign Error!");
                    }

                  } catch (e) {
                    console.log(e);
                    // Please
                    setButtonText("Verify again on Discord")
                  }
                }}
                className="relative flex md:leading-[38px] leading-[25px] justify-center items-center border-solid border-[1px] border-white px-[45px] py-[10px] rounded-[100px] md:mb-[0px] mb-[20px]"
              >
                {buttonText}
                {
                  error && <span className="absolute text-red-600 md:left-0 text-[20px] bottom-[-40px]">
                    {error}
                  </span>
                }
              </button> :
                <a
                  rel="noopener noreferrer"
                  href="https://discord.gg/TzSEKJe3WB"
                  className="relative flex md:leading-[38px] leading-[25px] justify-center items-center border-solid border-[1px] border-white px-[45px] py-[10px] rounded-[100px] md:mb-[0px] mb-[20px]"
                >
                  {buttonText}
                </a>)
            }
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
      <Verify />
      <Modal />
      <ModalVerify setError={setError} setButtonText={setButtonText} />
    </div>
  );
}

export default AppVerify;
