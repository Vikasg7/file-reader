# file-reader

- ### Intro  
   **file-reader** is a ES6 Generator function which returns an iterable to iterater over content in a `file` or `stdin` chunk by chunk using `.next()` method or `for..of` loop.

- ### Install  
   `npm install git+https://github.com/Vikasg7/file-reader.git`  

- ### Syntax  
   ````javascript  
   const reader: IterableIterator<Buffer> = FileReader(fileOrStdinOrFd: string | number | NodeJS.ReadStream, startAt?: number, chunkSizeInBytes?: number)
   ````

- ### Usage (in TypeScript)  
   ````javascript  
   import { FileReader } from "file-reader"

   const file = process.argv[2]
   const reader = FileReader(file)

   const loop = setInterval(() => {
      const {done, value} = reader.next()
      if (!done) 
         process.stdout.write(value)
      else 
         clearInterval(loop)
   }, 1)
   ````

- ### Example
   Check the tests folder in src folder for an example.