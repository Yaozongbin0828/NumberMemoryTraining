// 初始化Pi的值
let piDigits =
  "14159265358979323846264338327950288419716939937510582097494459230781640628620899 8628034825 3421170679 8214808651 3282306647 0938446095 5058223172 5359408128 4811174502 8410270193 8521105559 6446229489 5493038196 4428810975 6659334461 2847564823 3786783165 2712019091 4564856692 3460348610 4543266482 1339360726 0249141273 7245870066 0631558817 4881520920 9628292540 9171536436 7892590360 0113305305 4882046652 1384146951 9415116094 3305727036 5759591953 0921861173 8193261179 3105118548 0744623799 6274956735 1885752724 8912279381 8301194912 9833673362 4406566430 8602139494 6395224737 1907021798 6094370277 0539217176 2931767523 8467481846 7669405132 0005681271 4526356082 7785771342 7577896091 7363717872 1468440901 2249534301 4654958537 1050792279 6892589235 4201995611 2129021960 8640344181 5981362977 4771309960 5187072113 4999999837 2978049951 0597317328 1609631859 5024459455 3469083026 4252230825 3344685035 2619311881 7101000313 7838752886 5875332083 8142061717 7669147303 5982534904 2875546873 1159562863 8823537875 9375195778 1857780532 1712268066 1300192787 6611195909 2164201989";
let currentIndex = 0; // 初始化当前索引
let piErrorCount = 0; // 初始化错误次数

let twentyDigits = piDigits.substring(0, 20);
console.log("前20位：" + twentyDigits);
console.log(piDigits);

$(function () {
  // 输入框
  $("#dictationOfPi").on("input", function () {
    let userInput = $.trim($("#dictationOfPi").val());
    // 判断奇偶数并设置不同颜色
    let piList = userInput.match(/.{1,2}/g) || []; // 将用户输入的数字以两个数字为一组进行分割
    let contents = $("#piDisplay"); // 显示数字的容器
    contents.empty(); // 清空显示区域

    // 数字颜色分组（两两一组）
    $.each(piList, function (index, value) {
      index % 2 == 0
        ? contents.append(
            "<span style='color:red;font-size:95px;'>" + value + "</span>"
          )
        : contents.append(
            "<span style='color:blue;font-size:95px;'>" + value + "</span>"
          );
    });

    // 如果用户输入的部分与π的数字不匹配，表示输入错误
    if (userInput !== piDigits.slice(0, userInput.length)) {
      $(this).val(""); // 错误自动清空input框
      currentIndex = 0; // 重置索引值，允许用户重新输入
      $("#piErrorCount").text("错误次数: " + piErrorCount); // 更新错误次数显示
      $("#piDisplay").css("background-color", "lightcoral").text("您输入的数字与π的数字不匹配，请点击按钮重新默写！");
      // $("#piDisplay").empty();
      piErrorCount++;
    } else {
      // 如果用户输入正确，更新当前需要输入的π的数字索引
      currentIndex = userInput.length;
      $("#piCurrentIndex").text("写到Pi的第几位：" + currentIndex); // 更新当前输入位置显示
      $("#piDisplay").css("background-color", "white"); // 背景恢复正常
    }
  });

  // 清除重写按钮
  $("#piResetButton").on("click", function () {
    $("#dictationOfPi").val(""); // 清除用户输入
    currentIndex = 0; // 重置索引
    piErrorCount = 0; // 重置错误次数
    $("#piErrorCount").text("错误次数: " + piErrorCount);
    $("#piCurrentIndex").text("写到Pi的第几位：" + currentIndex);
    $("#piDisplay").css("background-color", "white");
    $("#piDisplay").empty();
  });
});
