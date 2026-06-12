(function () {
  var slideshows = document.querySelectorAll("[data-slideshow]");

  slideshows.forEach(function (slideshow, slideshowIndex) {
    var slides = slideshow.querySelectorAll("img");
    if (slides.length < 2) return;

    slides.forEach(function (slide, index) {
      slide.classList.toggle("is-active", index === 0);
    });

    var current = 0;
    var interval = 3200 + slideshowIndex * 350;

    window.setInterval(function () {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, interval);
  });

  var galleries = document.querySelectorAll("[data-gallery]");

  galleries.forEach(function (gallery) {
    var stage = gallery.querySelector(".picture-gallery__stage");
    if (!stage) return;

    var slides = Array.prototype.slice.call(stage.querySelectorAll("img, video"));
    if (!slides.length) return;
    gallery.setAttribute("tabindex", "0");

    var counter = document.createElement("div");
    counter.className = "picture-gallery__counter";
    stage.appendChild(counter);

    var typeLabel = document.createElement("div");
    typeLabel.className = "picture-gallery__type";
    stage.appendChild(typeLabel);

    var prevButton = document.createElement("button");
    prevButton.className = "picture-gallery__nav picture-gallery__nav--prev";
    prevButton.type = "button";
    prevButton.setAttribute("aria-label", "Previous slide");
    prevButton.textContent = "\u2039";
    stage.appendChild(prevButton);

    var nextButton = document.createElement("button");
    nextButton.className = "picture-gallery__nav picture-gallery__nav--next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Next slide");
    nextButton.textContent = "\u203A";
    stage.appendChild(nextButton);

    var dots = document.createElement("div");
    dots.className = "picture-gallery__dots";
    gallery.appendChild(dots);

    var current = 0;

    function pauseInactiveVideos(activeIndex) {
      slides.forEach(function (slide, index) {
        if (index !== activeIndex && slide.tagName.toLowerCase() === "video") {
          slide.pause();
        }
      });
    }

    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle("is-active", slideIndex === current);
      });

      Array.prototype.slice.call(dots.children).forEach(function (dot, dotIndex) {
        dot.classList.toggle("is-active", dotIndex === current);
      });

      counter.textContent = (current + 1) + " / " + slides.length;
      typeLabel.textContent = slides[current].tagName.toLowerCase() === "video" ? "Video" : "";
      typeLabel.classList.toggle("is-visible", slides[current].tagName.toLowerCase() === "video");
      pauseInactiveVideos(current);
    }

    function nextSlide() {
      showSlide(current + 1);
    }

    function previousSlide() {
      showSlide(current - 1);
    }

    slides.forEach(function (slide, index) {
      var dot = document.createElement("button");
      dot.className = "picture-gallery__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Show slide " + (index + 1));
      dot.addEventListener("click", function () {
        showSlide(index);
      });
      dots.appendChild(dot);
    });

    prevButton.addEventListener("click", previousSlide);
    nextButton.addEventListener("click", nextSlide);

    gallery.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        previousSlide();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }
    });

    var touchStartX = 0;
    stage.addEventListener("touchstart", function (event) {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    stage.addEventListener("touchend", function (event) {
      var distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) < 42) return;
      if (distance > 0) {
        previousSlide();
      } else {
        nextSlide();
      }
    }, { passive: true });

    showSlide(0);
  });
})();
