import { Modal as MuiModal } from "@mui/material";
import useModalVerify from "../../zustand/useModalVerifyOpen";
import { useConnectedWallet, useWallet, WalletStatus } from "@xpla/wallet-provider";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ModalVerify = ({ setError, setButtonText }: { setError: React.Dispatch<React.SetStateAction<string | undefined>>, setButtonText: React.Dispatch<React.SetStateAction<string>> }) => {
  const { modalOpen, setModalOpen } = useModalVerify();
  const { status, wallets } = useWallet();
  const connectedWallet = useConnectedWallet();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("discord");

  if (!queryParam) {
    return <></>;
  }

  return (
    <MuiModal open={modalOpen} onClose={() => {setModalOpen(false)}}>
      <div
        className=" md:w-[680px] w-[320px] md:h-[438px] h-[299px] modal-bg"
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
          <span className="mb-[45px] text-white font-sora-700 text-[48px] leading-[59px] ">
            Click the button <br />
            to sign the message <br />
            and verify your account.
          </span>
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

                  const signMessages = `XPLA_Bot은 여러분의 주소 소유권을 증명하기 위해, 이 메시지를 서명하기를 요청합니다. 이것은 읽기 전용 접근이고, 어떤 블록체인 트랜잭션도 만들지 않으며, 수수료도 부과하지 않습니다.\n\n- User : ${username} | ${userId}\n- Timestamp : ${timestamp}`;
                  const result = await connectedWallet.signBytes(Buffer.from(signMessages));

                  const a = await axios.post(`${process.env.REACT_APP_ENV === "development" ? "http://localhost:5641" : "https://cube-hive.xpla.dev/discord"}/signresult`, {
                    signbytes: result,
                    address: connectedWallet.xplaAddress,
                    userId,
                    interactionToken,
                    username,
                    timestamp,
                  });

                  if (a.data?.result) {
                    setError(undefined);
                    setButtonText("Back to Discord!");
                    setModalOpen(false);
                  } else {
                    setError(a.data?.reason || "");
                    throw new Error("Sign Error!");
                  }

                } catch (e) {
                  console.log(e);
                  setButtonText("Please Refresh and Retry!");
                  setModalOpen(false);
                }
              }}
              className="font-sora-500 text-[20px] text-white leading-[25px] flex justify-center items-center border-solid border-[1px] border-white px-[121px] py-[10px] rounded-[100px] hover:cursor-pointer "
            >
              Sign Message
            </button>
          }
        </div>
      </div>
    </MuiModal>
  );
};
export default ModalVerify;
