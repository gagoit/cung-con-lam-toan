var TaoCacBaiToanSoSanh = {
  init: function () {
    this.$container = $('.tao-cac-bai-toan-so-sanh');
    this.$form = $('.form-tao-bai-toan-so-sanh');
    this.$cacBaiToanWrapper = this.$container.find('.cac-bai-toan-wrapper');
    this.$thanhDieuHuongWrapper = this.$container.find('.thanh-dieu-huong-wrapper');
    this.$thanhDieuHuongNext = this.$thanhDieuHuongWrapper.find('.next');
    this.$thanhDieuHuongPrev = this.$thanhDieuHuongWrapper.find('.prev');
    this.$thongTinThemWrapper = this.$container.find('.thong-tin-them-wrapper');
    this.$ketQuaWrapper = this.$container.find('.ket-qua-wrapper');
    this.$ketQua = this.$ketQuaWrapper.find('.ket-qua');
    this.$baiToanHienTai = null;
    this.indexBaiToanHienTai = 0;
    this.cacBaiToan = [];
    this.intervals = [];

    if (this.$container.length) {
      this.initEvents();
    }
  },
  
  initEvents: function () {
    var self = this;

    self.$container.on('hidden.bs.collapse', '.phep-so-sanh-body', function () {
      $(this).closest('.phep-so-sanh-card').find('.an-hien-phep-so-sanh').text('Hiện');
    });

    self.$container.on('shown.bs.collapse', '.phep-so-sanh-body', function () {
      $(this).closest('.phep-so-sanh-card').find('.an-hien-phep-so-sanh').text('Ẩn');
    });

    self.$form.submit(function (e) {
      e.preventDefault();

      self.taoCacBaiToan();
      self.$container.find('.phep-so-sanh-body').collapse('hide');
    });

    self.$container.on('click', '#pss_button_kiem_tra', function () {
      self.kiemTraCacBaiToan();
    });

    self.initThanhDieuHuong();
  },

  initThanhDieuHuong: function () {
    var self = this;

    self.$thanhDieuHuongWrapper.find('.next').click(function () {
      if ($(this).hasClass('disabled')) {
        return;
      }

      self.hienThiBaiToan('next');
    });

    self.$thanhDieuHuongWrapper.find('.prev').click(function () {
      if ($(this).hasClass('disabled')) {
        return;
      }

      self.hienThiBaiToan('prev');
    });

    self.$container.on('click','.pss-keyboard span', function (e) {
      self.setKetQuaChoBaiToan($(this));
    });
  },

  taoCacBaiToan: function () {
    var self = this;

    self.$cacBaiToanWrapper.html('');
    self.clearAllIntervals();
    self.cacBaiToan = [];

    Utilities.inKetQua(self.$ketQua, 0, 0);

    self.cacBaiToan = BaiToan.taoCacBaiToanSoSanh(self.$container.find('.phep-so-sanh-card'));

    self.hienThiCacBaiToan(self.cacBaiToan);
  },

  hienThiCacBaiToan: function (cacBaiToan) {
    var self = this;

    $.each(cacBaiToan, function (index, baiToan) {
      self.$cacBaiToanWrapper.append(Templates.baiToanSoSanh(baiToan, index));
    });

    if (cacBaiToan.length > 0) {
      self.hienThiBaiToan('first');
    } else {
      self.indexBaiToanHienTai = -1;
      self.$baiToanHienTai = null;

      self.hienThiThanhDieuHuong();
      self.hienThiThongTinThem();
    }
  },

  hienThiBaiToan: function (kieu) {
    var self = this;
    var baiToanTiepTheo;

    if (kieu == 'first') {
      self.indexBaiToanHienTai = 0;
      baiToanTiepTheo = self.$cacBaiToanWrapper.find('.bai-toan').first();
    } else if (kieu == 'next') {
      self.indexBaiToanHienTai ++;
      baiToanTiepTheo = self.$baiToanHienTai.next();
    } else {
      self.indexBaiToanHienTai --;
      baiToanTiepTheo = self.$baiToanHienTai.prev();
    }

    if (baiToanTiepTheo.length) {
      self.$cacBaiToanWrapper.find('.bai-toan').addClass('d-none').removeClass('current');
      self.$baiToanHienTai = baiToanTiepTheo;
      self.$baiToanHienTai.removeClass('d-none').addClass('current');
      self.$baiToanHienTai.find('.input-ket-qua').focus();
    } else {
      self.$cacBaiToanWrapper.find('.bai-toan').removeClass('d-none').removeClass('current');
    }

    self.hienThiThanhDieuHuong();
    self.hienThiThongTinThem();
  },

  hienThiThanhDieuHuong: function () {
    var self = this;

    if (self.cacBaiToan.length > 1 && self.$cacBaiToanWrapper.find('.bai-toan.current').length) {
      self.$thanhDieuHuongWrapper.removeClass('d-none');
    } else {
      self.$thanhDieuHuongWrapper.addClass('d-none');
      self.kiemTraCacBaiToan();
      return;
    }

    var isLast = self.indexBaiToanHienTai == (self.cacBaiToan.length - 1);

    if (self.$baiToanHienTai.next().length || isLast) {
      self.$thanhDieuHuongNext.removeClass('disabled');
    } else {
      self.$thanhDieuHuongNext.addClass('disabled');
    }

    if (self.$baiToanHienTai.prev().length) {
      self.$thanhDieuHuongPrev.removeClass('disabled');
    } else {
      self.$thanhDieuHuongPrev.addClass('disabled');
    }
  },

  hienThiThongTinThem: function () {
    var self = this;

    self.$thongTinThemWrapper.find('.so-hien-tai').text(self.indexBaiToanHienTai + 1);
    self.$thongTinThemWrapper.find('.tong-so').text(self.cacBaiToan.length);

    if (self.cacBaiToan.length > 1 && self.$cacBaiToanWrapper.find('.bai-toan.current').length) {
      self.$thongTinThemWrapper.removeClass('d-none');

      self.hienThiThoiGian();
    } else {
      self.$thongTinThemWrapper.addClass('d-none');
    }

    if (self.cacBaiToan.length) {
      self.$ketQuaWrapper.removeClass('d-none');
    } else {
      self.$ketQuaWrapper.addClass('d-none');
    }
  },

  hienThiThoiGian: function () {
    var self = this;
    var thoiGianCho1BaiToan = parseInt(self.$container.find('#pss_input_thoi_gian_cho_1_bai_toan').val());
    var thoiGianConLaiCho1BaiToan = thoiGianCho1BaiToan;

    if (thoiGianCho1BaiToan > 0) {
      self.$container.find('.thong-tin-thoi-gian').removeClass('d-none');
      self.$container.find('.so-giay-con-lai').text(thoiGianConLaiCho1BaiToan);

      self.intervals.push(setInterval(function() {
        thoiGianConLaiCho1BaiToan --;

        if (thoiGianConLaiCho1BaiToan <= 0) {
          self.clearAllIntervals();
          self.hienThiBaiToan('next');
        } else {
          self.$container.find('.so-giay-con-lai').text(thoiGianConLaiCho1BaiToan);
        }
      }, 1000));
    } else {
      self.$container.find('.thong-tin-thoi-gian').addClass('d-none');
    }
  },

  clearAllIntervals: function () {
    var self = this;
    self.$container.find('.so-giay-con-lai').text('---');

    for (var id of self.intervals) {
      clearInterval(id);
      self.intervals = [];
    }
  },

  setKetQuaChoBaiToan: function ($span) {
    var self = this;
    var $baiToan = $span.closest('.bai-toan');
    var $inputKetQua = $baiToan.find('.pss-input-ket-qua');

    $inputKetQua.val($span.data('value'));

    $baiToan.find('.pss-keyboard span').removeClass('current');
    $span.addClass('current');

    $baiToan.find('.pss-span-ket-qua').html($span.html());
    $baiToan.find('.pss-span-ket-qua').addClass('active');
  },

  kiemTraCacBaiToan: function () {
    var self = this;
    var soDapAnDung = 0;
    var soBaiToan = self.$cacBaiToanWrapper.find('.bai-toan').length;

    if (soBaiToan == 0) {
      Utilities.inKetQua(self.$ketQua, 0, 0);
      return;
    }

    $.each(self.$cacBaiToanWrapper.find('.bai-toan'), function (index, baiToan) {
      var left = parseInt($(baiToan).find('.left-side').text());
      var right = parseInt($(baiToan).find('.right-side').text());
      var inputKetQua = $(baiToan).find('.pss-input-ket-qua');
      var ketQua = inputKetQua.val();
      var ketQuaDung = '=';

      if (left < right) {
        ketQuaDung = '<';
      } else if (left > right) {
        ketQuaDung = '>';
      }

      if (ketQua && ketQua.trim() == ketQuaDung) {
        inputKetQua.removeClass('is-invalid').addClass('is-valid');
        soDapAnDung ++;
      } else {
        inputKetQua.removeClass('is-valid').addClass('is-invalid');
      }
    });

    Utilities.inKetQua(self.$ketQua, soDapAnDung, soBaiToan);
  }
}
