var Templates = {
  bieuThuc: function (newNumOfBieuThuc) {
    return '<div class="card bieu-thuc-card mrg10T">' +
      '<div class="card-header">' +
        '<span>Biểu thức ' + newNumOfBieuThuc + '</span>' +
      '</div>' +

      '<div class="card-body">' +
        '<div class="bieu-thuc-wrapper row">' +
          '<div class="form-group col-auto">' +
            '<label for="input_so_' + newNumOfBieuThuc + '_1">Số thứ 1</label>' +
            '<input id="input_so_' + newNumOfBieuThuc + '_1" name="input_so_' + newNumOfBieuThuc + '_1" placeholder="Số thứ 1" type="number" required="required" class="form-control input-so">' +
          '</div>' +
          '<div class="form-group col-auto">' +
            '<label for="phep_toan_' + newNumOfBieuThuc + '_1">Phép toán</label>' +
            '<div>' +
              '<select id="phep_toan_' + newNumOfBieuThuc + '_1" name="phep_toan_' + newNumOfBieuThuc + '_1" class="custom-select phep-toan-select">' +
                '<option value="+">+</option>' +
                '<option value="-">-</option>' +
                '<option value="*">*</option>' +
                '<option value="/">/</option>' +
              '</select>' +
            '</div>' +
          '</div>' +
          '<div class="form-group col-auto">' +
            '<label for="input_so_' + newNumOfBieuThuc + '_2">Số thứ 2</label>' +
            '<input id="input_so_' + newNumOfBieuThuc + '_2" name="input_so_' + newNumOfBieuThuc + '_2" placeholder="Số thứ 2" type="number" required="required" class="form-control input-so">' +
          '</div>' +
        '</div>' +

        '<div class="form-group row">' +
          '<label for="input_so_bai_toan_' + newNumOfBieuThuc + '" class="col-auto">Số bài toán</label>' +
          '<div class="col-auto">' +
            '<input id="input_so_bai_toan_' + newNumOfBieuThuc + '" name="input_so_bai_toan_' + newNumOfBieuThuc + '" placeholder="Số bài toán" type="number" required="required" class="form-control col-auto input-so-bai-toan">' +
          '</div>' +

          '<div class="col-auto">' +
            '<p id="button_them_phep_toan">' +
              '<i class="fa fa-plus"></i>' +
              ' Thêm phép toán' +
            '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  },

  phepToanSelect: function (currentBieuThucIndex, newNumOfPhepToan) {
    var phepToanId = 'phep_toan_' + currentBieuThucIndex + '_' + newNumOfPhepToan;

    return '<div class="form-group col-auto">' + 
      '<label for="' + phepToanId + '">Phép toán</label>' +
      '<div>' +
        '<select id="' + phepToanId + '" name="' + phepToanId + '" class="custom-select phep-toan-select">' +
          '<option value="+">+</option>' +
          '<option value="-">-</option>' +
          '<option value="*">*</option>' +
          '<option value="/">/</option>' +
        '</select>' +
      '</div>' +
    '</div>';
  },

  inputSo: function (currentBieuThucIndex, newNumSo) {
    var inputSoId = 'input_so_' + currentBieuThucIndex + '_' + newNumSo;

    return '<div class="form-group col-auto">' +
      '<label for="' + inputSoId + '">Số thứ ' + newNumSo + '</label>' +
      '<input id="' + inputSoId + '" name="' + inputSoId + '" placeholder="Số thứ ' + newNumSo + '" type="number"  required="required" class="form-control input-so">' +
    '</div>'
  },

  baiToan: function (baiToanText, indexKetQua) {
    return '<div class="bai-toan col-auto mrg10B">' +
      '<span class="left-side">' + baiToanText + '</span><span> = </span>' +
      '<input id="input_ket_qua_' + indexKetQua + '" name="input_ket_qua_' + indexKetQua + '" placeholder="Kết quả" type="number" class="form-control input-ket-qua">' +
    '</div>';
  }
}
