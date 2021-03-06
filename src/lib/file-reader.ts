/// <reference path="../index.d.ts" />

import { openSync, readSync, closeSync } from "graceful-fs"

export function *FileReader(fileOrStdinOrFd: string | (typeof process.stdin)| number, startAt: number = 0, chunkSizeInBytes = 64 * 1024): IterableIterator<Buffer> {
   let fd
   if (typeof fileOrStdinOrFd === "string") 
      fd = openSync(fileOrStdinOrFd, "r") 
   else if (typeof fileOrStdinOrFd === "number")
      fd = fileOrStdinOrFd
   else if (fileOrStdinOrFd.fd !== undefined)
      fd = fileOrStdinOrFd.fd
   else 
      throw "Invalid Argument: 1st argument must be a valid file path or process.stdin"

   let position = startAt
   while (true) {
      const buf = new Buffer(chunkSizeInBytes)
      let bytesLen
      // try catch block has no performance penalty
      try {
         bytesLen = readSync(fd, buf, 0, chunkSizeInBytes, position)
      } catch (e) {
         // Not sure why I am getting Error: EOF: end of file, read
         // when I do 'cat "somefile" | node dist/tests/test.js.' OR
         // 'echo "sometext" | node dist/tests/test.js' However
         // I don't get any error when I do  node dist/tests/test.js < somefile.
         // this catch statemenet will handle that case.
         if (e.code == 'EOF') 
            bytesLen = 0 
         else 
            throw e
      }

      if (!bytesLen) break

      if (chunkSizeInBytes == bytesLen) 
         yield buf
      else 
         yield buf.slice(0, bytesLen)

      position += bytesLen
   }
   closeSync(fd)
}