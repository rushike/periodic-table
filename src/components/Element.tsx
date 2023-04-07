import "@/assets/css/element.css"
import { JSX } from "solid-js/jsx-runtime"

const data =   {
  "name": "Hydrogen",
  "appearance": "colorless gas",
  "atomic_mass": 1.008,
  "boil": 20.271,
  "category": "diatomic nonmetal",
  "color": null,
  "density": 0.08988,
  "discovered_by": "Henry Cavendish",
  "melt": 13.99,
  "molar_heat": 28.836,
  "named_by": "Antoine Lavoisier",
  "number": 1,
  "period": 1,
  "phase": "Gas",
  "source": "https://en.wikipedia.org/wiki/Hydrogen",
  "spectral_img": "https://en.wikipedia.org/wiki/File:Hydrogen_Spectra.jpg",
  "summary": "Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the Universe, constituting roughly 75% of all baryonic mass.",
  "symbol": "H",
  "xpos": 1,
  "ypos": 1,
  "shells": [
    1
  ],
  "group": 1
}

export default function Element({element = data}) {
  
  return <div class="grid grid-auto-rows el-container px-1">
    <ElementHeader atomic_mass={element.atomic_mass} atomic_no={element.number}></ElementHeader>
    <ElementBody></ElementBody>
    <ElementFooter></ElementFooter>
  </div>
}

function ElementHeader ({atomic_no, atomic_mass} : {atomic_no : number, atomic_mass : number}) {
  return <div class="grid grid-cols-2">
        <div class = "el-atomic-no">
          {atomic_no}
        </div>
        <div class="el-atomic-mass text-right">
          {atomic_mass}
        </div>
    </div>
}

function ElementBody ({element = data}) {
  var {symbol, name} = element
  return <div class="grid grid-auto-rows">
    <div class="grid grid-cols-6">
      <div></div>
      <div class="col-span-4 text-center p-0 el-symbol">
        {symbol}
      </div>
      <div></div>
    </div>
    <div>
      <div class="text-center el-name">
        {name}
      </div>
    </div>
  </div>
}

function ElementFooter() {
  return <div class="grid grid-col-1">
    <div class = "text-center el-orbitals">
      <span>1</span><span>s</span><sup>1</sup>
    </div>
  </div>
}