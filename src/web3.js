export async function initMetamask() {
  if (window.ethereum) {

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
      notie.alert({
        type: 'success',
        text: 'You are connected to MetaMask',
      });
                                                           
      //console.log('metaID: ' + accounts[0]);
      return accounts[0];

    } catch (err) {
      notie.alert({
        type: 'error', 
        text: `MetaMask auth error! ${err.message}`,
      });
    }


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
