import { FileReader } from "../index"

const file = process.argv[2]
const reader = FileReader(file)

const loop = setInterval(() => {
   const {done, value} = reader.next()
   if (!done) 
      process.stdout.write(value)
   else 
      clearInterval(loop)
}, 1)