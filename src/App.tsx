import {StandardPeriodicTable} from "@/components/PeriodicTable";

import "@/assets/css/element.css"
import elements from  "@/assets/data/elements.json"


export default function App() {
  return <div class="periodic-table">
      <StandardPeriodicTable elements={elements}></StandardPeriodicTable>
    </div>
}