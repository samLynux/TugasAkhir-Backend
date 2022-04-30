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
exports.UserPreferencesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const abstract_service_1 = require("../common/abstract.service");
const brand_entity_1 = require("../common/models/brand.entity");
const category_entity_1 = require("../common/models/category.entity");
const color_entity_1 = require("../common/models/color.entity");
const size_entity_1 = require("../common/models/size.entity");
const product_service_1 = require("../product/product.service");
const typeorm_2 = require("typeorm");
const user_preferences_entity_1 = require("./models/user-preferences.entity");
let UserPreferencesService = class UserPreferencesService extends abstract_service_1.AbstractService {
    constructor(productService, userPrefRepository, categoryRepository, brandRepository, colorRepository, sizeRepository) {
        super(userPrefRepository);
        this.productService = productService;
        this.userPrefRepository = userPrefRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
    }
    async findColors(name) {
        const data = await this.colorRepository.find();
        return data.filter(d => name.includes(d.value));
    }
    async findCategories(name) {
        const data = await this.categoryRepository.find();
        return data.filter(d => name.includes(d.value));
    }
    async findBrands(name) {
        const data = await this.brandRepository.find();
        return data.filter(d => name.includes(d.value));
    }
    async findSize(name) {
        return this.sizeRepository.findOne({ value: name });
    }
    async addFav(id, product_id) {
        const prefs = await this.findOne({ user: id }, ["favourites"]);
        const product = await this.productService.findOne({ id: product_id });
        let favourites = prefs.favourites;
        favourites.push(product);
        let newPrefs = new user_preferences_entity_1.UserPreference();
        newPrefs = Object.assign(Object.assign({}, prefs), { favourites: favourites });
        await this.userPrefRepository.save(newPrefs);
        return this.findOne({ user: id }, ["user", "favourites"]);
    }
    async removeFav(id, product_id) {
        const prefs = await this.findOne({ user: id }, ["favourites"]);
        const product = await this.productService.findOne({ id: product_id });
        let favourites = prefs.favourites;
        let newPrefs = new user_preferences_entity_1.UserPreference();
        newPrefs = Object.assign(Object.assign({}, prefs), { favourites: favourites.filter((fav) => fav.id !== product.id) });
        await this.userPrefRepository.save(newPrefs);
        return this.findOne({ user: id }, ["user", "favourites"]);
    }
    async forUser(id) {
        const pref = await this.findOne({ user: id }, ["brands", "colors", "size"]);
        const data = await this.productService.all(["category", "brand", "sizes", "primaryColor", "secondaryColor"], null, { popularity: "DESC", createdAt: "DESC" });
        if (pref.brands.length <= 0 &&
            pref.colors.length <= 0 &&
            !pref.size &&
            pref.gender === user_preferences_entity_1.Gender.n) {
            return null;
        }
        const results = data.filter((d) => (pref.brands.length > 0 ? !!pref.brands.find(s => s.id === d.brand.id) : true) &&
            (pref.colors.length > 0 ? !!pref.colors.find(s => s.id === d.primaryColor.id || s.id === d.secondaryColor.id) : true) &&
            (pref.size ? !!d.sizes.find(s => s.value === pref.size.value) : true) &&
            (pref.gender !== user_preferences_entity_1.Gender.n ? d.gender === pref.gender : true));
        return results.slice(0, 16);
    }
};
UserPreferencesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_preferences_entity_1.UserPreference)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(3, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __param(4, (0, typeorm_1.InjectRepository)(color_entity_1.Color)),
    __param(5, (0, typeorm_1.InjectRepository)(size_entity_1.Size)),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserPreferencesService);
exports.UserPreferencesService = UserPreferencesService;
//# sourceMappingURL=user-preferences.service.js.map