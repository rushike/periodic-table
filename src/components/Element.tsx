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
  "group": 1,
  "econf": {
    "base": "[Rn]",
    "d": {
      "n": "6",
      "o": "10"
    },
    "s": {
      "n": "7",
      "o": "2"
    },
    "p": {
      "n": "7",
      "o": "6"
    }
  }
}

export default function Element({element = data}) {
  
  return <div class="grid grid-auto-rows el-container px-1">
    {/* Top Header Line */}
    <div class="grid grid-cols-2">
        <div class = "el-atomic-no">
          {element.number}
        </div>
        <div class="el-atomic-mass text-right">
          {element.atomic_mass}
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
    <ElectronConfiguration element={data}></ElectronConfiguration>
  </div>
}

function ElectronConfiguration({element = data}) {
  const econf = element.econf
  
  return <div class="grid grid-col-1">
    <div class = "text-center el-orbitals">
      {
        Object.entries(econf).map(([confkey, confobj] : [string, string | {"n" : string, "o" : string}]) => {
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