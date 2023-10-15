import { ElementType, ElementCell, EConfType, ElementDetailsCell } from './Element';
import { Layers } from './Layers';

interface StandardPeriodicTableProps {
  elements : ElementType[]
}

const STANDARD_PERIODIC_TABLE_STRUCTURE =  [
  [ 1,  0,  0,   0,   0,    0,   0,   0,   0,   0,   0,   0,   0,   0,    0,   0,   0,   2],
  [ 3,  4,  0,   0,   0,    0,   0,   0,   0,   0,   0,   0,   5,   6,    7,   8,   9,  10],
  [11, 12,  0,   0,   0,    0,   0,   0,   0,   0,   0,   0,  13,  14,   15,  16,  17,  18],
  [19, 20, 21,  22,   23,  24,  25,  26,  27,  28,  29,  30,  31,  32,   33,  34,  35,  36],
  [37, 38, 39,  40,   41,  42,  43,  44,  45,  46,  47,  48,  49,  50,   51,  52,  53,  54],
  [55, 56,  0,  72,   73,  74,  75,  76,  77,  78,  79,  80,  81,  82,   83,  84,  85,  86],
  [87, 88,  0, 104,  105, 106, 107, 108, 109, 110, 111, 112, 113, 114,  115, 116, 117, 118],
  [-1,  0,  0,   0,   0,    0,   0,   0,   0,   0,   0,   0,   0,   0,    0,   0,   0,   0],
  [ 0,  0,  0,  57,   58,  59,  60,  61,  62,  63,  64,  65,  66,  67,   68,  69,  70,  71], 
  [ 0,  0,  0,  89,   90,  91,  92,  93,  94,  95,  96,  97,  98,  99,  100, 101, 102, 103]
]

export function StandardPeriodicTable({elements} : StandardPeriodicTableProps) {
  return <div style={{"width" : "600px"}}>
    <PeriodicTableTitle></PeriodicTableTitle>
    <br></br>
    <Layers>
      <DrawPeriodicTable elements={elements}></DrawPeriodicTable>
      <HoverElementDetails element={elements[0]}></HoverElementDetails>
    </Layers>
  </div>
}

function PeriodicTableTitle() {
  return <div class="text-center">
    <div class="prose prose-headings:h1 font-bold">
      Standard Periodic Table
    </div>
  </div>
}

function HoverElementDetails({element} : {element : ElementType}) {
  return <div class = "grid grid-cols-9">
    <div class="col-span-4"></div>
    <div><ElementDetailsCell element={element}/></div>
  </div>
}

function DrawPeriodicTable({elements} : StandardPeriodicTableProps) {
  var elements_map : {[key: number]: ElementType} = {}
  elements.reduce((acc, el) => {
    acc[el.number] = el; return acc
  }, elements_map )
  
  return <div class="grid">{
    STANDARD_PERIODIC_TABLE_STRUCTURE.map(row => {
      return <div class="grid grid-cols-[repeat(18,calc(100%/18))] gap-x-0">
        {
          row.map(atomic_no => {
            if(atomic_no === -1) return <div> <br></br></div> // blank line
            
            const el = elements_map[atomic_no];
            
            if(el) return <ElementCell element = {elements_map[atomic_no]}></ElementCell> 

            return <div></div> // blank space
          })
        }
        </div>
    })
  }</div>
}