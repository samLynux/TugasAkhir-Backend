"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreference = exports.Gender = void 0;
const brand_entity_1 = require("../../common/models/brand.entity");
const color_entity_1 = require("../../common/models/color.entity");
const size_entity_1 = require("../../common/models/size.entity");
const product_entity_1 = require("../../product/models/product.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var Gender;
(function (Gender) {
    Gender["m"] = "m";
    Gender["f"] = "f";
    Gender["n"] = "n";
})(Gender = exports.Gender || (exports.Gender = {}));
let UserPreference = class UserPreference {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserPreference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => size_entity_1.Size),
    (0, typeorm_1.JoinColumn)({ name: 'size_id' }),
    __metadata("design:type", size_entity_1.Size)
], UserPreference.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => brand_entity_1.Brand),
    (0, typeorm_1.JoinTable)({
        name: "userprefs_brand",
        joinColumn: {
            name: "userprefs_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "brand_id",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], UserPreference.prototype, "brands", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => color_entity_1.Color),
    (0, typeorm_1.JoinTable)({
        name: "userprefs_color",
        joinColumn: {
            name: "userprefs_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "color_id",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], UserPreference.prototype, "colors", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Gender,
        default: Gender.n
    }),
    __metadata("design:type", String)
], UserPreference.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserPreference.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.Product),
    (0, typeorm_1.JoinTable)({
        name: 'user_favourites',
        joinColumn: { name: "user_pref_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "product_id", referencedColumnName: "id" }
    }),
    __metadata("design:type", Array)
], UserPreference.prototype, "favourites", void 0);
UserPreference = __decorate([
    (0, typeorm_1.Entity)("user-preferences")
], UserPreference);
exports.UserPreference = UserPreference;
//# sourceMappingURL=user-preferences.entity.js.map