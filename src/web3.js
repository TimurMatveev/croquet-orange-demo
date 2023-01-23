export async function initMetamask() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
    notie.alert({
      type: 'success',
      text: 'You are connected to MetaMask',
    });
    
    let secretIds = ['0x3f56b754b035417514c7b067ae1020cb07e81782', '0x5755BC224544eD2E4eC44C39a7Af9De731994004'];
    
    console.log('metaID: ' + accounts[0]);

    if ( secretIds.includes(accounts[0]) ) { 
      window.isSecretAvatars = true;
    } else {
      window.isSecretAvatars = false;
    }

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
