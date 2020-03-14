const setTalentBtn = document.getElementById('js-setTalent');
const info = document.getElementById('info');
const spinner = document.getElementById('spinner');
const priceInfo = document.getElementById('price');
const completeBtn = document.getElementById('js-complete');
const talentId = document.getElementById('talentId');

let deploy = false;

function loading() {
  spinner.classList.remove('hiding');
  info.classList.remove('hiding');
  info.innerText = "등록중 입니다. 잠시만 기다려 주세요";
}

function banBtn() {
  if(!deploy) {
    event.preventDefault();
  }
  else{
    //색
  }
}

function setTalent(price) {
  myContract.methods.setTalent(userAccounts[0], price).send({ from: userAccounts[0]})
  .on("receipt", function(receipt) {
    let talent = receipt.events.NewTalent.returnValues;
    console.log(talent);
    info.innerText = "등록완료";
    talentId.value = parseInt(talent.talentId);
    spinner.classList.add('hiding');
    deploy = true;
  })
  .on("error", function(error) {
    console.log("등록실패");
  })
}

setTalentBtn.addEventListener('click', function(){
  event.preventDefault();
  let price = parseInt(priceInfo.innerText);
  loading();
  setTalent(price);
})

completeBtn.addEventListener('click', banBtn)
