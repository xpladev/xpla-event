import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const useTx = (address: string) => {
  return useQuery({
    queryKey: ['tx', address],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`https://dimension-lcd.xpla.dev/cosmos/auth/v1beta1/accounts/${address}`);
        return Number(data?.account?.sequence || data?.account?.base_account?.sequence || 0);
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
