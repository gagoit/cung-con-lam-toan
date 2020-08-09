var CungConLamToan = {
  init: function () {
    this.$page = $('#cung_con_lam_toan_page');
    this.$form = $('.form-tao-bai-toan');
    this.$cacBieuThucCards = $('.cac-bieu-thuc-cards');
    this.$cacBaiToanWrapper = $('.cac-bai-toan-wrapper');
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
    self.$cacBaiToanWrapper.html('');
    $('.ket-qua').html('').removeClass('dung-100');

    $.each(self.$cacBieuThucCards.find('.bieu-thuc-card'), function (index, bieuThucCard) {
      self.taoCacBaiToanChoMotBieuThuc($(bieuThucCard));
    });
  },

  taoCacBaiToanChoMotBieuThuc: function ($bieuThucCard) {
    var self = this;

    var soBaiToan = $bieuThucCard.find('.input-so-bai-toan').val();
    var cacPhepToan = $.map($bieuThucCard.find('select.phep-toan-select'), function (ele, index) {
      return ele.value;
    });
    var cacSoToiDa = $.map($bieuThucCard.find('input.input-so'), function (ele, index) {
      return parseInt(ele.value);
    });

    var numBaiToan = 0;
    var cacBaiToan = [];
    while (numBaiToan < soBaiToan) {
      cacBaiToan.push(self.taoMotBaiToan(cacPhepToan, cacSoToiDa));
      numBaiToan ++;
    }

    self.printCacBaiToan(cacBaiToan);

    return cacBaiToan;
  },

  taoMotBaiToan: function (cacPhepToan, cacSoToiDa) {
    var self = this;
    var baiToan = [];
    baiToan.push(Utilities.randomNumber(cacSoToiDa[0]));
    $.each(cacPhepToan, function (index, phepToan) {
      baiToan.push(phepToan);

      baiToan.push(Utilities.randomNumber(cacSoToiDa[index + 1]));
    });

    return baiToan;
  },

  printCacBaiToan: function (cacBaiToan) {
    var self = this;

    $.each(cacBaiToan, function (index, baiToan) {
      self.$cacBaiToanWrapper.append(Templates.baiToan(baiToan.join(' '), index));
    });
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
