import { useMediaQuery } from "@mui/material";
import "./App.css";
import Modal from "./components/Modal";
import Draw from "./components/Draw";
import { WalletStatus, useConnectedWallet, useWallet } from "@xpla/wallet-provider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import VerifyConnect from "./components/Connect/VerifyConnect";

function AppDraw() {
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
        <div className="w-[1180px] flex justify-between font-sora-700 text-gradient md:text-[30px] text-[16px]">
          <span>XPLA EVENT</span>
          <div className="flex justify-center items-center md:gap-[15px]">
            <img
              src="/img/xlogo.svg"
              width="30px"
              height="30px"
              alt="xlogo"
              onClick={() => {
                window.open("https://twitter.com/XPLA_Official");
              }}
              className="md:mr-[0px] mr-[12px] md:w-[30px] w-[22px] md:h-[30px] h-[22px] md:hover:cursor-pointer md:hover:opacity-80"
            />
            <img
              src="/img/mediumlogo.svg"
              width="30px"
              height="30px"
              alt="mediumlogo"
              onClick={() => {
                window.open("https://medium.com/xpla-ecosystem");
              }}
              className="md:mr-[0px] mr-[12px] md:w-[30px] w-[22px] md:h-[30px] h-[22px] md:hover:cursor-pointer md:hover:opacity-80"
            />
            <img
              src="/img/telelogo.svg"
              width="30px"
              height="30px"
              alt="telelogo"
              onClick={() => {
                window.open("https://t.me/Official_XPLA");
              }}
              className="md:w-[30px] w-[22px] md:h-[30px] h-[22px] md:hover:cursor-pointer md:hover:opacity-80"
            />
          </div>
        </div>
      </header>
      <div className="bg-black bg-star md:h-[calc(100vh-280px)] h-[calc(100vh-160px)] flex justify-center items-center md:px-[20px]">
        <div className="w-[1180px] h-full flex flex-col md:gap-[80px] justify-center md:items-start items-center relative">
          <div className="flex flex-col md:gap-[15px] justify-start font-sora-700  md:text-start text-center md:mb-[0px] mb-[20px]">
            <div className="text-gradient">
              <span className="md:text-[65px] text-[36px] md:leading-[82px] leading-[40px]">
                Verify your {isMobile && <br />} XPLA wallet!
              </span>
            </div>
            <span className="md:text-[30px] md:mt-[0px] mt-[9px] md:font-semibold md:leading-[36px] text-[13px] font-medium leading-[16px] text-white">
              Stay Tuned to XPLA Community for
              {isMobile && <br />} Upcoming Events.
            </span>
          </div>
          <div className="flex md:flex-row flex-col justify-start md:gap-[20px] text-white font-sora-500 md:text-[30px] text-[20px]">
            <VerifyConnect />
            {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 && connectedWallet &&
              <button
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
                    
                    const a = await axios.post(`${process.env.REACT_APP_ENV === "development" ? "http://localhost:5641" : "https://dimension-discord.xpla.dev/discord"}/drawresult`, {
                      signbytes: result,
                      address: connectedWallet.xplaAddress,
                      userId,
                      interactionToken,
                      username,
                      timestamp,
                    });

                    if (a.data?.result) {
                      setError(undefined);
                      setButtonText("Wallet Connected!")
                    } else {
                      setError(a.data?.reason || "");
                      throw new Error("Sign Error!");
                    }

                  } catch (e) {
                    console.log(e);
                    // Please
                    setButtonText("Please Refresh and Retry!")
                  }
                }}
                className="relative flex md:leading-[38px] leading-[25px] justify-center items-center border-solid border-[1px] border-white px-[45px] py-[10px] rounded-[100px] hover:cursor-pointer md:mb-[0px] mb-[20px]"
              >
                {buttonText}
                {
                  error && <span className="absolute text-red-600 md:left-0 text-[20px] bottom-[-40px]">
                    {error}
                  </span>
                }
              </button>
            }
          </div>
          <img
            src="/img/wallet-draw.svg"
            className="block max-[1400px]:hidden absolute left-[774px] "
            alt="vault-wallet"
            width="506px"
            height="620px"
          />
          <img
            src="/img/mobile-left.svg"
            className="md:hidden block absolute left-[0px] top-[114px]"
            alt="vault-wallet"
            width="78px"
            height="80px"
          />
          <img
            src="/img/mobile-right.svg"
            className="md:hidden block absolute right-[0px] bottom-[0px]"
            alt="vault-wallet"
            width="100px"
            height="102px"
          />
        </div>
      </div>
      <Draw />
      <Modal />
    </div>
  );
}

export default AppDraw;
