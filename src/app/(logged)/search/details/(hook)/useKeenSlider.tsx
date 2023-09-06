import { useKeenSlider as usePrimitiveKeenSlider } from 'keen-slider/react'

export function useKeenSlider() {
  function ThumbnailPlugin(mainRef: any) {
    return (slider: any) => {
      function removeActive() {
        slider.slides.forEach((slide: any) => {
          slide.classList.remove("active")
        })
      }
      function addActive(idx: any) {
        slider.slides[idx].classList.add("active")
      }
  
      function addClickEvents() {
        slider.slides.forEach((slide: any, idx: any) => {
          slide.addEventListener("click", () => {
            if (mainRef.current) mainRef.current.moveToIdx(idx)
          })
        })
      }
  
      slider.on("created", () => {
        if (!mainRef.current) return
        addActive(slider.track.details.rel)
        addClickEvents()
        mainRef.current.on("animationStarted", (main: any) => {
          removeActive()
          const next = main.animator.targetIdx || 0
          addActive(main.track.absToRel(next))
          slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
        })
      })
    }
  }

  const [sliderRef, instanceRef] = usePrimitiveKeenSlider({
    initial: 0,
    slides: {
      perView: 1,
    }
  })
  const [thumbnailRef] = usePrimitiveKeenSlider({
    initial: 0,
    slides: {
      perView: 8,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },
      '(max-width: 1024px)': {
        slides: {
          perView: 5,
          spacing: 16,
        },
      },
    }
    
    
  }, [ThumbnailPlugin(instanceRef)])
  
  return {
    sliderRef,
    thumbnailRef,
    instanceRef,
    ThumbnailPlugin,
  }
}