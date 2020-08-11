var BaiToan = {
  taoCacBaiToanChoMotBieuThuc: function ($bieuThucCard, chapNhanSoAm, chapNhanSoDu) {
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
    var baiToan = [];

    while (numBaiToan < soBaiToan) {
      baiToan = self.taoMotBaiToanChoMotBieuThuc(cacPhepToan, cacSoToiDa, chapNhanSoAm, chapNhanSoDu, 0);
      if (baiToan.length) {
        cacBaiToan.push(baiToan);
      }

      numBaiToan ++;
    }

    return cacBaiToan;
  },

  taoMotBaiToanChoMotBieuThuc: function (cacPhepToan, cacSoToiDa, chapNhanSoAm, chapNhanSoDu, lanThu) {
    var self = this;
    var baiToan = [];

    if (lanThu > 10) {
      return baiToan;
    }

    baiToan.push(Utilities.randomNumber(cacSoToiDa[0]));
    $.each(cacPhepToan, function (index, phepToan) {
      baiToan.push(phepToan);

      baiToan.push(Utilities.randomNumber(cacSoToiDa[index + 1]));
    });

    var ketQua = eval(baiToan.join(' '));
    if (ketQua < 0 && !chapNhanSoAm) {
      lanThu ++;
      return self.taoMotBaiToanChoMotBieuThuc(cacPhepToan, cacSoToiDa, chapNhanSoAm, chapNhanSoDu, lanThu);
    }

    var ketQuaIsFloat = (ketQua + "").indexOf('.') != -1;
    if (ketQuaIsFloat && !chapNhanSoDu) {
      lanThu ++;
      return self.taoMotBaiToanChoMotBieuThuc(cacPhepToan, cacSoToiDa, chapNhanSoAm, chapNhanSoDu, lanThu);
    }

    return baiToan;
  },

  taoCacBaiToanSoSanh: function ($phepSoSanhCard) {
    var self = this;

    var soBaiToan = $phepSoSanhCard.find('#pss_input_so_bai_toan').val();
    var soToiDa = $phepSoSanhCard.find('#pss_input_so_lon_nhat').val();

    var numBaiToan = 0;
    var cacBaiToan = [];
    var baiToan = [];

    while (numBaiToan < soBaiToan) {
      cacBaiToan.push(self.taoMotBaiToanSoSanh(soToiDa));

      numBaiToan ++;
    }

    return cacBaiToan;
  },

  taoMotBaiToanSoSanh: function (soToiDa) {
    return [Utilities.randomNumber(soToiDa), Utilities.randomNumber(soToiDa)];
  }
}
