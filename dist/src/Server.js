"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
(0, App_1.default)().then((app) => {
    app.listen(process.env.PORT, () => {
        console.log("Example app listening at http://localhost:" + process.env.PORT);
    });
});
//# sourceMappingURL=Server.js.map