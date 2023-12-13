import "./App.css";
import Connect from "./components/Connect";
import Main from "./components/Main";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="w-[1180px] flex justify-start font-sora-700 text-gradient md:text-[30px] text-[16px]">
          <span>XPLA EVENT NOW LiVE</span>
        </div>
      </header>
      <div className="bg-black bg-star md:h-[620px] h-[330px] flex justify-center items-center md:px-[10px]">
        <div className="w-[1180px] h-full flex flex-col md:gap-[80px] justify-center md:items-start items-center relative">
          <div className="flex justify-start font-sora-700 text-gradient md:text-start text-center md:mb-[0px] mb-[40px]">
            <span className="md:text-[65px] text-[26px] md:leading-[82px] leading-[35px]">
              Connect your wallet
              <br />
              and join the event NOW!
            </span>
          </div>
          <div className="flex md:flex-row flex-col justify-start md:gap-[20px] text-white font-sora-500 md:text-[30px] text-[20px]">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://zealy.io/c/xpla/questboard"
              className="flex md:leading-[38px] leading-[25px] justify-center items-center border-solid border-[1px] border-white px-[45px] py-[10px] rounded-[100px] hover:cursor-pointer md:mb-[0px] mb-[20px]"
            >
              XPLA Zealy Quest
            </a>
            <Connect />
          </div>
          <img
            src="/img/wallet.svg"
            className="md:block hidden absolute left-[774px] bottom-[0px]"
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
