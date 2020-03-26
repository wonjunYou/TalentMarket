const setReviewBtn = document.getElementById('js-setreview');
const info = document.getElementById('info');
const spinner = document.getElementById('spinner');
const jscontent = document.getElementById('content');
const jstrId = document.getElementById('trId');

let deploy = false;

function loading() {
  spinner.classList.remove('hiding');
  info.classList.remove('hiding');
  info.innerText = "등록중 입니다. 잠시만 기다려 주세요";
}

function setReview() {
  loading();
  const trId = parseInt(jstrId.innerText);
  const content = jscontent.innerText;
  myContract.methods.setUseReport(trId, content).send({ from: userAccounts[0]})
  .on('receipt', function(receipt){
    console.log(receipt);
    info.innerText = "등록 완료";
    spinner.classList.add('hiding');
    deploy = true;
  })
  .on('error', function(error) {
    console.log('등록실패');
  })
}

function init() {
  setReviewBtn.addEventListener('click', setReview);

}

init();



