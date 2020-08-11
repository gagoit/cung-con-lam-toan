var CungConLamToan = {
  init: function () {
    this.$page = $('#cung_con_lam_toan_page');

    this.initEvents();
  },
  
  initEvents: function () {
    var self = this;

    TaoCacBaiToanTheoBieuThuc.init();
    TaoCacBaiToanSoSanh.init();

    self.$page.find('.category').click(function(e) {
      var containerName = $(this).data('container');

      self.$page.find('.container-category').addClass('d-none');
      self.$page.find('.' + containerName).removeClass('d-none');
    });
  }
}

$(function() {
  CungConLamToan.init();
});
