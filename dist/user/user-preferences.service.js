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
const product_service_1 = require("../product/product.service");
const typeorm_2 = require("typeorm");
const user_preferences_entity_1 = require("./models/user-preferences.entity");
let UserPreferencesService = class UserPreferencesService extends abstract_service_1.AbstractService {
    constructor(productService, userPrefRepository) {
        super(userPrefRepository);
        this.productService = productService;
        this.userPrefRepository = userPrefRepository;
    }
    async findIdByUserId(id) {
        const data = this.findOne({ user: id });
        return data.id;
    }
    async addFav(id, ids) {
        const prefs = await this.findOne({ user: id }, ["favourites"]);
        const product = await this.productService.findOne({ id: 1 });
        let favourites = prefs.favourites;
        console.log(favourites);
        favourites.push(product);
        let newPrefs = new user_preferences_entity_1.UserPreference();
        newPrefs = Object.assign(Object.assign({}, prefs), { favourites: favourites });
        await this.userPrefRepository.save(newPrefs);
        return this.findOne({ user: id }, ["user", "favourites"]);
    }
};
UserPreferencesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_preferences_entity_1.UserPreference)),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        typeorm_2.Repository])
], UserPreferencesService);
exports.UserPreferencesService = UserPreferencesService;
//# sourceMappingURL=user-preferences.service.js.map