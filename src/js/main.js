(function ($) {
  $(function () {
    let href = window.location.href;
    let referrer = document.referrer;

    if (href.indexOf('home') !== -1 && referrer.indexOf('stories') !== -1) {
      window.onload = function () {
        window.scroll(0, $('#jarokhas').offset().top);
      };
    }

    $(window).resize(function () {
      $('.threesixty-viewer').each(function () {
        let $el = $(this);
        $el.height($el.width() * 0.56);
      });
    });

    $('.threesixty-viewer').each(function () {
      let $el = $(this);
      $el.height($el.width() * 0.56);
      let id = $el.attr('id');
      let story = $el.data('story');
      let type = $el.data('type');

      let params = {
        autoLoad: true,
        showControls: false,
        hotSpotDebug: true,
        preview: '/images/paper.jpg',
        mouseZoom: false,
      };

      if (type == 'multires') {
        params.type = 'multires';
        params.multiRes = {
          basePath: `/images/${story}/360/multires/${id}`,
          path: '/%l/%s%y_%x',
          fallbackPath: '/fallback/%s',
          extension: 'jpg',
          tileResolution: 512,
          maxLevel: 6,
          cubeResolution: 8432,
        };
      }

      if (type == 'equirectangular') {
        params.type = 'equirectangular';
        params.panorama = `/images/${story}/360/${id}.jpg`;
      }

      if ($el.data('hotspots')) {
        params.hotSpots = $el.data('hotspots');
      }

      pannellum.viewer(id, params);
    });
  });
})(jQuery);
