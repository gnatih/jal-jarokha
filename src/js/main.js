import "pannellum";
import "pannellum/build/pannellum.css";

let els = document.querySelectorAll('.threesixty')

if (els.length) {
  els.forEach((el) => {
    pannellum.viewer(el.id, {
      panorama: `/images/${el.dataset.story}/360/${el.id}.jpg`,
      mouseZoom: false,
      keyboardZoom: false,
      autoLoad: true,
      showControls: false,
      preview: '/images/paper.jpg',
    })
  })
}
