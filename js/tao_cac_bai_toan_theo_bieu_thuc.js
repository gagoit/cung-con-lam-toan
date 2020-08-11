var TaoCacBaiToanTheoBieuThuc = {
  init: function () {
    this.$container = $('.tao-cac-bai-toan-theo-bieu-thuc');
    this.$form = $('.form-tao-bai-toan-theo-bieu-thuc');
    this.$cacBieuThucCards = this.$container.find('.cac-bieu-thuc-cards');
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

    if (this.$container.length) {
      this.initEvents();
    }
  },
  
  initEvents: function () {
    var self = this;

    self.$container.on('click', '#button_them_phep_toan', function (e) {
      self.themPhepToan($(this));
    });

    self.$container.on('click', '#button_them_bieu_thuc', function (e) {
      self.themBieuThuc();
    });

    self.$form.submit(function (e) {
      e.preventDefault();

      self.taoCacBaiToan();
    });

    self.$container.on('click', '#button_kiem_tra', function () {
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
  },
  
  themPhepToan: function ($buttonThemPhepToan) {
    var self = this;
    var $bieuThucCard = $buttonThemPhepToan.closest('.bieu-thuc-card');
    var $bieuThucWrapper = $bieuThucCard.find('.bieu-thuc-wrapper');
    var currentBieuThucIndex = $('.bieu-thuc-card').index($bieuThucCard);
    var newNumOfPhepToan = $bieuThucCard.find('select.phep-toan-select').length + 1;
    var newNumSo = newNumOfPhepToan + 1;
    
    $bieuThucWrapper.append(Templates.phepToanSelect(currentBieuThucIndex, newNumOfPhepToan));
    $bieuThucWrapper.append(Templates.inputSo(currentBieuThucIndex, newNumSo));
  },

  themBieuThuc: function () {
    var self = this;
    var newNumOfBieuThuc = self.$cacBieuThucCards.find('.bieu-thuc-card').length + 1;
    
    self.$cacBieuThucCards.append(Templates.bieuThuc(newNumOfBieuThuc));
  },

  taoCacBaiToan: function () {
    var self = this;
    var chapNhanSoAm = $('#checkbox_chap_nhan_ket_qua_am').prop('checked');
    var chapNhanSoDu = $('#checkbox_chap_nhan_ket_qua_du').prop('checked');

    self.$cacBaiToanWrapper.html('');
    self.cacBaiToan = [];

    Utilities.inKetQua(self.$ketQua, 0, 0);

    $.each(self.$cacBieuThucCards.find('.bieu-thuc-card'), function (index, bieuThucCard) {
      var cacBaiToanChoMotBieuThuc = BaiToan.taoCacBaiToanChoMotBieuThuc($(bieuThucCard), chapNhanSoAm, chapNhanSoDu);
      self.cacBaiToan = self.cacBaiToan.concat(cacBaiToanChoMotBieuThuc);
    });

    self.hienThiCacBaiToan(self.cacBaiToan);
  },

  hienThiCacBaiToan: function (cacBaiToan) {
    var self = this;

    $.each(cacBaiToan, function (index, baiToan) {
      self.$cacBaiToanWrapper.append(Templates.baiToanTheoBieuThuc(baiToan.join(' '), index));
    });

    if (cacBaiToan.length > 0) {
      self.hienThiBaiToan('first');
    } else {
      self.indexBaiToanHienTai = -1;
      self.$baiToanHienTai = null;
    }

    self.hienThiThanhDieuHuong();
    self.hienThiThongTinThem();
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
    } else {
      self.$thongTinThemWrapper.addClass('d-none');
    }

    if (self.cacBaiToan.length) {
      self.$ketQuaWrapper.removeClass('d-none');
    } else {
      self.$ketQuaWrapper.addClass('d-none');
    }
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
      var ketQuaDung = eval($(baiToan).find('.left-side').text());
      var inputKetQua = $(baiToan).find('.input-ket-qua');
      var ketQua = inputKetQua.val();

      if (ketQua && ketQuaDung === parseInt(ketQua)) {
        inputKetQua.removeClass('is-invalid').addClass('is-valid');
        soDapAnDung ++;
      } else {
        inputKetQua.removeClass('is-valid').addClass('is-invalid');
      }
    });

    Utilities.inKetQua(self.$ketQua, soDapAnDung, soBaiToan);
  }
}
