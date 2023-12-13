import { useQuery } from '@tanstack/react-query';
import { AccAddress, LCDClient, ValAddress } from '@xpla/xpla.js';

const lcd = new LCDClient({
    chainID: 'dimension_37-1',
    URL: 'https://dimension-lcd.xpla.dev'
});

export const useDelegations = (address: string, validator?: ValAddress) => {
    return useQuery({
        queryKey: ['stake', validator, address],
        queryFn: async () => {
            const data = await lcd.staking.delegations(address, validator);
            return data
        },
        enabled: (!address || AccAddress.validate(address)) && (!validator || ValAddress.validate(validator)),
        staleTime: 6000,
        gcTime: 6000,
        refetchInterval: 6000
    })
}

export default useDelegations