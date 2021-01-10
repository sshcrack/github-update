"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = express_1.default();
app.use(body_parser_1.default.json());
app.post("/update", (req, res) => {
    console.log(req.body);
    res.send("hello github");
});
app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 7001, () => { var _a; return console.log("Listening on port", (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 7001); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOERBQW9DO0FBQ3BDLG9EQUEyQjtBQUMzQixzREFBNkI7QUFDN0IsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVmLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQTtBQUVyQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLE1BQU0sT0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksbUNBQUksSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFDLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsUUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksbUNBQUksSUFBSSxDQUFDLENBQUEsRUFBQSxDQUFDLENBQUEifQ==