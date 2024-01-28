export function fit_text(text : string, font_size : number, width : number, options : any = {}) {
  // console.log(text, font_size, width);
  // let stripped_len = Math.floor(width * letter_width / (font_size) - 2)
  // console.log("text : ", text, text.length, stripped_len, text.substring(0, stripped_len))
  if (!options.truncate) return text
  let stripped_len = 8
  if (stripped_len > text.length)
    return text.substring(0, stripped_len)
  else return text.substring(0, stripped_len - 2) + ".."
}