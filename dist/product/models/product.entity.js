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
exports.Product = exports.Gender = void 0;
const brand_entity_1 = require("../../common/models/brand.entity");
const category_entity_1 = require("../../common/models/category.entity");
const color_entity_1 = require("../../common/models/color.entity");
const size_entity_1 = require("../../common/models/size.entity");
const typeorm_1 = require("typeorm");
var Gender;
(function (Gender) {
    Gender["m"] = "m";
    Gender["f"] = "f";
    Gender["n"] = "n";
})(Gender = exports.Gender || (exports.Gender = {}));
let Product = class Product {
    constructor() {
        this.popularity = 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "popularity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Gender,
        default: Gender.n
    }),
    __metadata("design:type", String)
], Product.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => color_entity_1.Color),
    (0, typeorm_1.JoinColumn)({ name: 'primary_color_id' }),
    __metadata("design:type", color_entity_1.Color)
], Product.prototype, "primaryColor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => color_entity_1.Color),
    (0, typeorm_1.JoinColumn)({ name: 'secondary_color_id' }),
    __metadata("design:type", color_entity_1.Color)
], Product.prototype, "secondaryColor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand),
    (0, typeorm_1.JoinColumn)({ name: 'brand_id' }),
    __metadata("design:type", brand_entity_1.Brand)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => size_entity_1.Size),
    (0, typeorm_1.JoinTable)({
        name: "product_sizes",
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "size_id",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Product.prototype, "sizes", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map