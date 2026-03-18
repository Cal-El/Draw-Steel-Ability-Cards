import {ability_card} from "../../types/ability-card.ts";
import {getBackgroundColor, getPrimaryColor, getSecondaryColor} from "./utils/color-calculator.ts";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectThemeColours, selectVariant} from "../../redux/card-settings-slice.ts";

const UpperHeaderDivider = ({color: primaryColour = '#aaaaaa'}) => {
  return(<div className={'w-[190pt] h-[1pt]'}>
    <svg width="100%" height="100%" viewBox="0 0 963 5" version="1.1" xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
         style={{fillRule:`evenodd`,clipRule:"evenodd",strokeLinejoin:'round',strokeMiterlimit:"2"}}><path id="Topbar-Line" d="M2.083,4.167l0,-4.167l670.635,2.083l287.699,0l-958.334,2.084Z" style={{fill:primaryColour}}/>
    </svg>
  </div>)
}

const CardbackSvg = ({color: primaryColour = '#aaaaaa', fadedPrimary = '#dddddd', secondaryColour = '#dddddd',  baseColour = 'white', withBleed = false, useRoundCorners = false, isHeroic = true}) => {
  return (<div className={'w-full h-full'}>
    <svg width="100%" height="100%" viewBox="0 0 1050 750" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin:'round', strokeMiterlimit:1.5}}>
      <g id="New-Card">
        {useRoundCorners && <path d="M1050,35.417l0,679.166c0,19.547 -15.87,35.417 -35.417,35.417l-979.166,-0c-19.547,-0 -35.417,-15.87 -35.417,-35.417l0,-679.166c0,-19.547 15.87,-35.417 35.417,-35.417l979.166,-0c19.547,-0 35.417,15.87 35.417,35.417Z" style={{fill:primaryColour}}/>}
        {withBleed && <rect x="0" y="0" width="1050" height="750" style={{fill:primaryColour}}/>}
        <path d="M1045.83,35.417c0,-17.248 -14.002,-31.25 -31.25,-31.25l-971.208,-0l-39.208,39.208l-0,663.25l39.208,39.208l971.208,0c17.248,0 31.25,-14.002 31.25,-31.25l0,-679.166Z" style={{fill: baseColour, stroke: primaryColour, strokeWidth:'8.33px'}}/>
        <path id="Topmatter-Area" d="M1041.72,35.417l0,8.333l-1000.05,-0l-0,-35.417l972.968,0c14.948,0 27.083,12.136 27.083,27.084Z" style={{fill:fadedPrimary}}/>
        <g id="Sidebar-Line">
          <path id="Sidebar-Line1" d="M44.375,741.332l-2.083,-0l1.041,-83.334l1.042,83.334Z" style={{fill:primaryColour}}/>
          <path id="Sidebar-Line2" d="M42.292,212.5l2.083,0l-1.042,83.333l-1.041,-83.333Z" style={{fill:primaryColour}}/>
          <path id="Sidebar-Line3" d="M43.333,0l0,212.5" style={{fill:'none', stroke: primaryColour, strokeWidth: '2.08px', strokeLinecap: 'butt', strokeLinejoin: 'round', strokeMiterlimit: 5}}/>
        </g>
        <g id="Side-Dingle-Heroic">
          <path d="M44,-2l-0,212.333l-44,-42.466l0,-127.4l44,-42.467Z" style={{fill:primaryColour}}/>
          <path d="M36,17l-0,174l-28,-26.226l0,-121.003l28,-26.771Z" style={{fill:baseColour}}/>
          <path d="M44,24l-0,160.333l-44,-40.083l0,-80.167l44,-40.083Z" style={{fill:primaryColour}}/>
          <path d="M40,33l-0,143l-32,-29.533l-0,-83.867l32,-29.6Z" style={{fill:baseColour}}/>
          <path d="M44,44l0,120.333l-44,-41.855l0,-36.361l44,-42.117Z" style={{fill:primaryColour}}/>
          <path d="M62,104.167l-62,63.166l0,-126.333l62,63.167Z" style={{fill:primaryColour}}/>
          <path d="M56,104.167l-53,52.833l-0,-105.667l53,52.834Z" style={{fill:isHeroic ? secondaryColour : baseColour}}/>
          <path d="M45,104.167l-45,44.833l0,-89.667l45,44.834Z" style={{fill:primaryColour}}/>
          <path d="M55,104.167l-27.5,27.5l-27.5,-27.5l27.5,-27.5l27.5,27.5Z" style={{fill:isHeroic ? secondaryColour : baseColour}}/>
          {!isHeroic && <path d="M45,104.167l-16.5,16.5l-16.5,-16.5l16.5,-16.5l16.5,16.5Z" style={{fill:primaryColour}}/>}
        </g>
      </g>
    </svg>
  </div>)
}

export default function AbilityCardback({card}: { card: ability_card }) {
  const colourSettings = useAppSelector(selectThemeColours)
  const variant = useAppSelector(selectVariant)

  return <div className={``}>
    <CardbackSvg useRoundCorners={variant === 'useRoundedCorners'} withBleed={variant === 'useBleedCorners' || variant === 'professionalPrint'} color={getPrimaryColor(card.type, colourSettings)} fadedPrimary={getPrimaryColor(card.type, colourSettings, 20)} secondaryColour={getSecondaryColor(card.type, colourSettings)} baseColour={getBackgroundColor(card.type, colourSettings)} isHeroic={!!card.cost}/>
  </div>
}

export function HeaderDivider({card, className}: { card: ability_card, className?: string }) {
  const colourSettings = useAppSelector(selectThemeColours)

  return <div className={className}>
    <UpperHeaderDivider color={getPrimaryColor(card.type, colourSettings)}/>
  </div>
}
