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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_create_dto_1 = require("./models/product-create.dto");
const product_update_dto_1 = require("./models/product-update.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async all(page = 1) {
        return this.productService.paginate(page, ["category", "brand", "sizes", "primaryColor", "secondaryColor"], null, { popularity: "DESC", createdAt: "DESC" });
    }
    async filtered({ categories, brands, size, colors, gender }) {
        const data = await this.productService.all(["category", "brand", "sizes", "primaryColor", "secondaryColor"], null, { popularity: "DESC", createdAt: "DESC" });
        const results = data.filter((d) => (categories ? categories.includes(d.category.value) : true) &&
            (brands ? brands.includes(d.brand.value) : true) &&
            (colors ? colors.includes(d.primaryColor.value || d.secondaryColor.value) : true) &&
            (size ? !!d.sizes.find(s => s.value === size) : true) &&
            (gender ? d.gender === gender : true));
        return {
            data: results.slice(0, 16)
        };
    }
    async create(body, ids = [1, 2, 3]) {
        return this.productService.create(Object.assign(Object.assign({}, body), { sizes: ids.map(id => ({ id })) }));
    }
    async get(id) {
        return this.productService.findOne({ id }, ["category", "brand", "sizes", "primaryColor", "secondaryColor"]);
    }
    async update(id, body, ids = [1, 2, 3]) {
        if (body !== undefined)
            await this.productService.update(id, body);
        const newProduct = await this.productService.findOne(id);
        return this.productService.create(Object.assign(Object.assign({}, newProduct), { sizes: ids.map(id => ({ id })) }));
    }
    async delete(id) {
        return this.productService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "all", null);
__decorate([
    (0, common_1.Post)("filtered"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "filtered", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)("body")),
    __param(1, (0, common_1.Body)("sizes")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_create_dto_1.ProductCreateDTO, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)("body")),
    __param(2, (0, common_1.Body)("sizes")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_update_dto_1.ProductUpdateDTO, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map