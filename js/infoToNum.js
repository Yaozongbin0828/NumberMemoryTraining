/** 含义->数字*/

// 初始化变量
let correctCountNum = 0;
let wrongCountNum = 0;
let isInfo = false;
let arrListInfo = [];
let imgInfoNum = "";
let imgInfoId = [];
let imgUrl = "";
let progressListInfo;

// 随机数
function getRandomNumber() {
  const infos = data.filter((info) => !arrListInfo.includes(info.id));
  if (infos.length > 0) {
    const randomIndex = Math.floor(Math.random() * infos.length);
    const randomData = infos[randomIndex];
    $("#promptNum").html(`<p data-id="${randomData.id}">${randomData.id}</p>`);

    // 输出图片信息和ID
    arrListInfo.push(randomData.imgInfo);
    imgInfoNum = randomData.imgInfo;
    imgInfoId = randomData.id;
    imgUrl = randomData.image;
  } else {
    alert("所有数字已显示");
  }
}

// 柱状图
function chartRandomDataNum() {
  $("#chartTrueInfoNum").html(`<span>${correctCountNum}</span>`);
  $("#chartFalseInfoNum").html(`<span>${wrongCountNum}</span>`);
}

// 进度条
function updateProgressBarNum() {
  let dataLength = data.length;
  let arrListInfoLength = arrListInfo.length;
  // 进度条100%
  let progress = (arrListInfoLength / dataLength) * 100;
  progressListInfo = progress;

  // console.log(progressListInfo);
}

// 获取随机数据和进度条函数
function getRandomNumberAndupdateProgressBarNum() {
  getRandomNumber();
  updateProgressBarNum();
}

// 页面挂载
$(function () {
  getRandomNumberAndupdateProgressBarNum();
  chartRandomDataNum();

  // 提示按钮 显示/隐藏图片
  $("#tipBtn").on("click", function () {
    $("#tipImage").toggle("fast", function () {
      let ifHide =
        $("#tipImage")
          .html(
            `<img data-id="${imgInfoId}" src="${imgUrl}"><p>${imgInfoNum}</p>`
          )
          .css("display") == "block"
          ? false
          : true;
      ifHide ? $("#tipBtn").text("提示") : $("#tipBtn").text("隐藏");
    });
  });

  // 提交
  $("#userInputInfo").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault(); //阻止提交默认操作
      console.log(arrListInfo);
      // trim()去除空格
      let userInputInfo = $.trim($("#userInputInfo").val());
      
      if (userInputInfo === "") {
        alert("请输入数字对应的含义");
        return;
      }

      $.each(arrListInfo, function (index, item) {
        if (item == userInputInfo) {
          isInfo = true;
          $("#numTFOutputBox")
            .html(`<p>正确,${imgInfoId}对应的含义是：${imgInfoNum}</p>`)
            .css("color", "green");
          console.log(index);
          return;
        } else {
          isInfo = false;
          $("#numTFOutputBox")
            .html(`<p>错误,${imgInfoId}对应的数字是：${imgInfoNum}</p>`)
            .css("color", "red");
          return;
        }
      });
      console.log(isInfo);

      if (isInfo) {
        correctCountNum++;
        console.log("正确次数" + correctCountNum);
        $("#chartTrueInfoNum").html(`<span>${correctCountNum}</span>`);
        $("#correctBarNum").css("height", 4 + correctCountNum * 4 + "px");
      } else {
        isInfo = false;
        wrongCountNum++;
        console.log("错误次数" + wrongCountNum);
        $("#chartFalseInfoNum").html(`<span>${wrongCountNum}</span>`);
        $("#wrongBarNum").css("height", 4 + wrongCountNum * 4 + "px");
      }

      if (correctCountNum + wrongCountNum != data.length) {
        if (progressListInfo <= 100) {
          $("#progressBarNum").css("width", progressListInfo + "%");
          $("#progressCountNum").html(
            `<span>${progressListInfo.toFixed(0)}</span>`
          );
        }
      }

      // 提交后在执行一次
      getRandomNumberAndupdateProgressBarNum();

      // 提交后隐藏提示图片
      $("#tipImage")
        .html(
          `<img data-id="${imgInfoId}" src="${imgUrl}"><p>${imgInfoNum}</p>`
        )
        .hide();
    }
  });
});
