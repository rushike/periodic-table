
export function Layers(props : any) {
  var z_index = 0
  console.log("children to layers : ", props.children, props.children.length)
  return <div class="relative">
    {
      props.children.map ( (child : any) => {
        return <div class="absolute w-full" style={{"z-index" : z_index++}}>
            {child}
          </div>
      })
    }
  </div>
}