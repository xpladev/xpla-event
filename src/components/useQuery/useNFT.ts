import { useQuery } from '@tanstack/react-query';
import { LCDClient } from '@xpla/xpla.js';

const lcd = new LCDClient({
    chainID: 'dimension_37-1',
    URL: 'https://dimension-lcd.xpla.dev'
});

const useNFT = (address: string) => {
    return useQuery({
        queryKey: ['nft', address],
        queryFn: async () => {
            const AFC = 'xpla198dvhzfy6mrd2cschjta0wl43ft33lfcvdyxqhewqjj8jc8yju8qwdkjzj';
            const BOPANG_1 = 'xpla1up07dctjqud4fns75cnpejr4frmjtddzsmwgcktlyxd4zekhwecqtcfwjd';
            const CS_NFT = 'xpla1ae3s5jpjy0hu5xedhauxmhkap8mqj45m2zegf3pwcdzf7dt2f2wq33vmxm';
            const ELXfancard = 'xpla14v73z8ltt9sekglxrjfsk9fjzc95ag0cspk3aphqsax8l6c6kcaqz46yds';
            const ELNFT = 'xpla1tv0h6cjmyly98fqs0w5xumm0a8csfmf8lsztu0tewhlh5d7ykuhs9v30qg';
            const MISSION_PATCHES_NFT = 'xpla1ppfu23xc5t5gsgl2fx3upe8xz89tnjt6excyar0676p50k0rfgjqsj4anv';

            const NFTList = [AFC, BOPANG_1, CS_NFT, ELXfancard, ELNFT, MISSION_PATCHES_NFT];

            const nftNumList = await Promise.all(
                NFTList.map(async (nftContract) => {
                    const data = await lcd.wasm.contractQuery<{
                        tokens: string[]
                    }>(nftContract, {
                        tokens: {
                            owner: address
                        }
                    });
                    return data;
                })
            );

            const nftSum = nftNumList.reduce((acc, cur) => {
                if (cur) return acc + cur.tokens.length;
                return 0;
            }, 0);

            return nftSum

        },
        staleTime: 6000,
        gcTime: 6000,
        refetchInterval: 6000
    })

}

export default useNFT
