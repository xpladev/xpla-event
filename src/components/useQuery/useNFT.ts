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
            const NFTList = [
                'xpla1paa5dm2glgmets9yxafa4w68w5hymthh0as8em80684ntmd930jqvk269d',
                'xpla10y8j5tyhmqkztezz8n3hv0h9dd3l4x8y54p2889fcxna3mgga4asq3jpy9',
                'xpla1cl8rsqkhpequdy2l0z6ctyssp4u8dlmx7pj67qrwv4y85z6s9s2sft492r',
                'xpla1ppfu23xc5t5gsgl2fx3upe8xz89tnjt6excyar0676p50k0rfgjqsj4anv',
                'xpla1xakvezxsqzlz3t5u534n6ql07clvzvwx640hd6qy9heua6wvccmszugy92',
                'xpla1vy2nzgyegualecxvn9neuuwnemuc6qn0mpqrq4yyc2vtfsl9q5yslfct3k',
                'xpla1mg46fqz7ezdcfpp6yxmcylj8325urxhdcleyqg5l27uehyyjs5tqz5yf8m',
                'xpla1mv8luxmtt2afvvldtufg9ht8ut9ff6r4tpqac8792f4efhdg04kqdn5lsq',
                'xpla1jkte0pytr85qg0whmgux3vmz9ehmh82w40h8gaqeg435fnkyfxqqlyua4d',
                'xpla1uev4xdc2h04qyavg4ttmejnd969cjekuusvpztrph8fr7uq4ydesafe4e2',
                'xpla16y344e8ryydmeu2g8yyfznq79j7jfnar4p59ngpvaazcj83jzsms35lt0h',
                'xpla18egdakntewpnhr9u4wml6rygyszzanapquefkn4fmywt9uevvwzsa7awnm',
                'xpla1udfs22xpxle475m2nz7u47jfa3vngncdegmczwwdx00cmetypa3scjuy7v',
                'xpla1ftrf6kfszq7kec05caf46nrnrpkqe8x7etljarwd7fz6clktf7kqa3djmw',
                'xpla18tt7jgvfc9x8a76jtx3hhggs0ppvt5xqd529us58jgzx7n4zw60sjj9599',
                'xpla1raj8pcz3sy88tgq2z7whe4zm2vtqxg6hspmhw3wyk9ggfh036kjs048m5g',
                'xpla1fjvnr96n8kcl6d8qzr74klqjl9wakmqv5c9hzvqwr904kp34ye8qv3h28n',
                'xpla1r3us73z564xxxcessqmc4h0dwh8j4z6sxn2730ag09mq87hlrkzqhlzyr3',
                'xpla18vq6emxwq0s77wpt0f5e4zujdjfndcs0kqlr7u8nn2uwv03nef8qfhdn2l',
                'xpla16f4w972g2w5p7sng86ysqfq5txxxq7zhl7z5plq8mux85yfcdlssz6y2ul',
                'xpla1ehyucudueas79h0zwufcnxtv7s2sfmwc6rt0v0hzczdgvyr3p56q5wvxsl',
                'xpla1xzdpn9ymu2zqfceuqzufyxmtt8fp8hsmze4vt77k0u7g7qlyvqfs2jdx00',
                'xpla1q23d30x94cm8ve243pxdc52m398r4l5ecgcfp8tud3vggcsq8s2qwx74dj',
                'xpla1k8re7jwz6rnnwrktnejdwkwnncte7ek7gt29gvnl3sdrg9mtnqksd6yw8f',
                'xpla1qjxu65ucccpg8c5kac8ng6yxfqq85fluwd0p9nt74g2304qw8eyqwwznt8',
                'xpla1jnufunj5e8cregmjmrw20r4egu789fcuztgdtsvj0vq6k39w7axszyz5dv',
                'xpla1053qs4vcdnul422vvmuupkkm53x4khnfxaxldwj0pvy385c8gscsggx9dn',
                'xpla18sznh386yxtapskga6pm4g20juzx3z9gqzv4qhgtsrjmjah06dmq9fywk8',
                'xpla1vrgxg85tglkdfz04wjenysmzl3nr43gxdqex6hj8wqwnp8ppnfgsstjcm2',
                'xpla1amxae6vzsqqk2dd65culx076u97ks65nuz5uvtq9ynmphw2kthpq62yst6',
                'xpla1shtrpay9sx6qulk2tpxlne6a32hk69evpg8a7yxmatgzxf9gjp3qvz3xsq',
                'xpla1y8ghk8q8d2rswrf3gv7hv2lfsewu8tvp6ysnlkzspu7k0aqkthdqdz0zur',
                'xpla1vkjpp8usapkd4hx4mj6dhtaudcqdwazydvyg3jdfgkj8gdzxrecsvaad84',
                'xpla1mjpztpjzre4ex60l9d9wzqrr58m9nsjajatfe2ltx8vt3rc9xqjs3rrpf7',
                'xpla1axqkcew6a6ca596tetds66as733kdav6n38669xa23vxldss5q7qcxmm40',
                'xpla1sgrknjmwqkemch07we00gvxdpehdpv9crsvjgrtajxwudch7shcq56ly23',
                'xpla1tmpvu4g964qcg0mvvxhhttw8ryrjr5sg8uqdsxhcy8vhglc5qw5qx85xg8',
                'xpla19utfu9zym5d6czc3juk6na6uwfuyutl9mpjd67acxp2h46q45f5sjxksux',
                'xpla1547zpnpahkmzz8e4ltqh4gakztkm8eyed7ggrw3hqvhcvexw6f6qrj6w9k',
                'xpla1tv0h6cjmyly98fqs0w5xumm0a8csfmf8lsztu0tewhlh5d7ykuhs9v30qg',
                'xpla14v73z8ltt9sekglxrjfsk9fjzc95ag0cspk3aphqsax8l6c6kcaqz46yds',
                'xpla1x5x8sqrks90f8dylfklt0yktc8dkvz9yvynywd6q27ffqgret77sh35t0m',
                'xpla14y89386w0t055pnlwpy8gdt706nq0h39p7vct2kgzeldv5vxae9q4e49s0',
                'xpla1dzkx6xwtzrnn3n2wwyax85zjcdvvvqfye752nd5dxpe8sdrz6aessyradg',
                'xpla14gm98jxefrcz0tl6rpzeyuu3vjlj900me5j35h7p4pazhjepcfks0frksc',
                'xpla1dzfpvlql0gwndwyy769lurcdcxx58qqquj07xj5gf2ceq6pnfg7s8n3y47',
                'xpla10fqy0npt7djm8lg847v9rqlng88kqfdvl8tyt4ge204wf52sy68q9ylctk',
                'xpla1ae3s5jpjy0hu5xedhauxmhkap8mqj45m2zegf3pwcdzf7dt2f2wq33vmxm',
                'xpla1up07dctjqud4fns75cnpejr4frmjtddzsmwgcktlyxd4zekhwecqtcfwjd',
                'xpla1zqxumcjlmntd9yf34h5xsn6hd95af7p78d9wj7t7n8d0xauwmf3s65t3n4',
                'xpla1823qj9q6eruxv8mfwfay87zd9pp66ayq0ckp9xttk0e758a6kl9q3v79h7',
                'xpla1m8cdpf4khgh6ymq8pascc4fns7r5hu28qtx5prhj7mna3f72ulequxxsdh',
                'xpla1fxehy7nhapdspnj989uuekda8sxv57xvq6wwj6kjtk670gzdf5fsp85mej',
                'xpla18q7cla9ty528ehffqu9frvyc0djcr4plcpfnnfuumyyc03z7fnkstg72ws',
                'xpla1lqdtss3elpnch373m6xnnu7evfrshnykp5epflwspalpxzqhl75qg78sk5',
                'xpla1k3f08vztd27snjpdlnv0kznkkxpjuqtn8m3tamwa68anuklfv2dqd7tdzj',
                'xpla1mxgcw8gtezt6kslpj4ndyvtug9jjn3s4jnwljre85ad7tqdmewmqjl7s4x',
                'xpla198dvhzfy6mrd2cschjta0wl43ft33lfcvdyxqhewqjj8jc8yju8qwdkjzj',
                'xpla1qezku99qamkyc660lk8t4txt9gjstur7s9gal9c92ejn25lluuas5hxwcu'
            ]

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
