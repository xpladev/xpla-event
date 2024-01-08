import { useMediaQuery } from "@mui/material";
import "./App.css";
import Connect from "./components/Connect";
import Main from "./components/Main";
import Modal from "./components/Modal";

function App() {
  const isMobile = useMediaQuery("(max-width:768px)");

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
      <div className="bg-black bg-star md:h-[620px] h-[330px] flex justify-center items-center md:px-[20px]">
        <div className="w-[1180px] h-full flex flex-col md:gap-[80px] justify-center md:items-start items-center relative">
          <div className="flex flex-col md:gap-[15px] justify-start font-sora-700  md:text-start text-center md:mb-[0px] mb-[20px]">
            <div className="text-gradient">
              <span className="md:text-[65px] text-[36px] md:leading-[82px] leading-[40px]">
                New Event {isMobile && <br />} Coming Soon!
              </span>
            </div>
            <span className="md:text-[30px] md:mt-[0px] mt-[9px] md:font-semibold md:leading-[36px] text-[13px] font-medium leading-[16px] text-white">
              Stay Tuned to XPLA Community for
              {isMobile && <br />} Upcoming Events.
            </span>
          </div>
          <div className="flex md:flex-row flex-col justify-start md:gap-[20px] text-white font-sora-500 md:text-[30px] text-[20px]">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://linktr.ee/xpla_official"
              className="flex md:leading-[38px] leading-[25px] justify-center items-center border-solid border-[1px] border-white px-[45px] py-[10px] rounded-[100px] hover:cursor-pointer md:mb-[0px] mb-[20px]"
            >
              Official Links
            </a>
            <Connect />
          </div>
          <img
            src="/img/wallet.svg"
            className="block max-[1400px]:hidden absolute left-[774px] bottom-[0px]"
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
      <Main />
      <Modal />
    </div>
  );
}

export default App;
