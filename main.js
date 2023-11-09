
// スプレッド構文（配列）[]
// []を無しで取得するとnodeリストが取れる。
// 違い：取りやすさ
let imagesItems = [...document.querySelectorAll(".img-wrap")]
// console.log(imagesItems);
let titles = [...document.querySelectorAll("h2")]
let titleMessage = document.querySelector("title")

//具体的にいつ発動させるのかを決めるオプション
let options = {
    rootMargin: "0px", //デフォルトで０.marginとほぼ同じ
    threshold: 0.5, //閾値(いきち)は0.2。これが１になると完全に画面におさまってから発動する
    // いきち：このラインを超えたら～
  };
  

// 監視対象になった瞬間activeを負荷する関数
let setItemActive = (entries) => {
    // console.log(entries)
    entries.forEach((entry) => {
        // console.log(entry)
        // isIntersectingはentriesのディベロッパーツール内にある
        if(entry.isIntersecting){
            // titleの「Mount Up Your Life」の部分
            entry.target.classList.add("active");
        }else{
            // スクロールしたときに外さないと、スクロールで戻ったときにふわっとしない
            entry.target.classList.remove("active");
        }
    });
}


// どこにいるのか監視する。特定の位置に来たら関数を呼ぶ
let observer = new IntersectionObserver(setItemActive, options);

observer.observe(titleMessage);

// img-wrapは偶数と奇数で表示する場所が異なる
imagesItems.map((item, index)=>{
    // console.log("item:",item);
    // console.log("index:",index);
    item.children[0].style.backgroundImage = `url(./images/${index + 1}.jpg)`;
    index % 2 == 0 ? (item.style.left = "55%") : (item.style.left = "5%");
    observer.observe(item);
})

titles.map((title, index) => {
    index % 2 == 0 ? (title.style.left = "45%") : (title.style.left = "35%");
    observer.observe(title);
  });
  
  observer.observe(titleMessage);
