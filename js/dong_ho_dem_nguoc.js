var DongHoDemNguoc = {
  hienThiThoiGian: function ($container, intervals) {
    var self = this;
    var thoiGianCho1BaiToan = parseInt($container.find('.input-thoi-gian-cho-1-bai-toan').val());
    var thoiGianConLaiCho1BaiToan = thoiGianCho1BaiToan;

    if (thoiGianCho1BaiToan > 0) {
      $container.find('.thong-tin-thoi-gian').removeClass('d-none');
      $container.find('.so-giay-con-lai').text(thoiGianConLaiCho1BaiToan);
      self.clearAllIntervals($container, intervals);

      intervals.push(setInterval(function() {
        thoiGianConLaiCho1BaiToan --;

        if (thoiGianConLaiCho1BaiToan <= 0) {
          self.clearAllIntervals($container, intervals);
          $container.find('.thanh-dieu-huong-wrapper .next').click();
        } else {
          $container.find('.so-giay-con-lai').text(thoiGianConLaiCho1BaiToan);
        }
      }, 1000));
    } else {
      $container.find('.thong-tin-thoi-gian').addClass('d-none');
    }
  },

  clearAllIntervals: function ($container, intervals) {
    var self = this;
    $container.find('.so-giay-con-lai').text('---');

    for (var id of intervals) {
      clearInterval(id);
      intervals = [];
    }
  }
}
