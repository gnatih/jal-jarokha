(function ($) {
  $(function () {
    // pannellum.viewer('jhalra', {
    //   type: 'multires',
    //   multiRes: {
    //     basePath: '/images/typology-of-water-bodies/360/multires/jhalra',
    //     path: '/%l/%s%y_%x',
    //     fallbackPath: '/fallback/%s',
    //     extension: 'jpg',
    //     tileResolution: 512,
    //     maxLevel: 6,
    //     cubeResolution: 8432,
    //   },
    // });

    $('.threesixty-viewer').each(function () {
      let $el = $(this);
      let id = $el.attr('id');
      let story = $el.data('story');
      let type = $el.data('type');

      console.log(id, story, type);

      let params = {
        autoLoad: true,
        showControls: false,
        hotSpotDebug: true,
        preview: '/images/paper.jpg',
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
