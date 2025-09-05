import {ability_card} from "../../types/ability-card.ts";
import {getDynamicColor20, getDynamicColor30, getDynamicColorBase} from "../../types/ability-card-types.ts";

const NormalCardback = ({color: primaryColour = '#aaaaaa', secondaryColour = '#dddddd'}) => {
  return (<div className={'w-full h-full'}>
    <svg width="100%" height="100%" viewBox="0 0 1050 750" version="1.1" xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
         style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 5,}}>
      <g id="New-Card">
        <path
          d="M1050,41.667C1050,18.67 1031.33,0 1008.33,0L41.667,0L0,41.667L0,708.333L41.667,750L1008.33,750C1031.33,750 1050,731.33 1050,708.333L1050,41.667Z"
          style={{fill: 'white'}}/>
        <path
          d="M1050,41.667L1050,708.333C1050,731.33 1031.33,750 1008.33,750L41.667,750L0,708.333L0,41.667L41.667,0L1008.33,0C1031.33,0 1050,18.67 1050,41.667ZM1041.67,41.667C1041.67,23.269 1026.73,8.333 1008.33,8.333L45.118,8.333C45.118,8.333 8.333,45.118 8.333,45.118L8.333,704.882L45.118,741.667L1008.33,741.667C1026.73,741.667 1041.67,726.731 1041.67,708.333L1041.67,41.667Z"
          style={{fill: primaryColour}}/>
        <g id="Topmatter-Area" transform="matrix(1.0028,0,0,0.464949,-11.2231,-130.606)">
          <path
            d="M1050,370.519L1050,375L52.742,375L52.742,298.827L1016.76,298.827C1035.11,298.827 1050,330.951 1050,370.519Z"
            style={{fill: secondaryColour}}/>
        </g>
        <g id="Sidebar-Line">
          <g id="Sidebar-Line1" transform="matrix(-0.0670115,-1.37637e-17,8.20654e-18,-0.112389,46.2651,741.332)">
            <path d="M28.205,0L59.295,0L43.75,741.473L28.205,0Z" style={{fill: primaryColour}}/>
          </g>
          <g id="Sidebar-Line2" transform="matrix(0.348405,0,0,0.112389,28.0906,212.5)">
            <path d="M40.76,0L46.74,0L43.75,741.473L40.76,0Z" style={{fill: primaryColour}}/>
          </g>
          <g id="Sidebar-Line3" transform="matrix(0.286592,0,0,0.286592,30.795,0)">
            <path d="M43.75,0L43.75,741.473" style={{fill: 'none', stroke: primaryColour, strokeWidth: '7.27px'}}/>
          </g>
        </g>
        <g id="Side-Dingle-Non-Heroic" transform="matrix(1.49596,0,0,1.49596,-64.3382,-5.31659)">
          <g transform="matrix(6.13135e-17,-1.00133,0.816175,4.99763e-17,-39.5204,174.771)">
            <path d="M173.772,136.607L29.129,136.607L58.058,101.116L144.844,101.116L173.772,136.607Z"
                  style={{fill: 'white'}}/>
            <path
              d="M173.772,136.607L29.129,136.607L58.058,101.116L144.844,101.116L173.772,136.607ZM160.342,129.782L142.539,107.941C142.539,107.941 60.362,107.941 60.362,107.941L42.56,129.782L160.342,129.782Z"
              style={{fill: primaryColour}}/>
          </g>
          <g transform="matrix(4.45503e-17,-0.727562,0.816175,4.99763e-17,-39.5204,146.998)">
            <path d="M173.772,136.607L29.129,136.607L65.29,101.116L137.612,101.116L173.772,136.607Z"
                  style={{fill: 'white'}}/>
            <path
              d="M173.772,136.607L29.129,136.607L65.29,101.116L137.612,101.116L173.772,136.607ZM165.124,133.195C165.124,133.195 135.917,104.529 135.917,104.529L66.985,104.529C66.985,104.529 37.778,133.195 37.778,133.195L165.124,133.195Z"
              style={{fill: primaryColour}}/>
          </g>
          <g transform="matrix(3.30883e-17,-0.540372,0.816175,4.99763e-17,-39.5204,128.007)">
            <path d="M173.772,136.607L29.129,136.607L79.44,101.116L123.147,101.116L173.772,136.607Z"
                  style={{fill: primaryColour}}/>
          </g>
          <g transform="matrix(1.31674e-16,2.1504,-1.25263,7.67016e-17,167.336,-61.0775)">
            <path d="M62.437,65.9L81.865,99.253L43.008,99.253L62.437,65.9Z" style={{fill: 'white'}}/>
            <path
              d="M62.437,65.9L81.865,99.253L43.008,99.253L62.437,65.9ZM62.437,69.045C62.437,69.045 46.135,97.03 46.135,97.03L78.738,97.03L62.437,69.045Z"
              style={{fill: primaryColour}}/>
          </g>
          <g transform="matrix(9.39273e-17,1.53395,-0.890599,5.45334e-17,131.403,-22.5886)">
            <path d="M62.437,65.9L81.865,99.253L43.008,99.253L62.437,65.9Z" style={{fill: primaryColour}}/>
          </g>
          <g transform="matrix(3.64817,3.64817,-1.1626,1.1626,49.9298,-95.5734)">
            <rect x="22.181" y="59.581" width="5.091" height="15.974" style={{fill: 'white'}}/>
          </g>
          <g transform="matrix(2.12782,2.12782,-0.678097,0.678097,55.0962,-25.2442)">
            <rect x="22.181" y="59.581" width="5.091" height="15.974" style={{fill: primaryColour}}/>
          </g>
        </g>
      </g>
    </svg>
  </div>)
}

const UpperHeaderDivider = ({color: primaryColour = '#aaaaaa'}) => {
  return(<div className={'w-[190pt] h-[1pt]'}>
    <svg width="100%" height="100%" viewBox="0 0 963 5" version="1.1" xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
         style={{fillRule:`evenodd`,clipRule:"evenodd",strokeLinejoin:'round',strokeMiterlimit:"2"}}><path id="Topbar-Line" d="M2.083,4.167l0,-4.167l670.635,2.083l287.699,0l-958.334,2.084Z" style={{fill:primaryColour}}/>
    </svg>
  </div>)
}

const HeroicCardback = ({color: primaryColour = '#aaaaaa', secondaryColour = '#dddddd'}) => {
  return (<div className={'w-full h-full'}>
    <svg width="100%" height="100%" viewBox="0 0 1050 750" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{fillRule:`evenodd`,clipRule:"evenodd",strokeLinejoin:'round',strokeMiterlimit:"5",}}>
    <g id="New-Card">
      <path d="M1050,41.667C1050,18.67 1031.33,0 1008.33,0L41.667,0L0,41.667L0,708.333L41.667,750L1008.33,750C1031.33,750 1050,731.33 1050,708.333L1050,41.667Z" style={{fill:"white",}}/>
      <path d="M1050,41.667L1050,708.333C1050,731.33 1031.33,750 1008.33,750L41.667,750L0,708.333L0,41.667L41.667,0L1008.33,0C1031.33,0 1050,18.67 1050,41.667ZM1041.67,41.667C1041.67,23.269 1026.73,8.333 1008.33,8.333L45.118,8.333C45.118,8.333 8.333,45.118 8.333,45.118L8.333,704.882L45.118,741.667L1008.33,741.667C1026.73,741.667 1041.67,726.731 1041.67,708.333L1041.67,41.667Z" style={{fill:primaryColour}}/>
      <g id="Topmatter-Area" transform="matrix(1.0028,0,0,0.464949,-11.2231,-130.606)">
            <path d="M1050,370.519L1050,375L52.742,375L52.742,298.827L1016.76,298.827C1035.11,298.827 1050,330.951 1050,370.519Z" style={{fill:secondaryColour,}}/>
        </g>
      <g id="Sidebar-Line">
        <g id="Sidebar-Line1" transform="matrix(-0.0670115,-1.37637e-17,8.20654e-18,-0.112389,46.2651,741.332)">
            <path d="M28.205,0L59.295,0L43.75,741.473L28.205,0Z" style={{fill:primaryColour}}/>
        </g>
        <g id="Sidebar-Line2" transform="matrix(0.348405,0,0,0.112389,28.0906,212.5)">
          <path d="M40.76,0L46.74,0L43.75,741.473L40.76,0Z" style={{fill:primaryColour}}/>
        </g>
        <g id="Sidebar-Line3" transform="matrix(0.286592,0,0,0.286592,30.795,0)">
          <path d="M43.75,0L43.75,741.473" style={{fill:"none",stroke:primaryColour,strokeWidth:"7.27px",}}/>
        </g>
      </g>

      <g id="Side-Dingle-Heroic" transform="matrix(1.49596,0,0,1.49596,-64.3382,-5.31659)">
            <g transform="matrix(6.13135e-17,-1.00133,0.816175,4.99763e-17,-39.5204,174.771)">
                <path d="M173.772,136.607L29.129,136.607L58.058,101.116L144.844,101.116L173.772,136.607Z" style={{fill:"white",}}/>
              <path d="M173.772,136.607L29.129,136.607L58.058,101.116L144.844,101.116L173.772,136.607ZM160.342,129.782L142.539,107.941C142.539,107.941 60.362,107.941 60.362,107.941L42.56,129.782L160.342,129.782Z" style={{fill:primaryColour}}/>
            </g>
        <g transform="matrix(4.45503e-17,-0.727562,0.816175,4.99763e-17,-39.5204,146.998)">
                <path d="M173.772,136.607L29.129,136.607L65.29,101.116L137.612,101.116L173.772,136.607Z" style={{fill:"white",}}/>
          <path d="M173.772,136.607L29.129,136.607L65.29,101.116L137.612,101.116L173.772,136.607ZM165.124,133.195C165.124,133.195 135.917,104.529 135.917,104.529L66.985,104.529C66.985,104.529 37.778,133.195 37.778,133.195L165.124,133.195Z" style={{fill:primaryColour}}/>
            </g>
        <g transform="matrix(3.30883e-17,-0.540372,0.816175,4.99763e-17,-39.5204,128.007)">
                <path d="M173.772,136.607L29.129,136.607L79.44,101.116L123.147,101.116L173.772,136.607Z" style={{fill:primaryColour}}/>
            </g>
        <g transform="matrix(1.31674e-16,2.1504,-1.25263,7.67016e-17,167.336,-61.0775)">
                <path d="M62.437,65.9L81.865,99.253L43.008,99.253L62.437,65.9Z" style={{fill:"rgb(224,180,80)",}}/>
          <path d="M62.437,65.9L81.865,99.253L43.008,99.253L62.437,65.9ZM62.437,69.045C62.437,69.045 46.135,97.03 46.135,97.03L78.738,97.03L62.437,69.045Z" style={{fill:primaryColour}}/>
            </g>
        <g transform="matrix(9.39273e-17,1.53395,-0.890599,5.45334e-17,131.403,-22.5886)">
                <path d="M62.437,65.9L81.865,99.253L43.008,99.253L62.437,65.9Z" style={{fill:primaryColour}}/>
            </g>
        <g transform="matrix(3.64817,3.64817,-1.1626,1.1626,49.9298,-95.5734)">
                <rect x="22.181" y="59.581" width="5.091" height="15.974" style={{fill:"rgb(224,180,80)",}}/>
            </g>
        </g>
    </g>
</svg>
  </div>)
}

export default function AbilityCardback({card}: { card: ability_card }) {
  let cardColours : {primaryColour: string, secondaryColour: string} = {primaryColour: getDynamicColorBase(card.type), secondaryColour: getDynamicColor20(card.type)}

  return <div className={``}>
    {card.cost ?
      <HeroicCardback color={cardColours.primaryColour} secondaryColour={cardColours.secondaryColour}/>
      : <NormalCardback color={cardColours.primaryColour} secondaryColour={cardColours.secondaryColour}/>
    }
  </div>
}

export function HeaderDivider({card, className}: { card: ability_card, className?: string }) {
  let cardColours : {primaryColour: string, secondaryColour: string} = {primaryColour: getDynamicColorBase(card.type), secondaryColour: getDynamicColor20(card.type)}

  return <div className={className}>
    <UpperHeaderDivider color={cardColours.primaryColour}/>
  </div>
}
