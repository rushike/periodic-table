import "@/assets/css/element.css"
import { JSX } from "solid-js/jsx-runtime"
import { Layers } from "./Layers"

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
  base?: string
  s?   : EConfShellType
  p?   : EConfShellType
  d?   : EConfShellType
  f?   : EConfShellType
}

export interface ElementType {
  name             : string
  appearance       : string | null
  atomic_mass      : number
  boil             : number | null
  category         : string
  color            : string | null
  density          : number | null
  discovered_by    : string | null
  melt             : number | null
  molar_heat       : number | null
  named_by         : string | null
  number           : number
  period           : number
  phase            : string
  source           : string
  spectral_img     : string | null
  summary          : string
  symbol           : string
  xpos             : number
  ypos             : number
  shells           : number[]
  group            : number
  econf?           : EConfType
}

export interface StyleProps {
  bg_color? :   string,
  size?     :   number
}

interface ElementCellProps {
  element      : ElementType,
  style_props? : StyleProps
}

function AtomicNumberLabel({atomic_no, size} : {atomic_no : number, size : number}) {
  return <div class = "col-span-2"  style={{"font-size" : `${size * 2}px`}}>
      {atomic_no}
    </div>
}

function AtomicMassLabel({atomic_mass, size} : {atomic_mass : number, size : number}) {
  return <div class="text-right col-span-4" style={{"font-size" : `${size * 2}px`}}>
    {atomic_mass.toPrecision(3)}
  </div>
}

function Left({children, size} : {children : any, size : number}) {
  return <div class = "col-span-2"  style={{"font-size" : `${size }px`}}>
      {children}
    </div>
}

function Right({children, size} : {children : number, size : number}) {
  return <div class="text-right col-span-4" style={{"font-size" : `${size }px`}}>
    {children}
  </div>
}

function SymbolLabel({symbol, size} : {symbol : string, size : number}) {
  return <div class="col-span-4 text-center p-0" style={{"font-size" : `${size * 5}px`}}>
    {symbol}
  </div>

}

function NameLabel({name, size} : {name : string, size : number}) {
  let name_size = 8
  return <div class="text-center" style={{"font-size" : `${size * 2}px`}}>
    {name.length >  name_size ? `${name.substring(0, name_size - 2)}..` : name}
  </div>
}

export function ElementDetailsCell({element, style_props} : ElementCellProps) {
  let styles : JSX.CSSProperties = {
    "background-color": style_props?.bg_color || COLOR_PALETTE[element.category],
    "border" : "0.25px solid"
  }

  let size = 6

  return <div class="grid grid-auto-rows" style={styles}>
    {/* Top Header Line */}
    <div class="grid grid-cols-6">
        <AtomicNumberLabel atomic_no={element.number}        size = {size}></AtomicNumberLabel>
        <AtomicMassLabel   atomic_mass={element.atomic_mass} size = {size}></AtomicMassLabel>
    </div>
    {/* Middle Element Body */}
        <div class="grid grid-auto-rows">
          <div class="text-center">
            <SymbolLabel symbol={element.symbol} size={size}></SymbolLabel>
          </div>
          <div>
            <NameLabel name = {element.name} size={size}></NameLabel>
          </div>
        </div>
    <div></div>
    <div></div>
    <div></div>

    {/* Element footer */}
    <ElectronConfiguration econf={element.econf || {}}></ElectronConfiguration>
  </div>
}

export function ElementCell({element, style_props} : ElementCellProps) {
  let styles : JSX.CSSProperties = {
    "background-color": style_props?.bg_color || COLOR_PALETTE[element.category],
    "border" : "0.25px solid"
  }

  let size = 3

  return <div class="grid grid-auto-rows" style={styles}>
    {/* Top Header Line */}
    <div class="grid grid-cols-6">
        <AtomicNumberLabel atomic_no={element.number}        size = {size}></AtomicNumberLabel>
        <AtomicMassLabel   atomic_mass={element.atomic_mass} size = {size}></AtomicMassLabel>
    </div>
    {/* Middle Element Body */}
    <div class="grid grid-auto-rows">
      <div class="grid grid-cols-6 text-center">
        <SymbolLabel symbol={element.symbol} size={size}></SymbolLabel>
      </div>
      <div>
        <NameLabel name = {element.name} size={size}></NameLabel>
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