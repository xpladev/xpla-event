import { Modal as MuiModal, useMediaQuery } from "@mui/material";
import useModalWearable from "../../zustand/useModalWearableOpen";
import { useConnectedWallet, useWallet, WalletApp, WalletStatus } from "@xpla/wallet-provider";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ModalWearable = ({ setError, setButtonText }: { setError: React.Dispatch<React.SetStateAction<string | undefined>>, setButtonText: React.Dispatch<React.SetStateAction<string>> }) => {
  const { modalOpen, setModalOpen } = useModalWearable();
  const { status, wallets } = useWallet();
  const connectedWallet = useConnectedWallet();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("discord");
  const isMobile = useMediaQuery("(max-width:768px)");

  if (!queryParam) {
    return <></>;
  }

  return (
    <MuiModal open={modalOpen} onClose={() => {setModalOpen(false)}}>
      <div
        className=" md:w-[680px] w-[320px] md:h-[438px] h-[299px] modal-bg md:px-0 px-[10px]"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 170, 255, 0.80)",
          outlineStyle: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >

        <div className="text-center flex justify-center items-center flex-col ">
          <span className="md:mb-[45px] mb-[20px] text-white font-sora-700 md:text-[48px] md:leading-[59px] text-[25px] ">
            Click the button <br />
            to sign the message <br />
            and verify your account.
          </span>
          {status === WalletStatus.WALLET_CONNECTED && wallets.length > 0 && connectedWallet &&
            <button
              onClick={async () => {
                try {
                  const queryJson = JSON.parse(Buffer.from(queryParam, 'base64').toString());
                  const { userId, interactionToken, timestamp } = queryJson;
                  const startTime = new Date(timestamp);
                  const now = new Date();
                  const diffMin = (now.getTime() - startTime.getTime()) / (60 * 1000);

                  if (diffMin > 5) {
                    setError("Time over!")
                    throw new Error("Time Over!");
                  }

                  const signMessages = `XPLA_Bot asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees.\n\n- User : ${userId}\n- Timestamp : ${timestamp}`;
                  const result = await connectedWallet.signBytes(Buffer.from(signMessages),  isMobile ? WalletApp.XPLA_VAULT : undefined);

                  const a = await axios.post(`${process.env.REACT_APP_ENV === "development" ? "http://localhost:5642" : "https://xpla-discord.xpla.dev"}/wearableresult`, {
                    signbytes: result,
                    address: connectedWallet.xplaAddress,
                    userId,
                    interactionToken,
                    timestamp,
                  });

                  if (a.data?.result) {
                    setError(undefined);
                    setButtonText("Back to Discord!");
                    setModalOpen(false);
                  } else {
                    throw new Error(a.data?.reason || "Sign Error!");
                  }

                } catch (e) {
                  // console.log(e);
                  if (e instanceof Error) {
                    // 에러 객체에서 메시지를 출력
                    setError(e.message);
                  }
                  setButtonText("Verify again on Discord");
                  setModalOpen(false);
                }
              }}
              className="font-sora-500 text-[20px] text-white leading-[25px] flex justify-center items-center border-solid border-[1px] border-white md:w-[380px] w-full py-[10px] rounded-[100px] hover:cursor-pointer "
            >
              Sign Message
            </button>
          }
        </div>
      </div>
    </MuiModal>
  );
};
export default ModalWearable;
