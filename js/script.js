var CungConLamToan = {
  init: function () {
    this.$page = $('#cung_con_lam_toan_page');
    this.$form = $('.form-tao-bai-toan');
    this.$cacBieuThucCards = $('.cac-bieu-thuc-cards');
    this.$cacBaiToanWrapper = $('.cac-bai-toan-wrapper');
    this.$thanhDieuHuongWrapper = $('.thanh-dieu-huong-wrapper');
    this.$thanhDieuHuongNext = $('.thanh-dieu-huong-wrapper .next');
    this.$thanhDieuHuongPrev = $('.thanh-dieu-huong-wrapper .prev');
    this.$baiToanHienTai = null;
    this.cacBaiToan = [];
    this.initEvents();
  },
  
  initEvents: function () {
    var self = this;

    self.$page.on('click', '#button_them_phep_toan', function (e) {
      self.themPhepToan($(this));
    });

    self.$page.on('click', '#button_them_bieu_thuc', function (e) {
      self.themBieuThuc();
    });

    self.$form.submit(function (e) {
      e.preventDefault();

      self.taoCacBaiToan();
    });

    $('#button_kiem_tra').click(function () {
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
    var chapNhanSoAm = $("#checkbox_chap_nhan_ket_qua_am").prop("checked");
    var chapNhanSoDu = $("#checkbox_chap_nhan_ket_qua_du").prop("checked");

    self.$cacBaiToanWrapper.html('');
    $('.ket-qua').html('').removeClass('dung-100');
    self.cacBaiToan = [];

    $.each(self.$cacBieuThucCards.find('.bieu-thuc-card'), function (index, bieuThucCard) {
      var cacBaiToanChoMotBieuThuc = BaiToan.taoCacBaiToanChoMotBieuThuc($(bieuThucCard), chapNhanSoAm, chapNhanSoDu);
      self.cacBaiToan = self.cacBaiToan.concat(cacBaiToanChoMotBieuThuc);
    });

    self.hienThiCacBaiToan(self.cacBaiToan);
  },

  hienThiCacBaiToan: function (cacBaiToan) {
    var self = this;

    $.each(cacBaiToan, function (index, baiToan) {
      self.$cacBaiToanWrapper.append(Templates.baiToan(baiToan.join(' '), index));
    });

    if (cacBaiToan.length > 0) {
      self.$baiToanHienTai = self.$cacBaiToanWrapper.find('.bai-toan').first();
      self.$baiToanHienTai.addClass('current');
    }

    self.hienThiThanhDieuHuong();
  },

  hienThiBaiToan: function (kieu) {
    var self = this;
    var baiToanTiepTheo = kieu == 'next' ? self.$baiToanHienTai.next() : self.$baiToanHienTai.prev();

    if (baiToanTiepTheo.length) {
      self.$cacBaiToanWrapper.find('.bai-toan').addClass('hidden').removeClass('current');
      baiToanTiepTheo.addClass('current');
      self.$baiToanHienTai = baiToanTiepTheo;
    } else {
      self.$cacBaiToanWrapper.find('.bai-toan').removeClass('hidden').removeClass('current');
    }

    self.hienThiThanhDieuHuong();
  },

  hienThiThanhDieuHuong: function () {
    var self = this;

    if (self.cacBaiToan.length > 1 && self.$cacBaiToanWrapper.find('.bai-toan.current').length) {
      self.$thanhDieuHuongWrapper.show();
    } else {
      self.$thanhDieuHuongWrapper.hide();
      return;
    }

    var isLast = self.$cacBaiToanWrapper.find('.bai-toan').index(self.$baiToanHienTai) == (self.cacBaiToan.length - 1);

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

  kiemTraCacBaiToan: function () {
    var self = this;
    var soDapAnDung = 0;
    var soBaiToan = self.$cacBaiToanWrapper.find('.bai-toan').length;

    if (soBaiToan == 0) {
      $('.ket-qua').html('');
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

    self.inKetQua(soDapAnDung, soBaiToan);
  },

  inKetQua: function (soDapAnDung, soBaiToan) {
    if (soDapAnDung == 0) {
      $('.ket-qua').html('Rất tiếc! Con chưa làm đúng bài toán nào. Hãy cố lên.').removeClass('dung-100');
    } else if (soDapAnDung == soBaiToan) {
      $('.ket-qua').html('Chúc mừng! Con đã làm đúng tất cả các bài toán. Hãy cố lên.').addClass('dung-100');
    } else {
      $('.ket-qua').html('Chúc mừng! Con đã làm đúng ' + soDapAnDung + ' / ' + soBaiToan + ' bài toán. Hãy cố lên.').addClass('dung-100');
    }
  }
}

$(function() {
  CungConLamToan.init();
});
