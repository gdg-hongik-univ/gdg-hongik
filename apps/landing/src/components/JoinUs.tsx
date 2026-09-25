import { Typography } from '../../../../packages/wowds/ui/components/Typography'
import CTAButton from './common/CTAButton'

interface RecruitmentStatusProps {
  isRecruiting: boolean
}

const JoinUs = ({ isRecruiting }: RecruitmentStatusProps) => {
  return (
    <section className="relative w-full overflow-hidden h-73 s:h-75 l:h-87">
      <svg
        viewBox="0 0 360 292"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="block s:hidden w-full h-full object-cover pointer-events-none select-none"
      >
        <g clipPath="url(#clip_xs)">
          <rect width="360" height="292" fill="url(#grad_xs)" />
          <g opacity="0.25">
            <circle
              opacity="0.3"
              cx="16.3624"
              cy="16.3624"
              r="16.3624"
              transform="matrix(1 0 0 -1 116 149.477)"
              fill="white"
              fillOpacity="0.7"
            />
            <g opacity="0.8">
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(1 0 0 -1 258.128 21.7344)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(1 0 0 -1 258.128 21.7344)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 379.656 99.0703)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 379.656 99.0703)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 300.253 85.8594)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 300.253 85.8594)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 268.595 -54.7578)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 268.595 -54.7578)"
                fill="white"
                fillOpacity="0.75"
              />
            </g>
            <rect
              opacity="0.5"
              x="50.5703"
              y="164.203"
              width="92.3663"
              height="215.229"
              rx="46.1832"
              transform="rotate(42.56 50.5703 164.203)"
              fill="white"
              fillOpacity="0.7"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="grad_xs"
            x1="-72.375"
            y1="225.636"
            x2="450.379"
            y2="213.76"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.319995" stopColor="#4285F4" />
            <stop offset="1" stopColor="#C6EBC8" />
          </linearGradient>
          <clipPath id="clip_xs">
            <rect width="360" height="292" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        viewBox="0 0 600 300"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="hidden s:block m:hidden w-full h-full object-cover pointer-events-none select-none"
      >
        <g clipPath="url(#clip_s)">
          <rect width="600" height="300" fill="url(#grad_s)" />
          <g opacity="0.25">
            <circle
              opacity="0.3"
              cx="16.3624"
              cy="16.3624"
              r="16.3624"
              transform="matrix(1 0 0 -1 116 149.221)"
              fill="white"
              fillOpacity="0.7"
            />
            <g opacity="0.8">
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(1 0 0 -1 499.126 21.4658)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(1 0 0 -1 499.126 21.4658)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 620.654 98.8037)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 620.654 98.8037)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 541.251 85.5903)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 541.251 85.5903)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 509.594 -55.0303)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 509.594 -55.0303)"
                fill="white"
                fillOpacity="0.75"
              />
            </g>
            <rect
              opacity="0.5"
              x="50.5698"
              y="163.951"
              width="92.3663"
              height="215.229"
              rx="46.1832"
              transform="rotate(42.56 50.5698 163.951)"
              fill="white"
              fillOpacity="0.7"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="grad_s"
            x1="-120.625"
            y1="231.818"
            x2="749.9"
            y2="199.735"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.319995" stopColor="#4285F4" />
            <stop offset="1" stopColor="#C6EBC8" />
          </linearGradient>
          <clipPath id="clip_s">
            <rect width="600" height="300" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        viewBox="0 0 768 300"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="hidden m:block l:hidden w-full h-full object-cover pointer-events-none select-none"
      >
        <g clipPath="url(#clip_m)">
          <rect width="768" height="300" fill="url(#grad_m)" />
          <g opacity="0.25">
            <circle
              opacity="0.3"
              cx="16.3624"
              cy="16.3624"
              r="16.3624"
              transform="matrix(1 0 0 -1 126 138.972)"
              fill="white"
              fillOpacity="0.7"
            />
            <g opacity="0.8">
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(1 0 0 -1 668.126 22.2072)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(1 0 0 -1 668.126 22.2072)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 789.654 99.5454)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 789.654 99.5454)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 710.251 86.332)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 710.251 86.332)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 678.594 -54.2889)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="198.867"
                height="44.7741"
                rx="22.387"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 678.594 -54.2889)"
                fill="white"
                fillOpacity="0.75"
              />
            </g>
            <rect
              opacity="0.5"
              x="60.5696"
              y="153.701"
              width="92.3663"
              height="215.229"
              rx="46.1832"
              transform="rotate(42.56 60.5696 153.701)"
              fill="white"
              fillOpacity="0.7"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="grad_m"
            x1="-154.4"
            y1="231.818"
            x2="958.907"
            y2="179.299"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.319995" stopColor="#4285F4" />
            <stop offset="1" stopColor="#C6EBC8" />
          </linearGradient>
          <clipPath id="clip_m">
            <rect width="768" height="300" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        viewBox="0 0 1024 348"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="hidden l:block xl:hidden w-full h-full object-cover pointer-events-none select-none"
      >
        <g clipPath="url(#clip_l)">
          <rect width="1024" height="348" fill="url(#grad_l)" />
          <g opacity="0.25">
            <circle
              opacity="0.3"
              cx="20.8"
              cy="20.8"
              r="20.8"
              transform="matrix(1 0 0 -1 158.791 134.388)"
              fill="white"
              fillOpacity="0.7"
            />
            <g opacity="0.8">
              <rect
                width="252.8"
                height="56.917"
                rx="28.4585"
                transform="matrix(1 0 0 -1 898.398 34.1543)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="252.8"
                height="56.917"
                rx="28.4585"
                transform="matrix(1 0 0 -1 898.398 34.1543)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="252.8"
                height="56.9169"
                rx="28.4585"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 1052.89 132.467)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="252.8"
                height="56.9169"
                rx="28.4585"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 1052.89 132.467)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="252.8"
                height="56.917"
                rx="28.4585"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 951.948 115.674)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="252.8"
                height="56.917"
                rx="28.4585"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 951.948 115.674)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="252.8"
                height="56.917"
                rx="28.4585"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 911.704 -63.083)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="252.8"
                height="56.917"
                rx="28.4585"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 911.704 -63.083)"
                fill="white"
                fillOpacity="0.75"
              />
            </g>
            <rect
              opacity="0.5"
              x="65.0466"
              y="170.784"
              width="117.416"
              height="273.6"
              rx="58.7082"
              transform="rotate(42.56 65.0466 170.784)"
              fill="white"
              fillOpacity="0.7"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="grad_l"
            x1="-205.867"
            y1="268.909"
            x2="1277.49"
            y2="188.477"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.319995" stopColor="#4285F4" />
            <stop offset="1" stopColor="#C6EBC8" />
          </linearGradient>
          <clipPath id="clip_l">
            <rect width="1024" height="348" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        viewBox="0 0 1440 348"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="hidden xl:block w-full h-full object-cover pointer-events-none select-none"
      >
        <g clipPath="url(#clip_xl)">
          <rect width="1440" height="348" fill="url(#grad_xl)" />
          <g opacity="0.25">
            <circle
              opacity="0.3"
              cx="26"
              cy="26"
              r="26"
              transform="matrix(1 0 0 -1 290.998 108)"
              fill="white"
              fillOpacity="0.7"
            />
            <g opacity="0.8">
              <rect
                width="316"
                height="71.1462"
                rx="35.5731"
                transform="matrix(1 0 0 -1 1298.01 20.1055)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="316"
                height="71.1462"
                rx="35.5731"
                transform="matrix(1 0 0 -1 1298.01 20.1055)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="316"
                height="71.1462"
                rx="35.5731"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 1491.12 143)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="316"
                height="71.1462"
                rx="35.5731"
                transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 1491.12 143)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="316"
                height="71.1462"
                rx="35.5731"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 1364.95 122.006)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="316"
                height="71.1462"
                rx="35.5731"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 1364.95 122.006)"
                fill="white"
                fillOpacity="0.75"
              />
              <rect
                width="316"
                height="71.1462"
                rx="35.5731"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 1314.65 -101.441)"
                fill="#4285F4"
                fillOpacity="0.12"
              />
              <rect
                width="316"
                height="71.1462"
                rx="35.5731"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 1314.65 -101.441)"
                fill="white"
                fillOpacity="0.75"
              />
            </g>
            <rect
              opacity="0.5"
              x="81.3171"
              y="116"
              width="146.77"
              height="342"
              rx="73.3852"
              transform="rotate(42.56 81.3171 116)"
              fill="white"
              fillOpacity="0.7"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            id="grad_xl"
            x1="-289.5"
            y1="268.909"
            x2="1790.5"
            y2="110.306"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.319995" stopColor="#4285F4" />
            <stop offset="1" stopColor="#C6EBC8" />
          </linearGradient>
          <clipPath id="clip_xl">
            <rect width="1440" height="348" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start text-left pl-8 s:items-center s:text-center gap-8 text-white">
        <div className="flex flex-col gap-2 m:gap-3">
          <Typography
            variant="display3.1"
            isEn={isRecruiting}
            className="text-[30px]! s:text-[40px]! l:text-[48px]!"
          >
            {isRecruiting ? (
              'Join Us!'
            ) : (
              <>
                지금은 모집기간이 <br className="s:hidden" /> 아니에요
              </>
            )}
          </Typography>

          <Typography
            variant="body2.3"
            className="text-[14px]! s:text-[18px]! l:text-[20px]! break-keep"
          >
            {isRecruiting ? (
              <>
                GDG Hongik Univ.에서 함께 배우고 만들며
                <br className="s:hidden" /> 다양한 경험을 시작해보세요.
              </>
            ) : (
              <>
                GDG Hongik Univ.는 2026년 08월 12일
                <br className="s:hidden" /> 2학기 모집을 시작할 예정이에요.
              </>
            )}
          </Typography>
        </div>

        <CTAButton property="sub" size="auto">
          {isRecruiting ? 'GDG 가입하러 가기' : 'GDG 채널 둘러보기'}
        </CTAButton>
      </div>
    </section>
  )
}

export default JoinUs
