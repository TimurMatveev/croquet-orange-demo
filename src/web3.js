export async function initMetamask() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
    notie.alert({
      type: 'success',
      text: 'You are connected to MetaMask',
    });

    return accounts[0];
  } else {
    //https://metamask.io/download/
    notie.alert({
      type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: 'Please install metamask!',
      stay: true,
    });
    window.open('https://metamask.io/download/', '_blank');
  }
}
