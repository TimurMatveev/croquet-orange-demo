export async function initMetamask() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
    //console.log(accounts[0]);
    alert("You are connected to MetaMask");
    return accounts[0];
  } else {
    //https://metamask.io/download/
    alert("Please install metamask!");
    window.open('https://metamask.io/download/', '_blank');
  }
}