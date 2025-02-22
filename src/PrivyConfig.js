import { PrivyProvider } from "@privy-io/react-auth";

const PrivyConfig = ({ children }) => {
  return (
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID}
      config={{
        loginMethods: ["wallet"], // Enable Wallet login only
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default PrivyConfig;
