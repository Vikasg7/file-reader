"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const file = process.argv[2];
const reader = index_1.FileReader(file);
const loop = setInterval(() => {
    const { done, value } = reader.next();
    if (!done)
        process.stdout.write(value);
    else
        clearInterval(loop);
}, 1);
//# sourceMappingURL=test.js.map