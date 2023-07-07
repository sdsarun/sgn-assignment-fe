import axios from "axios"

export const fetcher = url => axios.get(url).then(res => res.data)
export function generateRGB(r = 255, g = 255, b = 255, min = 100) {
  return {
    r: Math.floor(Math.random() * (r - min) + min),
    g: Math.floor(Math.random() * (g - min) + min),
    b: Math.floor(Math.random() * (b - min) + min),
  }
}
