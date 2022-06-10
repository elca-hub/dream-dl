var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var router_exports = {};
__export(router_exports, {
  default: () => router_default
});
module.exports = __toCommonJS(router_exports);
var import_express = require("express");
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_songApplication = __toESM(require("../application/songApplication"));
var import_songRepository = __toESM(require("../interface/repository/songRepository"));
const songApplication = new import_songApplication.default(new import_songRepository.default());
const router = (0, import_express.Router)();
const initId = (req, res, next) => {
  const id = songApplication.getID();
  if (id) {
    const fileName = `${id}.mp3`;
    const filePath = import_path.default.join(__dirname, "../../downloads", fileName);
    if (import_fs.default.existsSync(filePath)) {
      import_fs.default.unlinkSync(filePath);
      songApplication.saveId("");
    }
  }
  next();
};
let origin;
const setOrigin = (req, res, next) => {
  origin = `${req.protocol}://${req.headers.host}`;
  next();
};
router.use("/", initId);
router.use("/", setOrigin);
router.get("/", (req, res) => {
  res.render("pages/index", { origin });
});
router.get("/preview", (req, res) => __async(void 0, null, function* () {
  const url = req.query.url;
  if (url === void 0) {
    res.status(400).send("youtube\u306Eid\u304C\u6307\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093");
    return;
  }
  const ytid = url.split("v=")[1];
  try {
    const songData = yield songApplication.getSongInfo(ytid);
    songApplication.saveId(songData.Id);
    res.render("pages/preview", { songData, origin });
  } catch (e) {
    const err = e;
    console.log(err);
    res.render("pages/error", { err, origin });
  }
}));
router.post("/download", (req, res) => __async(void 0, null, function* () {
  const id = songApplication.getID();
  if (id === "")
    return res.redirect("/");
  const volumeRange = req.body.volume;
  let volume = 1;
  if (isNaN(volumeRange))
    return res.redirect("/");
  else
    volume = Number(volumeRange);
  const sd = yield songApplication.getSongInfo(id);
  const dlPath = yield songApplication.downloadSong(id, volume);
  return res.download(dlPath, `${sd.Title}.mp3`);
}));
var router_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
