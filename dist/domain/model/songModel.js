var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var songModel_exports = {};
__export(songModel_exports, {
  default: () => SongModel
});
module.exports = __toCommonJS(songModel_exports);
class SongModel {
  constructor(id, title, artist, imgUrl) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.imgUrl = imgUrl;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
