import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react';

const HomeSlider = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const [scrollSnaps, setScrollSnaps] = useState([])


    const scrollTo = (index: number) => emblaApi?.scrollTo(index)
    const setupSnaps = (emblaApi: any) => setScrollSnaps(emblaApi.scrollSnapList())

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
        <div className="embla relative">
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

            <div className='absolute bottom-0 left-[50%] translate-x-[-50%] flex gap-2'>
                <button
                    className="embla__prev rounded bg-white px-2 py-1 shadow-sm"
                    onClick={goToPrev}
                >
                    {"<-"}
                </button>
                <div className="embla__dots flex gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            className="embla__dot rounded bg-white px-2 py-1 shadow-sm"
                            key={index}
                            onClick={() => scrollTo(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    className="embla__next rounded bg-white px-2 py-1 shadow-sm"
                    onClick={goToNext}
                >
                    {"->"}
                </button>

            </div>
        </div>
    );
}

export default HomeSlider
