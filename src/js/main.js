(function ($) {
  $(function () {
    let href = window.location.href;
    let referrer = document.referrer;

    if (href.indexOf('home') !== -1 && referrer.indexOf('stories') !== -1) {
      window.onload = function () {
        window.scroll(0, $('#jarokhas').offset().top);
      };
    }

    $(window).resize(resize360);

    function resize360() {
      $('.threesixty-viewer').each(function () {
        let $el = $(this);
        $el.height($el.width() * 0.45);
      });
    }

    function jjHotspotCreate(div, args) {
      // div.classList.add('custom-hotspot');
      var span = document.createElement('span');
      span.innerHTML = `<img src="/images/toorji-ka-jhalra/${args}.jpg" class="img-fluid"><i class="close-btn">&#x2715;</i>`;
      div.appendChild(span);
      span.style.display = 'block';
      span.style.marginLeft = '25px';
      span.style.marginTop = -span.scrollHeight - 120 + 'px';
    }

    function jjHotspotClick(ev, args) {
      $('.custom-hotspot').removeClass('active').css('zIndex', 1);
      ev.target.classList.add('active');
      ev.target.style.zIndex = 5;
    }

    $('.threesixty-viewer').each(function () {
      let $el = $(this);
      $el.height($el.width() * 0.45);
      let id = $el.attr('id');
      let story = $el.data('story');
      let type = $el.data('type');
      let ml = $el.data('ml');
      let cr = $el.data('cr');

      let params = {
        autoLoad: true,
        showControls: false,
        hotSpotDebug: true,
        preview: '/images/paper.jpg',
        mouseZoom: false,
        minPitch: -55,
        maxPitch: 55,
      };

      if (type == 'multires') {
        params.type = 'multires';
        params.hfov = 100.0;
        params.multiRes = {
          basePath: `/images/${story}/360/${id}`,
          path: '/%l/%s%y_%x',
          fallbackPath: '/fallback/%s',
          extension: 'jpg',
          tileResolution: 512,
          maxLevel: ml,
          cubeResolution: cr,
        };
      }

      if (type == 'equirectangular') {
        params.type = 'equirectangular';
        params.panorama = `/images/${story}/360/${id}.jpg`;
      }

      if ($el.data('hotspots')) {
        let hotspots = $el.data('hotspots');

        hotspots = hotspots.map((item) => ({ ...item, cssClass: 'custom-hotspot', createTooltipFunc: jjHotspotCreate, clickHandlerFunc: jjHotspotClick }));
        params.hotSpots = hotspots;
      }

      pannellum.viewer(id, params);
    });

    $('.easyzoom').easyZoom();
  });
})(jQuery);
