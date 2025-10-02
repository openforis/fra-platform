import React from 'react'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'

import { LegendColors } from './colors'

const Temperate: React.FC = () => {
  const { cycleName } = useCycleRouteParams()
  const fill = LegendColors[cycleName].temperate

  return (
    <svg height="68.627" viewBox="0 0 194.791 68.627" width="194.791" xmlns="http://www.w3.org/2000/svg">
      <g id="Trees_03" transform="translate(0 0)">
        <line
          data-name="Line 305"
          fill="none"
          id="Line_305"
          stroke="#707070"
          strokeWidth="1"
          transform="translate(0 68.127)"
          x2="194.791"
        />
        <g data-name="Group 10453" id="Group_10453" transform="translate(50.969 0)">
          <g data-name="Group 10405" id="Group_10405" transform="translate(52.128 16.334)">
            <path
              d="M202.343,336.213a6.442,6.442,0,0,1,.214.829c.289,1.485.385,4.424-3.463,4.165a4.894,4.894,0,0,1-4.96-4.994s-3.078,6.56-9.235,2.505c0,0-3.42-4.916,3.249-7.327,0,0-4.618,1.722-6.328-2.239s4.96-6.027,7.7-6.027c0,0-4.618-1.237-3.591-4.166s6.1-3.823,10.233-2.928c0,0-4.988-4.961,0-6.683,0,0,.028-3.272,5.672-2.928s4.96,3.272,4.96,3.272,2.394-.689,3.078,0l.684.689-1.2,1.722a4.427,4.427,0,0,1,4.96,1.378c2.394,2.55.855,4.65,0,4.65h.855s3.934-1.378,5.131,3.1-4.447,3.961-4.447,3.961,7.354,1.894,6.157,5.338-4.276,3.272-7.012,2.411c0,0,5.3,3.617.855,6.028s-11.565-.539-13.393-2.422"
              data-name="Path 15272"
              fill={fill}
              id="Path_15272"
              transform="translate(-181.543 -306.395)"
            />
            <rect
              data-name="Rectangle 2916"
              fill={fill}
              height="22.388"
              id="Rectangle_2916"
              transform="translate(18.576 28.958)"
              width="3.933"
            />
          </g>
          <g data-name="Group 10406" id="Group_10406" transform="translate(21.749 4.821)">
            <path
              d="M172.245,331.322c2.163,1.341,11.322,1.65,11.322,1.65-4.959-1.55-10.774-7.405-10.774-7.405,2.223,1.894,10.774,1.55,10.774,1.55-4.276-1.377-12.314-9.3-12.314-9.3,2.394,1.2,8.38,0,8.38,0-3.762-.694-8.38-7.056-8.38-7.056,2.052,1.722,7.183.689,7.183.689-3.592-1.518-10.261-9.644-10.261-9.644,2.223,1.894,7.867,1.722,7.867,1.722-4.447-1.377-15.734-14.638-15.734-14.638s-11.288,13.261-15.734,14.638c0,0,5.644.172,7.867-1.722,0,0-6.67,8.126-10.261,9.644,0,0,5.13,1.033,7.182-.689,0,0-4.618,6.363-8.38,7.056,0,0,5.986,1.2,8.38,0,0,0-8.038,7.927-12.313,9.3,0,0,8.551.345,10.774-1.55,0,0-5.814,5.856-10.774,7.405,0,0,9.16-.308,11.322-1.65-1.639,1.294-9.517,7.388-13.032,7.85a9.472,9.472,0,0,0,8.722,0l5.815,2.239,4.789-2.927,4.959,2.927.684-.6.684.6,4.959-2.927,4.789,2.927,5.815-2.239a9.472,9.472,0,0,0,8.722,0C181.763,338.709,173.885,332.616,172.245,331.322Z"
              data-name="Path 15273"
              fill={fill}
              id="Path_15273"
              transform="translate(-135.339 -288.884)"
            />
            <rect
              data-name="Rectangle 2917"
              fill={fill}
              height="55.41"
              id="Rectangle_2917"
              transform="translate(23.858 7.448)"
              width="2.95"
            />
          </g>
          <g data-name="Group 10407" id="Group_10407" transform="translate(0 11.979)">
            <path
              d="M134.964,337.376c1.917,1.189,10.033,1.462,10.033,1.462-4.395-1.373-9.547-6.562-9.547-6.562,1.97,1.679,9.547,1.373,9.547,1.373-3.788-1.22-10.912-8.244-10.912-8.244,2.122,1.064,7.426,0,7.426,0-3.333-.615-7.426-6.253-7.426-6.253,1.819,1.526,6.365.61,6.365.61-3.182-1.345-9.093-8.546-9.093-8.546,1.971,1.679,6.971,1.526,6.971,1.526-3.94-1.22-13.942-12.971-13.942-12.971s-10,11.751-13.943,12.971c0,0,5,.153,6.971-1.526,0,0-5.91,7.2-9.093,8.546,0,0,4.547.916,6.365-.61,0,0-4.092,5.638-7.426,6.253,0,0,5.3,1.064,7.426,0,0,0-7.123,7.024-10.911,8.244,0,0,7.577.306,9.547-1.373,0,0-5.153,5.188-9.547,6.562,0,0,8.116-.273,10.033-1.462-1.453,1.147-8.434,6.547-11.548,6.956a8.393,8.393,0,0,0,7.729,0l5.153,1.984,4.243-2.594,4.4,2.594.606-.534.606.534,4.395-2.594,4.243,2.594,5.153-1.984a8.394,8.394,0,0,0,7.729,0C143.4,343.923,136.417,338.522,134.964,337.376Z"
              data-name="Path 15274"
              fill={fill}
              id="Path_15274"
              transform="translate(-102.26 -299.771)"
            />
            <rect
              data-name="Rectangle 2918"
              fill={fill}
              height="49.101"
              id="Rectangle_2918"
              transform="translate(21.141 6.6)"
              width="2.614"
            />
          </g>
          <g data-name="Group 10408" id="Group_10408" transform="translate(6.592 2.065)">
            <path
              d="M132.971,284.691l-9.377,7.493h18.753Z"
              data-name="Path 15275"
              fill={fill}
              id="Path_15275"
              transform="translate(-116.159 -284.691)"
            />
            <path
              d="M131.367,295.555l-12.455,9.953h24.91Z"
              data-name="Path 15276"
              fill={fill}
              id="Path_15276"
              transform="translate(-114.555 -288.412)"
            />
            <path
              d="M129.83,310.256l-15.405,12.31h30.81Z"
              data-name="Path 15277"
              fill={fill}
              id="Path_15277"
              transform="translate(-113.018 -293.447)"
            />
            <path
              d="M129.1,326.207l-16.812,13.434h33.623Z"
              data-name="Path 15278"
              fill={fill}
              id="Path_15278"
              transform="translate(-112.286 -298.911)"
            />
            <rect
              data-name="Rectangle 2919"
              fill={fill}
              height="52.698"
              id="Rectangle_2919"
              transform="translate(14.773 2.068)"
              width="3.207"
            />
          </g>
          <g data-name="Group 10409" id="Group_10409" transform="translate(13.775 13.173)">
            <path
              d="M143.9,301.586l-9.377,7.493h18.753Z"
              data-name="Path 15279"
              fill={fill}
              id="Path_15279"
              transform="translate(-127.084 -301.586)"
            />
            <path
              d="M142.292,312.45,129.837,322.4h24.91Z"
              data-name="Path 15280"
              fill={fill}
              id="Path_15280"
              transform="translate(-125.48 -305.307)"
            />
            <path
              d="M140.755,327.15,125.35,339.46h30.81Z"
              data-name="Path 15281"
              fill={fill}
              id="Path_15281"
              transform="translate(-123.943 -310.342)"
            />
            <path
              d="M140.022,343.1,123.21,356.536h33.623Z"
              data-name="Path 15282"
              fill={fill}
              id="Path_15282"
              transform="translate(-123.21 -315.805)"
            />
            <rect
              data-name="Rectangle 2920"
              fill={fill}
              height="52.698"
              id="Rectangle_2920"
              transform="translate(14.773 2.068)"
              width="3.207"
            />
          </g>
          <g data-name="Group 10410" id="Group_10410" transform="translate(44.025 0)">
            <rect
              data-name="Rectangle 2921"
              fill={fill}
              height="55.152"
              id="Rectangle_2921"
              transform="translate(17.572 12.399)"
              width="3.207"
            />
            <path
              d="M194.634,309.671l-1.961.961-9.262-19.162,1.961-.961Z"
              data-name="Path 15283"
              fill={fill}
              id="Path_15283"
              transform="translate(-174.08 -284.619)"
            />
            <path
              d="M194.634,340.709l-1.961.961-9.262-19.162,1.961-.961Z"
              data-name="Path 15284"
              fill={fill}
              id="Path_15284"
              transform="translate(-174.08 -295.25)"
            />
            <path
              d="M197.067,323.225l1.961.961,9.262-19.162-1.961-.961Z"
              data-name="Path 15285"
              fill={fill}
              id="Path_15285"
              transform="translate(-178.757 -289.262)"
            />
            <path
              d="M205.188,318.521l-.77-1.342,10.664-6.2.77,1.342Z"
              data-name="Path 15286"
              fill={fill}
              id="Path_15286"
              transform="translate(-181.275 -291.63)"
            />
            <path
              d="M199.339,305.522l-1.088-1.1,8.707-8.768,1.088,1.1Z"
              data-name="Path 15287"
              fill={fill}
              id="Path_15287"
              transform="translate(-179.162 -286.383)"
            />
            <path
              d="M198.749,297.58l-1.408-.625,4.966-11.347,1.408.625Z"
              data-name="Path 15288"
              fill={fill}
              id="Path_15288"
              transform="translate(-178.851 -282.941)"
            />
            <path
              d="M192.4,298.86l-1.49-.387,3.073-12.007,1.49.387Z"
              data-name="Path 15289"
              fill={fill}
              id="Path_15289"
              transform="translate(-176.65 -283.234)"
            />
            <path
              d="M191.8,310.163h0a.767.767,0,0,1-1.009.41l-9.919-4.237a.776.776,0,0,1-.408-1.016h0a.767.767,0,0,1,1.009-.411l9.918,4.237A.777.777,0,0,1,191.8,310.163Z"
              data-name="Path 15290"
              fill={fill}
              id="Path_15290"
              transform="translate(-173.05 -289.531)"
            />
            <ellipse
              cx="3.463"
              cy="3.487"
              data-name="Ellipse 327"
              fill={fill}
              id="Ellipse_327"
              rx="3.463"
              ry="3.487"
              transform="translate(20.907 0.129)"
            />
            <ellipse
              cx="3.463"
              cy="3.487"
              data-name="Ellipse 328"
              fill={fill}
              id="Ellipse_328"
              rx="3.463"
              ry="3.487"
              transform="translate(24.627 6.716)"
            />
            <ellipse
              cx="3.463"
              cy="3.487"
              data-name="Ellipse 329"
              fill={fill}
              id="Ellipse_329"
              rx="3.463"
              ry="3.487"
              transform="translate(14.494)"
            />
            <ellipse
              cx="3.463"
              cy="3.487"
              data-name="Ellipse 330"
              fill={fill}
              id="Ellipse_330"
              rx="3.463"
              ry="3.487"
              transform="translate(6.669 3.487)"
            />
            <ellipse
              cx="3.463"
              cy="3.487"
              data-name="Ellipse 331"
              fill={fill}
              id="Ellipse_331"
              rx="3.463"
              ry="3.487"
              transform="translate(4.618 12.271)"
            />
            <ellipse
              cx="3.463"
              cy="3.487"
              data-name="Ellipse 332"
              fill={fill}
              id="Ellipse_332"
              rx="3.463"
              ry="3.487"
              transform="translate(30.014 16.921)"
            />
            <ellipse
              cx="3.463"
              cy="3.487"
              data-name="Ellipse 333"
              fill={fill}
              id="Ellipse_333"
              rx="3.463"
              ry="3.487"
              transform="translate(24.756 11.884)"
            />
            <ellipse
              cx="3.463"
              cy="3.487"
              data-name="Ellipse 334"
              fill={fill}
              id="Ellipse_334"
              rx="3.463"
              ry="3.487"
              transform="translate(7.055 23.121)"
            />
            <ellipse
              cx="6.349"
              cy="3.164"
              data-name="Ellipse 335"
              fill={fill}
              id="Ellipse_335"
              rx="6.349"
              ry="3.164"
              transform="translate(2.437 25.315)"
            />
            <ellipse
              cx="6.349"
              cy="3.164"
              data-name="Ellipse 336"
              fill={fill}
              id="Ellipse_336"
              rx="6.349"
              ry="3.164"
              transform="translate(0 14.078)"
            />
            <ellipse
              cx="6.349"
              cy="3.164"
              data-name="Ellipse 337"
              fill={fill}
              id="Ellipse_337"
              rx="6.349"
              ry="3.164"
              transform="translate(1.154 5.166)"
            />
            <ellipse
              cx="6.349"
              cy="3.164"
              data-name="Ellipse 338"
              fill={fill}
              id="Ellipse_338"
              rx="6.349"
              ry="3.164"
              transform="translate(11.672 0.904)"
            />
            <ellipse
              cx="6.349"
              cy="3.164"
              data-name="Ellipse 339"
              fill={fill}
              id="Ellipse_339"
              rx="6.349"
              ry="3.164"
              transform="translate(24.755 9.428)"
            />
            <ellipse
              cx="6.349"
              cy="3.164"
              data-name="Ellipse 340"
              fill={fill}
              id="Ellipse_340"
              rx="6.349"
              ry="3.164"
              transform="translate(28.988 19.503)"
            />
            <ellipse
              cx="6.349"
              cy="3.164"
              data-name="Ellipse 341"
              fill={fill}
              id="Ellipse_341"
              rx="6.349"
              ry="3.164"
              transform="translate(12.442 9.041)"
            />
          </g>
          <g data-name="Group 10411" id="Group_10411" transform="translate(23.737 42.681)">
            <ellipse
              cx="9.309"
              cy="7.984"
              data-name="Ellipse 342"
              fill={fill}
              id="Ellipse_342"
              rx="9.309"
              ry="7.984"
              transform="translate(3.162 2.407)"
            />
            <ellipse
              cx="5.456"
              cy="4.679"
              data-name="Ellipse 343"
              fill={fill}
              id="Ellipse_343"
              rx="5.456"
              ry="4.679"
              transform="translate(0 8.074)"
            />
            <ellipse
              cx="5.456"
              cy="4.679"
              data-name="Ellipse 344"
              fill={fill}
              id="Ellipse_344"
              rx="5.456"
              ry="4.679"
              transform="translate(14.164 8.074)"
            />
            <ellipse
              cx="5.456"
              cy="4.679"
              data-name="Ellipse 345"
              fill={fill}
              id="Ellipse_345"
              rx="5.456"
              ry="4.679"
              transform="translate(6.77 0)"
            />
            <rect
              data-name="Rectangle 2922"
              fill={fill}
              height="7.625"
              id="Rectangle_2922"
              transform="translate(11.447 17.208)"
              width="2.227"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Temperate
