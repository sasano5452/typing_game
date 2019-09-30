// ---------------------------JS---------------------------

'use strict';

{
  // 単語の格納
  const words = [
    'function','target','document',
    'var','let','const','false','console',
    'ajax','click','empty','remove','add',
    'text','attr','show','val','sumit'
  ];

  // ランダムに単語を出す
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 15 * 1000;   //タイムリミット
  let startTime;
  let isPlaying = false;
  
  //DOM要素の取得
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');
  const result = document.getElementById('result');
  //モーダルを消す処理
  mask.addEventListener('click', function () {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });
  

  //入力した単語を_に変える
  function updateTarget() {
    let placeholder ='';
    for (let i = 0; i < loc; i++){
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }
  //時間設定
  function updateTimer() {
        const timeLeft = startTime + timeLimit - Date.now();
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);

        const timeoutId = setTimeout(() => {
          updateTimer();
          
        }, 10);

        if (timeLeft < 0) {
          isPlaying = false;
          clearTimeout(timeoutId);
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          target.textContent = ''
          document.getElementById("target").style.color = "";
          timerLabel.textContent = '0.00'
          setTimeout(() => {
            showResult();
          }, 100);

          start.textContent = "javascript Replay"
          ruby.textContent = "ruby play"
        }
      }
      
      function showResult() {
        const accuracy = score + miss === 0 ? 0 :score / (score + miss) * 100;
        result.textContent = accuracy.toFixed(2)
      }

  //クリックでゲームスタート
  start.addEventListener('click', () =>{
    ruby.textContent = ''
    start.textContent = ''
    if (isPlaying === true) {
      return}
    isPlaying = true;  

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  })

  

　//単語の正誤をカウント　
  window.addEventListener('keydown',(e)=>{
    if (isPlaying !== true) {
      return;
    }

    if (e.key === word[loc]) {
      loc++;
      document.getElementById("target").style.color = "";
      // 単語が正解なら次の単語に行く処理
      if (loc === word.length)　{
        word = words[Math.floor(Math.random() * words.length)];　　// ランダムに単語をだす
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;

    } else {
      miss++;
      missLabel.textContent = miss;
      document.getElementById("target").style.color = "red";
    }
  });
}
