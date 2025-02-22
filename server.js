const express = require('express');
const Moralis = require('moralis').default;
const dotenv = require('dotenv');
const cors = require('cors');
const { EvmChain } = require('@moralisweb3/common-evm-utils');

dotenv.config();
const app = express();
const port = 4000;

// Allow access to React app domain
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get('/api/fetch-blockchain-data', async (req, res) => {
  const { address } = req.query;
  try {
    // Promise.all() for receiving data async from multiple endpoints
    const [
      nativeBalance,
      tokenBalances,
      activeChains,
      defiPositionsSummary,
      resolvedAddress,
      walletNFTs
    ] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.ETHEREUM,
        address,
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.ETHEREUM,
        address,
      }),
      Moralis.EvmApi.wallets.getWalletActiveChains({
        address,
      }),
      Moralis.EvmApi.wallets.getDefiPositionsSummary({
        chain: "0x1",
        address,
      }),
      Moralis.EvmApi.resolve.resolveAddress({
        address,
      }),
      Moralis.EvmApi.nft.getWalletNFTs({
        chain: "0x1",
        address,
        format: "decimal",
        mediaItems: false,
      }),
    ]);

    // Logging the results of each API call
    console.log('Native Balance Result:', nativeBalance?.result?.balance?.ether || null);

    console.log('Token Balances Result:', tokenBalances?.result?.map((token) => token.display()) || []);

    console.log('Active Chains Result:', activeChains?.result || []);

    console.log('DeFi Positions Summary Result:', defiPositionsSummary?.result || {});

    console.log('Resolved Address Result:', resolvedAddress?.result || null);

    console.log('Wallet NFTs Result:', walletNFTs?.result || []);

    res.status(200).json({
      // Formatting the output
      address,
      nativeBalance: nativeBalance?.result?.balance?.ether || null,
      tokenBalances: tokenBalances?.result?.map((token) => token.display()) || [],
      activeChains: activeChains?.result || [],
      defiPositionsSummary: defiPositionsSummary?.result || {},
      resolvedAddress: resolvedAddress?.result || null,
      walletNFTs: walletNFTs?.result || [],
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching blockchain data:', error);
    res.status(500).json({ error: error.message });
  }
});

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.get("/", (req, res) => {
    res.json({ message: "Backend is running fine." });
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer();
