import "@/assets/css/element.css"

const COLOR_PALETTE :  {[key: string]: string} = {
  "alkali-metal"          : "#ff4040",
  "alkaline-earth-metal"  : "#ffbd94",
  "transition-metal"      : "#ffff66",
  "post-transition-metal" : "#91ff66",
  "metalloid"             : "#66ffcf",
  "polyatomic-nonmetal"   : "#85cef2",
  "diatomic-nonmetal"     : "#66c9ff",
  "lanthanide"            : "#c966ff",
  "actinide"              : "#f24ed1",
  "noble-gas"             : "#9985f2"
}

export interface EConfShellType {
  n : string
  o : string
}

export interface EConfType {
  base : string
  s?   : EConfShellType
  p?   : EConfShellType
  d?   : EConfShellType
  f?   : EConfShellType
}

export interface ElementType {
  name             : string
  appearance       : string
  atomic_mass      : number
  boil             : number
  category         : string
  color            : string
  density          : number
  discovered_by    : string
  melt             : number
  molar_heat       : number
  named_by         : string
  number           : number
  period           : number
  phase            : string
  source           : string
  spectral_img     : string
  summary          : string
  symbol           : string
  xpos             : number
  ypos             : number
  shells           : [number]
  group            : number
  econf            : EConfType
}

interface ElementCellProps {
  element : ElementType
}

export function ElementCell({element} : ElementCellProps) {
  
  return <div class="grid grid-auto-rows el-container px-1" style={{"background-color" : `${COLOR_PALETTE[element.category]}`}}>
    {/* Top Header Line */}
    <div class="grid grid-cols-2">
        <div class = "el-atomic-no">
          {element.number}
        </div>
        <div class="el-atomic-mass text-right">
          {element.atomic_mass.toFixed(2)}
        </div>
    </div>
    {/* Middle Element Body */}
    <div class="grid grid-auto-rows">
      <div class="grid grid-cols-6">
        <div></div>
        <div class="col-span-4 text-center p-0 el-symbol">
          {element.symbol}
        </div>
        <div></div>
      </div>
      <div>
        <div class="text-center el-name">
          {element.name}
        </div>
      </div>
    </div>
    {/* Element footer */}
    {/* <ElectronConfiguration econf={data.econf}></ElectronConfiguration> */}
  </div>
}


export interface EConfPropsType {
  econf : EConfType
}

export function ElectronConfiguration({econf} : EConfPropsType) {
  return <div class="grid grid-col-1">
    <div class = "text-center el-orbitals">
      {
        Object.entries(econf).map(([confkey, confobj]) => {
          if (typeof confobj === "string" ) return <span class = "el-conf-element">{confobj.toString()}</span>
          return <span class = "el-conf-element">
              <span>{confobj.n}</span>
              <span>{confkey}</span>
              <sup>{confobj.o}</sup>
            </span>
        })
      }
    </div>
  </div>
}