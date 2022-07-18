import "pannellum";

let threesixtyViewers = [];

let threesixtyObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      threesixtyViewers[entry.target.id] = pannellum.viewer(entry.target.id, {
        panorama: `/images/${entry.target.dataset.story}/360/${entry.target.id}.jpg`,
        mouseZoom: false,
        keyboardZoom: false,
        autoLoad: true,
        showControls: false,
        preview: '/images/paper.jpg',
      })
    } else {
      if (threesixtyViewers[entry.target.id]) {
        threesixtyViewers[entry.target.id].destroy()
      }
    }
  })
})

let els = document.querySelectorAll('.threesixty')

if (els.length) {
  els.forEach((el) => {
    threesixtyObserver.observe(el)
  })
}
