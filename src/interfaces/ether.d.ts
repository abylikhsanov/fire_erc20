interface Ethereum {
    enable(): Promise<string[]>;
    selectedAddress: null | string;
    request: any;
  }
  
  interface Window {
    ethereum: Ethereum;
  }
  