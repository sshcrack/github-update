"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const promises_1 = __importDefault(require("fs/promises"));
const auth_token_1 = require("@octokit/auth-token");
const rest_1 = require("@octokit/rest");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const execa_1 = __importDefault(require("execa"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const secret = process.env.SECRET;
const app = express_1.default();
const auth = auth_token_1.createTokenAuth(process.env.TOKEN);
auth().then(authentication => {
    var _a;
    const octokit = new rest_1.Octokit({
        auth: authentication.token
    });
    app.use(body_parser_1.default.json());
    app.post("/update", async (req, res) => {
        const body = req.body;
        const signature = req.header("X-Hub-Signature-256");
        if (!signature)
            return res.send({ error: "No Signature" });
        const valid = checkSignature(JSON.stringify(body), signature === null || signature === void 0 ? void 0 : signature.substr("sha256=".length));
        if (!valid)
            return res.send({ error: "Invalid signature" });
        const asset = (await octokit.repos.getRelease({
            owner: "sshcrack",
            repo: "typescript-sshbot",
            release_id: body.release.id
        })).data;
        await promises_1.default.writeFile("asset.json", JSON.stringify(asset));
        await promises_1.default.writeFile("repository.json", JSON.stringify(body));
        execa_1.default("bash", ["-c", "./update.sh"]).then(e => {
            console.log("Process finished", e);
        });
        return res.send("hello github");
    });
    app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8001, () => { var _a; return console.log("Listening on port", (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8001); });
});
function checkSignature(body, signature) {
    return crypto_1.default.createHmac('sha256', secret).update(body).digest("hex") === signature;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBMkI7QUFDM0IsMkRBQTZCO0FBRTdCLG9EQUFzRDtBQUN0RCx3Q0FBd0M7QUFDeEMsOERBQXFDO0FBQ3JDLG9EQUE0QjtBQUM1QixrREFBMEI7QUFDMUIsc0RBQThCO0FBSzlCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDZixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNsQyxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUE7QUFDckIsTUFBTSxJQUFJLEdBQUcsNEJBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQy9DLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTs7SUFDM0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUM7UUFDMUIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxLQUFLO0tBQzNCLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDckMsTUFBTSxJQUFJLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUM5QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTtRQUMxRCxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUN2RixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7UUFFM0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQzVDLEtBQUssRUFBRSxVQUFVO1lBQ2pCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtTQUM1QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFFUixNQUFNLGtCQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDdkQsTUFBTSxrQkFBRSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFFM0QsZUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLE1BQU0sT0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksbUNBQUksSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFDLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsUUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksbUNBQUksSUFBSSxDQUFDLENBQUEsRUFBQSxDQUFDLENBQUE7QUFDeEcsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGNBQWMsQ0FBQyxJQUFZLEVBQUUsU0FBaUI7SUFDckQsT0FBTyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLENBQUE7QUFDckYsQ0FBQyJ9