/** 数字->含义*/

// 初始化变量
let correctCount = 0;
let wrongCount = 0;
let arrListNum = [];
let imgInfo = "";
let isMath = false;
let progressList;

// 随机生成图片
function getRandomData() {
  let nums = data.filter((num) => !arrListNum.includes(num.id));
  if (nums.length > 0) {
    let randomIndex = Math.floor(Math.random() * nums.length);
    let randomData = nums[randomIndex];
    $("#promptInfo").html(
      `<img data-id="${randomData.id}" src="${randomData.image}"><p>${randomData.imgInfo}</p>`
    );
    // 输出图片信息
    arrListNum.push(randomData.id);
    imgInfo = randomData.imgInfo;
  } else {
    alert("所有图像已显示");
  }
}

// 初始化柱状图
function chartRandomData() {
  $("#chartTrueInfo").html(`<span>${correctCount}</span>`);
  $("#chartFalseInfo").html(`<span>${wrongCount}</span>`);
}

// 初始化进度条
function updateProgressBar() {
  let dataLength = data.length;
  let arrListLength = arrListNum.length;
  // 进度条比例100%
  let progress = (arrListLength / dataLength) * 100;
  progressList = progress;

  // console.log(dataLength);
  // console.log(arrListLength);
  // console.log(progress);
}

// 获取随机数据并更新进度条
function getRandomDataAndUpdateProgressBar() {
  getRandomData();
  updateProgressBar();
}


$(function () {
  // 页面挂载后执行一次
  chartRandomData();
  getRandomDataAndUpdateProgressBar();

  // 提交
  $("#userInputNum").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault(); //阻止提交默认操作
      console.log(arrListNum);
      // 获取用户输入的值
      let userInput = $.trim($("#userInputNum").val());
      $.each(arrListNum, function (index, item) {
        if (item == userInput) {
          // 正确
          isMath = true;
          $("#tfOutputBox")
            .html(`<p>正确,${imgInfo}对应的数字是：${arrListNum[index]}</p>`)
            .css("color", "green");
          return;
        } else {
          isMath = false;
          $("#tfOutputBox")
            .html(`<p>错误,${imgInfo}对应的数字是：${arrListNum[index]}</p>`)
            .css("color", "red");
          return;
        }
      });

      console.log(isMath);
      if (isMath) {
        // 统计正确次数
        correctCount++;
        console.log("正确次数" + correctCount);

        $("#chartTrueInfo").html(`<span>${correctCount}</span>`);
        $("#correctBar").css("height", 4 + correctCount * 4 + "px");
      } else {
        // 错误
        isMath = false;

        // 统计错误次数
        wrongCount++;
        console.log("错误次数" + wrongCount);

        $("#chartFalseInfo").html(`<span>${wrongCount}</span>`);
        $("#wrongBar").css("height", 4 + wrongCount * 4 + "px");
      }

      if (correctCount + wrongCount != data.length) {
        if (progressList <= 100) {
          // console.log(progressList);
          $("#progressBar").css("width", progressList + "%");
          $("#progressCount").html(`<span>${progressList.toFixed(0)}</span>`);
        }
      } else {
        return;
      }

      // 提交执行后再调用一次
      getRandomDataAndUpdateProgressBar();
    }
  });
});
