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
var songRepository_exports = {};
__export(songRepository_exports, {
  default: () => SongRepository
});
module.exports = __toCommonJS(songRepository_exports);
var import_ytdl_core = __toESM(require("ytdl-core"));
var import_fluent_ffmpeg = __toESM(require("fluent-ffmpeg"));
var import_path = __toESM(require("path"));
class SongRepository {
  getSongInfo(id) {
    return __async(this, null, function* () {
      const data = yield import_ytdl_core.default.getInfo(id);
      const thumbnails = data.videoDetails.thumbnails;
      console.log(thumbnails);
      if (!isNaN(data.videoDetails.lengthSeconds)) {
        const length = Number(data.videoDetails.lengthSeconds);
        if (length > 60 * 10)
          throw new Error("song length is over 10 minutes");
      }
      const songInfo = {
        title: data.videoDetails.title,
        artist: data.videoDetails.author.name,
        imgUrl: thumbnails[thumbnails.length - 1].url
      };
      return songInfo;
    });
  }
  downloadSong(id) {
    return __async(this, null, function* () {
      const fileName = `${id}.mp3`;
      const filePath = import_path.default.join(__dirname, "../../../downloads", fileName);
      const stream = (0, import_ytdl_core.default)(`https://www.youtube.com/watch?v=${id}`, {
        filter: "audioonly",
        quality: "highestaudio"
      });
      const proc = (0, import_fluent_ffmpeg.default)(stream);
      return new Promise((resolve, reject) => {
        proc.on("error", (err) => {
          reject(err);
        }).on("end", () => {
          resolve(filePath);
        }).save(filePath);
      });
    });
  }
  set Id(id) {
    this.id = id;
  }
  get Id() {
    return this.id === void 0 ? "" : this.id;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
