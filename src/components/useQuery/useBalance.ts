import { useQuery } from '@tanstack/react-query';
import axios from "axios"

const useBalance = (address: string) => {
    return useQuery({
        queryKey: ['balance', address],
        queryFn: async () => {
            const { data } = await axios.get<{balance : {denom : string, amount : string}}>(`https://dimension-lcd.xpla.dev/cosmos/bank/v1beta1/balances/${address}/by_denom?denom=axpla`);
            return data;
        },
        staleTime : 6000,
        gcTime : 6000,
        refetchInterval: 6000
    })

}

export default useBalance