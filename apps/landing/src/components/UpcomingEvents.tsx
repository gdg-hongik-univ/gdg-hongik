import { Typography } from '@gdg/wowds'

const UpcomingEvents = () => {
  return (
    <section
      aria-labelledby="upcoming-events-title"
      className="relative min-h-175 w-full overflow-hidden px-4 l:min-h-250"
      style={{
        background:
          'linear-gradient(90deg, rgb(175 205 255 / 66%) 30%, rgb(255 249 214 / 49%) 100%)',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/img/upcoming-event-background.png"
          alt=""
          className="absolute inset-x-0 top-0 h-auto w-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 0%, rgb(255 255 255 / 0%) 35%, #fff 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center pt-35 text-center l:pt-50">
        <Typography variant="subtitle3.2" as="p" className="text-black">
          곧 열릴 GDG의 다음 활동을 확인해 보세요
        </Typography>
        <Typography
          id="upcoming-events-title"
          variant="display3.1"
          as="h2"
          isEn
          className="mt-3 text-black l:mt-4"
        >
          Upcoming Events
        </Typography>
        <Typography variant="body1.3" as="p" className="mt-3 text-gray-400 l:mt-4">
          마우스를 올려 일정을 자세히 확인해보세요
        </Typography>
      </div>
    </section>
  )
}

export default UpcomingEvents
