const sellerAddress = document.getElementById('sellerAddress');
const title = document.getElementById('title');

function init() {
  title.addEventListener('click', function() {
    sellerAddress.value = userAccounts[0];
  })
}

init();