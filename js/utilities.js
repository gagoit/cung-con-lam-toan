var Utilities = {
  randomNumber: function (soToiDa) {
    return Math.floor(Math.random() * soToiDa) + 1;
  },

  inKetQua: function ($ketQua, soDapAnDung, soBaiToan) {
    if (soBaiToan == 0) {
      $ketQua.html('').removeClass('dung-100');
      return;
    }

    if (soDapAnDung == 0) {
      $ketQua.html('Rất tiếc! Con chưa làm đúng bài toán nào. Hãy cố lên.').removeClass('dung-100');
    } else if (soDapAnDung == soBaiToan) {
      $ketQua.html('Chúc mừng! Con đã làm đúng tất cả các bài toán. Hãy cố lên.').addClass('dung-100');
    } else {
      $ketQua.html('Chúc mừng! Con đã làm đúng ' + soDapAnDung + ' / ' + soBaiToan + ' bài toán. Hãy cố lên.').addClass('dung-100');
    }
  }
}
