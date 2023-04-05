(function ($) {
  let showClouds = true;
  const sky = document.querySelector('.cloud-animation');
  const setRandomInterval = (fn, min, max) => {
    const range = 1 + max - min;
    const seconds = Math.floor(Math.random() * range + min);
    const milliseconds = seconds * 1000;
    setTimeout(() => {
      fn();
      setRandomInterval(fn, min, max);
    }, milliseconds);
  };

  let selectRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  let createCloud = function () {
    const cloud = document.createElement('div');
    cloud.setAttribute('class', 'cloud');
    cloud.style.top = `${Math.floor(Math.random() * 81)}%`;
    cloud.style.setProperty('--speed', selectRandom([1, 1.5, 2]));
    cloud.style.setProperty('--scale', selectRandom([3, 4.5, 7]));
    cloud.style.setProperty('--depth', selectRandom([0.55, 0.75, 0.95]));
    cloud.style.animationTimingFunction = 'linear';
    const cloudImagePath = `/images/cloud-${selectRandom([1, 2, 3, 4, 5, 6])}.png`;

    cloud.style.backgroundImage = `url(${cloudImagePath})`;
    sky.appendChild(cloud);

    cloud.addEventListener('animationend', () => {
      cloud.remove();
    });
  };

  window.addEventListener('visibilitychange', () => {
    showClouds = document.visibilityState === 'visible';
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((element) => {
      element.style.animationPlayState = document.visibilityState == 'visible' ? 'running' : 'paused';
    });
  });

  $(function () {
    Fancybox.bind('[data-fancybox]', {
      zoom: false,
      Toolbar: {
        display: {
          left: ['infobar'],
          right: ['close'],
        },
      },
    });

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
      var span = document.createElement('span');
      span.innerHTML = `<img src="/images/${args[1]}/${args[0]}.jpg" class="img-fluid"><i class="close-btn">&#x2715;</i>`;
      div.appendChild(span);
      span.style.display = 'block';
      span.style.marginLeft = '25px';
      span.style.marginTop = -span.scrollHeight - 120 + 'px';
    }

    function jjHotspotClick(ev, args) {
      if (window.innerWidth < 767) {
        $(ev.target).attr('data-fancybox', '');
        $(ev.target).attr('href', `/images/steps-of-curiosity/${args}.jpg`);

        $(ev.target).trigger('click');
      } else {
        $('.custom-hotspot').removeClass('active').css('zIndex', 1);
        ev.target.classList.add('active');
        ev.target.style.zIndex = 5;
      }
    }

    function jjMarkerTooltip(div, args) {
      const lang = $('html').attr('lang');

      div.classList.add('custom-tooltip');
      var span = document.createElement('span');
      span.innerHTML = args[lang];
      div.appendChild(span);
      span.style.width = span.scrollWidth - 20 + 'px';
      span.style.marginLeft = -(span.scrollWidth - div.offsetWidth) / 2 + 'px';
      span.style.marginTop = -span.scrollHeight - 12 + 'px';
    }

    function jjMarkerClick(e, args) {
      $('.custom-hotspot').removeClass('active').css('zIndex', 1);
      e.target.classList.add('active');
      e.target.style.zIndex = 5;
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
        let markers = $el.data('markers');

        if (!markers) {
          hotspots = hotspots.map((item) => ({ ...item, cssClass: 'custom-hotspot', createTooltipFunc: jjHotspotCreate, clickHandlerFunc: jjHotspotClick }));
        } else {
          hotspots = hotspots.map((marker) => ({ ...marker, cssClass: 'custom-hotspot', createTooltipFunc: jjMarkerTooltip, clickHandlerFunc: jjMarkerClick }));
        }

        params.hotSpots = hotspots;
      }

      pannellum.viewer(id, params);
    });

    $('.easyzoom').easyZoom();

    if ($('.cloud-animation').length) setRandomInterval(createCloud, 1, 5);
  });
})(jQuery);
