import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import { bech32 } from "bech32"
import { toChecksumAddress } from "ethereumjs-util";

const useTx = (address: string) => {
  return useQuery({
    queryKey: ['tx', address],
    queryFn: async () => {
      try {
        const { data } = await axios.get<{ account: { sequence: string } }>(`https://dimension-lcd.xpla.dev/cosmos/auth/v1beta1/accounts/${address}`);
        const { data: evmtx } = await axios.post('https://dimension-evm-rpc.xpla.dev', {
          jsonrpc: "2.0",
          method: "eth_getTransactionCount",
          params: [bech32ToEthereumAddress(address), "latest"],
          id: 1,
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (evmtx) {
          return Number(data?.account?.sequence || 0) + parseInt(evmtx.result, 16);
        }
        return Number(data?.account?.sequence || 0);
      } catch (e) {
        return 0;
      }
    },
    staleTime: 6000,
    gcTime: 6000,
    refetchInterval: 6000
  })

}

export default useTx;

const { decode, fromWords } = bech32;

const bech32ToHex = (bech32: string) => {
  try {
    const { words } = decode(bech32);
    const hex = Buffer.from(fromWords(words));
    return hex;
  } catch {
    return '';
  }
}
const bech32ToHexAddress = (bech32: string) => {
  const hex = bech32ToHex(bech32);
  const hexAddress = '0x' + hex.toString('hex').toLowerCase();
  return hexAddress;
}

const bech32ToEthereumAddress = (bech32: string) => {
  const hexAddress = bech32ToHexAddress(bech32);
  const ethereumAddress = toChecksumAddress(hexAddress);
  return ethereumAddress;
}