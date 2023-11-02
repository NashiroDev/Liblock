**Liblock v1**

October 2023

**1. Introduction**

Since the existence of society, information has played a crucial role in our understanding of the world and our ability to make progress, both individually and collectively. In today's digital age, accessing information has become easier than ever before. With just a computer or a smartphone, we can effortlessly seek news, articles, and even create our own content.

However, this ease of access has also given rise to a significant problem - the proliferation of false information and deliberate attempts to manipulate or conceal the truth. The Ethereum blockchain provides a solution to this problem by enabling the storage of information on a public ledger that is accessible to anyone with an internet connection. By leveraging the power of smart contracts on the blockchain, we can establish rules and protocols to filter out unwelcome information.

This is the primary objective of Liblock - to create a decentralized platform that ensures the authenticity and reliability of information.

**2. What is Liblock**

Liblock is a decentralized application (dApp) that functions similarly to popular information-sharing websites such as Wikipedia or Medium. However, unlike traditional platforms, each article submitted to the Liblock smart contract is initially considered a proposal. This unique feature allows for a more rigorous review process, ensuring the accuracy and integrity of the information published on Liblock.

Once a proposal is accepted, it becomes available for anyone to read via the Liblock user interface (UI). This ensures that even users who are not blockchain-savvy can easily access and benefit from the platform's content.

Liblock aims to be both a Web2 and Web3 application, providing a seamless experience for all users. While anyone can read articles without connecting a wallet or engaging in blockchain-related activities, those who connect a wallet gain access to the "backend" of the Liblock app. This includes the ability to propose articles, read and vote on proposals, but also grant elligibility to a reward system.

**3. Liblock tokenomics**

Liblock introduces the $LIB token as the key element in accessing and participating in the Liblock ecosystem. Each token holder will have the ability to delegate or stake their tokens. Delegating voting power enables token holders to vote for proposals, whereas stacking tokens grant furthest advantage as listed below :

- $LIB tokens stacked are also delegated to the stacker.
- When stacking $LIB, a reward token named $rLIB is minted to the stacker wallet. The amount minted is equal to the amount of $LIB stacked \* ratio.
- $rLIB tokens owned are also delegated to the stacker.
- $rLIB tokens are virtually consummables to propose a new article
- $rLIB tokens also grant the holders shares in the redistribution contract and they'll be able to claim dividends each epoch.

**Let's first look at the $LIB token ;**

Token name : Liblock (LIB)

Total supply/Max supply : 75 000 000 (\* 10\*\*18 decimals)

Contract : 0x55564

This token has a particularity, as there are buy, sell and transfer fees that are dynamic depending of the amount that is moved. The bigger the amount of tokens moved, the bigger the fees.

The fees are calculated based on different ranges : 0. to 10, 10 to 100, 100 to 1000, …, 10M

Each range has a specific % increase per new token moved, you can see it in the following table :

| **Amount** | **1 buy** | **10 buy** | **brut dif** | **% dif** | **% increase** |
| --- | --- | --- | --- | --- | --- |
| **10** | 9.999 | 9.999 | 0 | 0 | 1000\*10\*\*-6 |
| --- | --- | --- | --- | --- | --- |
| **100** | 99.9 | 99.99 | 0.09 | 0.09009 | 2222\*10\*\*-7 |
| **1000** | 997 | 999 | 2 | 0.2 | 500\*10\*\*-7 |
| **10000** | 9925 | 9970 | 45 | 0.45 | 416\*10\*\*-7 |
| **100000** | 95500 | 99250 | 3750 | 3.93 | 83\*10\*\*-7 |
| **1000000** | 880000 | 955000 | 75000 | 8.25 | 22\*10\*\*-7 |
| **10000000** | 6800000 | 8800000 | 2000000 | 29.41 | 8\*10\*\*-7 |
| **100000000** | 48000000 | 68000000 | 20000000 | 41.67 | max 52% |

Legend :

- « 1 BUY » : Amount of $LIB received for the amount moved in one time.
- « 10 BUY » : Amount of $LIB received for the amount moved in ten times.
- « BRUT DIF » : Difference in $LIB between the amount received for a one time transaction and for doing 10 transactions of 1/10 of the amount.
- « % DIF » : Difference in % of $LIB received between the amount received for a one time transaction and for doing 10 transactions of 1/10 of the amount.
- « % INCREASE » : Increase of the fee in % per new token moved in the current range (i.e : from 10 to 100, each new token will add flat 1000\*10\*\*-6 % to the fees).

Note : the max amount of fees is attained at 35M tokens for 52%.

This graphic here shows the base fees per new range :

![Example Image](/public/images/FeesAmountLIB.png)

This fee measure is taken in order to limit whales potential impact on the governance and the token financial price, as acquering a large number of tokens in a single purchase isn't worth it, or dumping a large bag is cheaper to do little by little. This mecanism aim to benefit to the largest number of peoples, so that anyone can exist in the ecosystem.

The fees generated through this process are send to 4 differents recipients :

- 10% goes to the dev wallet(me)
- 20% goes to the Liblock foundation wallet
- 7.5% are burnt
- 62.5% goes to the distribution contract

Note : the fees recipients can be changed after deployment, as well as the shares.

Note : the moving fees does not occur when stacking or withdrawing tokens to the designated contract, or when claiming from the distribution contract.

Moving to the tokens allocation :

![Example Image](/public/images/LIB_allocation.png)

**Now let us look at the $rLIB token ;**

Token name : rLiblock(rLIB)

Max supply : 150 000 000 (\* 10\*\*18 decimals)

Contract : 0x9a56b

This token is non-tradable, non-transferable. It is only issued when stacking $LIB and burned after withdrawing, with a ratio of maximum 1:2 LIB/rLIB. The ratio applicated to the $LIB tokens is greater the longest you decide to stake and lock the tokens. Here is a table showing the different choice available :

| 17 days | 31 days | 93 days | 186 days | 279 days | 365 days |
| --- | --- | --- | --- | --- | --- |
| 1 ratio | 1.05 ratio | 1.25 ratio | 1.45 ratio | 1.6 ratio | 1.7 ratio |

Note : the maximum lock time gives a 1.7 ratio, but the $LIB / $rLIB ratio is 1:2. It is defined like this so that the missing 0.3 can be obtained through active participation in the ecosystem.

Here is the tokens allocations :

![Example Image](/public/images/rLIB_allocation.png)

Note : the $rLIB held by an address are proof that it has stacked tokens. Therefore holding $rLIB does not neccessarily mean that an address is partaking in the ongoing epoch for distribution, as they hold no more utility the moment the originals $LIB tokens stacked that generated those $rLIB tokens get withdrawables.

**4. Fee redistribution**

As stated previously, « $rLIB tokens also grant the holders shares in the redistribution contract and they'll be able to claim dividends each epoch ».

The proccess of stacking $LIB and getting $rLIB, handled by the stacking contract, implicate another contract wich is the Distributor contract (0x6a75cf…). This contract will get the data of any stakes that occur on the Stacking contract(0x9s456…) and issue shares depending of the amount of $rLIB minted for the stake, as well as the lock and unlock periods. These shares are replicated each epoch as long as the unlock period is after the next epoch start. Here is a graphical representation of this process :

![Example Image](/public/images/DistribFees.png)

An epoch is 30 days long. When an epoch ends, it has to be manually updated to calculate the total amount of tokens to distribute, to who and how many. After that is done, the deposits initiated in the previous and current epoch are scanned to discard ones that have expired and issue shares for those still viable during the next epoch. Here is a visual representation of the process for a new epoch :

![Example Image](/public/images/newEpochFee.png)

Note : when the current epoch end time is reached, it is no longer possible to stake new $LIB until the next epoch is succesfully attained.

Note : claimable tokens obtained through an epoch are summed up to all the previous unclaimed ones.

Once an epoch has ended and the calcul are done, the user can claim the tokens allocated to him during the epoch. When it is done, the amount withdrawed is substracted to the total tokens unclaimed and the user total claimable tokens.

**5. Article governance**

The article governance proccess is based on the holdings of $LIB and $rLIB.

Any address holding $rLIB can submit a proposal as long as they have at least n amount of virtual $rLIB power remaining.

The amount of VP(Virtual Power) is determined by the amount of $rLIB holded minus the power used for creating proposals.

That power needed to create a proposal is determined dynamically by the Proposal contract (0x6a4b…) depending on the $LIB token price. The goal is to keep entry in the ecosystem accessible for new users by setting a flat $ price per proposal.

The minimal VP required for submitting a proposal is calculated every 7 days with the following equation :

**Floor = Target price / $LIB price**

Floor is the amount of $rLIB consumed for a proposal

Target price is the $ cost equivalent for the Floor

$LIB price is the actual price for one $LIB token in $

Note : the target price is initially set to 10$. Each new balancing, the target price rise by 1/2000 of it's last price

Here are graphical representations of the caracteristics of the Proposal contract(0x6a4b…) :

![Example Image](/public/images/VPGovern.png)

![Example Image](/public/images/governProcess.png)

**6. Proposals structure**

The required fields that the user has to fill in order to submit a proposal are simple: a title and a description. Once these fields are filled and the proposal is submitted, it will be stored on-chain in the following structure:

![Example Image](/public/images/ProposalStruct.png)

Note : the description field will be an IPFS reference to minimize gas cost and allow the use of media in an article.

Note : the maximum vote power for an address is caped at 0.1% of $LIB total supply + $rLIB current supply. Any overflow of vote power goes to the abstain vote category.

Furthermore, a "theme" field will be present on the Liblock UI but not stored on-chain to reduce complexity. This field will allow users to better find theme-related articles.

**7. UI access**

Here are the different access for users depending of their profil :

![Example Image](/public/images/UIaccess.png)

**8. Roadmap**

The roadmap for Liblock is as follows:

- Q4 2023 : Deployment on Testnet when the Liblock contracts will be fully functional, and the website developed to a satisfactory level. The deployment on the testnet will allow for thorough testing and gathering user feedback.

- Mainnet Release : Following the testnet deployment, the Liblock platform will undergo a comprehensive testing and stress period to identify and address any potential issues or vulnerabilities. The specific blockchain on which the Liblock contracts will be deployed is yet to be determined. The decision will be based on factors such as security, scalability, and community consensus.

- Transition to Liblock DAO : Once all the main components are integrated and the stage is set, the authority over Liblock will be fully transferred to the community. The method is yet to be determined.

We are committed to ensuring a robust and reliable platform for our users, and the mainnet release will be scheduled once all necessary testing and preparations have been completed.

**9. Development ideas**

Here is a list of potential functionalities that may or may not be implemented before the beta release of Liblock :

- Each article having a "deprecated" button that increments the counter each click in order to notify the readers.
- A reward system in LIB or ETH for active community members. (done)
- A profile system to enable following authors.
- Fee of x% when buying/selling/transfering LIB. (done)
- Swap ETH-LIB directly on the Liblock website.
- A trust system for authors.
- Payable/private articles.
- Author can propose an update for his article / web3 user can submit an updated version of an article to his author --\> author chooses to propose the update or not.
- An AI whose knowledge come only from articles on Liblock
- Author can pay LIB token to put forward an article
- …

Please note that the implementation of these ideas will depend on various factors, including technical feasibility, community feedback, and the overall project roadmap.
