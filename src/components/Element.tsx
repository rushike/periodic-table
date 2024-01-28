import "@/assets/css/element.css"
import { JSX } from "solid-js/jsx-runtime"
import { Layers } from "./Layers"
import { fit_text } from '../utils';
import { createEffect, createSignal, onMount } from "solid-js";

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
  return <div class="text-right col-span-4 " style={{"font-size" : `${size * 2}px`}}>
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
  return <div class="col-span-4" style={{"font-size" : `${size * 5}px`}}>
    {symbol}
  </div>

}

function NameLabel({name, size, truncate} : {name : string, size : number, truncate : boolean }) {
  let name_size = 8
  let id = `${name}-${size}`
  const [stripped_name, set_stripped_name] = createSignal(name)
  console.log("name element : ", document.getElementById(id));
  // let striped_name = fit_text(name, 6, document.getElementById(id)?.offsetWidth || 0)

  onMount(()=> {
    
    set_stripped_name(
      fit_text(name, 6, document.getElementById(id)?.offsetWidth || 0, { truncate})
    )
    console.log("effect : ", stripped_name())
  })

  return <div id = {id} class="" style={{"font-size" : `${size * 2}px`}}>
    {/* {name.length >  name_size ? `${name.substring(0, name_size - 3)}..` : name} */}
    {stripped_name()}
  </div>
}

export function ElementDetailsCell({element, style_props} : ElementCellProps) {
  let styles : JSX.CSSProperties = {
    "background-color": style_props?.bg_color || COLOR_PALETTE[element.category],
    "border" : "0.25px solid"
  }

  let size = 6

  return <div class="grid grid-auto-rows  p-0 px-[0.2rem]" style={styles}>
      {/* Top Header Line */}
      <div class="grid grid-cols-6">
          <AtomicNumberLabel atomic_no={element.number}        size = {size}></AtomicNumberLabel>
          <AtomicMassLabel   atomic_mass={element.atomic_mass} size = {size}></AtomicMassLabel>
      </div>
      {/* Middle Element Body */}
      <div class="grid grid-auto-rows">
        <div class="font-bold">
          <SymbolLabel symbol={element.symbol} size={size}></SymbolLabel>
        </div>
        <div>
          <NameLabel name = {element.name} size={size} truncate = {false}></NameLabel>
        </div>
      </div>


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

  return <div class="grid grid-auto-rows p-0 pl-[0.2rem]" style={styles}>
    {/* Top Header Line */}
    <div class="grid grid-auto-rows">
      <div class="grid grid-cols-6 ">
          <AtomicNumberLabel atomic_no={element.number}        size = {size}></AtomicNumberLabel>
          <AtomicMassLabel   atomic_mass={element.atomic_mass} size = {size}></AtomicMassLabel>
      </div>
    </div>
    {/* Middle Element Body */}
    <div class="grid grid-auto-rows">
      <div class="grid grid-cols-6 font-bold">
        <SymbolLabel symbol={element.symbol} size={size}></SymbolLabel>
      </div>
      <div>
        <NameLabel name = {element.name} size={size} truncate = {true}></NameLabel>
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
    <div class = "el-orbitals italic">
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