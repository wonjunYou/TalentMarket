document.getElementById('btn').addEventListener('click', function(){
  let price = parseInt(document.getElementById('exam').innerHTML);
  console.log(typeof userAccounts[0]);
  console.log(typeof price);
  myContract.methods.setTalent(userAccounts[0], price).send({ from: userAccounts[0]})
  .on("receipt", function(receipt) {
    console.log(receipt);
    let talent = receipt.events.NewTalent.returnValues;
    console.log(talent.talentId);
  })
  .on("error", function(error) {
    console.log("등록실패");
  })
})

// myContract.events.NewTalent()
// .on("data", function(event) {
//   let t = event.returnValues;
//   console.log(t.talentId);
// })
// .on("error", console.error)