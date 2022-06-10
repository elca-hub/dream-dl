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
var songApplication_exports = {};
__export(songApplication_exports, {
  default: () => SongApplication
});
module.exports = __toCommonJS(songApplication_exports);
var import_songInfoData = __toESM(require("./dto/songInfoData"));
var import_songModel = __toESM(require("../domain/model/songModel"));
var import_mp3tag = require("../infrastucture/mp3tag");
class SongApplication {
  constructor(songRepository) {
    this.songRepository = songRepository;
  }
  getSongInfo(id) {
    return __async(this, null, function* () {
      const songInfo = yield this.songRepository.getSongInfo(id);
      const songInfoData = new import_songInfoData.default(id, songInfo.title, songInfo.artist, songInfo.imgUrl);
      return songInfoData;
    });
  }
  downloadSong(id, volume, title, artist) {
    return __async(this, null, function* () {
      const songPath = yield this.songRepository.downloadSong(id, volume);
      const songModel = new import_songModel.default(id, title, artist, "");
      (0, import_mp3tag.attachMp3Tag)(songPath, songModel);
      return songPath;
    });
  }
  saveId(id) {
    this.songRepository.Id = id;
  }
  getID() {
    return this.songRepository.Id;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
