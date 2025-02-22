import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import useFetchData from '../hooks/useFetchData';

function LoginButton() {
  const { login, user, logout } = usePrivy();
  const [walletConnected, setWalletConnected] = useState(false);
  const walletAddress = user ? user.wallet.address : null;
  const { data, loading, error } = useFetchData(walletAddress);

  const handleLogin = async () => {
    try {
      await login();
      setWalletConnected(true);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setWalletConnected(false);
  };

  return (
    <div>
      {!walletConnected ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          {/* <p>Wallet Address: {walletAddress || 'No wallet connected'}</p> */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            data && (
              <div>
                {/* <p>Address: {data.address}</p> */}
                {/* <p>Native Balance: {data.nativeBalance}</p> */}
                {/* <p>Token Balances:</p> */}
                <ul>
                  {data.tokenBalances.map((token, index) => (
                    <li key={index}>{JSON.stringify(token)}</li>
                  ))}
                </ul>
                {/* <p>Active Chains:</p> */}
                {/* <ul>
                  {Array.isArray(data.activeChains) ? (
                    data.activeChains.map((chain, index) => (
                      <li key={index}>{JSON.stringify(chain)}</li>
                    ))
                  ) : (
                    <li>{JSON.stringify(data.activeChains)}</li>
                  )}
                </ul> */}
                {/* <p>DeFi Positions Summary:</p>
                <pre>{JSON.stringify(data.defiPositionsSummary, null, 2)}</pre>
                <p>Resolved Address:</p>
                <pre>{JSON.stringify(data.resolvedAddress, null, 2)}</pre>
                <p>Wallet NFTs:</p>
                <ul>
                  {data.walletNFTs.map((nft, index) => (
                    <li key={index}>{JSON.stringify(nft)}</li>
                  ))}
                </ul> */}
              </div>
            )
          )}
          {error && <p>Error: {error.message}</p>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default LoginButton;
