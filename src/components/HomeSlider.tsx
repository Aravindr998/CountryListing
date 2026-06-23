import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react';

const HomeSlider = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const [scrollSnaps, setScrollSnaps] = useState([])


    const scrollTo = (index) => emblaApi?.scrollTo(index)
    const setupSnaps = (emblaApi) => setScrollSnaps(emblaApi.scrollSnapList())

    useEffect(() => {
        if (!emblaApi) return

        setupSnaps(emblaApi)
        emblaApi.on('reInit', setupSnaps)
    }, [emblaApi])

    const goToPrev = () => {
        emblaApi?.scrollPrev()
    }
    const goToNext = () => emblaApi?.scrollNext()

    return (
        <div className="embla relative mt-5">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">
                        <img src='https://picsum.photos/200/100' className='w-full' />
                    </div>
                    <div className="embla__slide">
                        <img src='https://picsum.photos/200/100' className='w-full' />
                    </div>
                    <div className="embla__slide">
                        <img src='https://picsum.photos/200/100' className='w-full' />
                    </div>
                </div>
            </div>

            <div className='absolute bottom-0 left-[50%] translate-x-[-50%] flex gap-2 text-red-500'>
                <button className="embla__prev" onClick={goToPrev}>Scroll to prev</button>
                <div className="embla__dots flex gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            className="embla__dot"
                            key={index}
                            onClick={() => scrollTo(index)}
                        >
                            {index}
                        </button>
                    ))}
                </div>
                <button className="embla__next" onClick={goToNext}>Scroll to next</button>

            </div>
        </div>
    );
}

export default HomeSlider