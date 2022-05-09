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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_guard_1 = require("../auth/auth.guard");
const user_update_dto_1 = require("../auth/models/user-update.dto");
const auth_service_1 = require("../auth/auth.service");
const user_preferences_service_1 = require("./user-preferences.service");
const user_preferences_entity_1 = require("./models/user-preferences.entity");
let UserController = class UserController {
    constructor(userService, userPrefService, authService) {
        this.userService = userService;
        this.userPrefService = userPrefService;
        this.authService = authService;
    }
    async userGet(request) {
        const id = await this.authService.userId(request);
        return this.userService.findOne(id);
    }
    async getPrefs(request) {
        const id = await this.authService.userId(request);
        return this.userPrefService.findOne({ user: id }, ["user", "brands", "colors", "size"]);
    }
    async getFavs(request) {
        const id = await this.authService.userId(request);
        const favourites = await this.userPrefService.findOne({ user: id }, ["favourites",
            "favourites.category",
            "favourites.brand",
            "favourites.sizes",
            "favourites.primaryColor",
            "favourites.secondaryColor"]);
        return favourites.favourites;
    }
    async checkFavs(request, product_id) {
        const id = await this.authService.userId(request);
        return this.userPrefService.checkFav(id, product_id);
    }
    async updateInfo(request, { brands, size, colors, gender }) {
        const id = await this.authService.userId(request);
        const userPref = await this.userPrefService.findOne({ user: id }, ["user", "brands", "colors", "size"]);
        const newPrefs = Object.assign(Object.assign({}, userPref), { colors: colors ? (await this.userPrefService.findColors(colors)) : [], size: size ? await this.userPrefService.findSize(size) : null, brands: brands ? await this.userPrefService.findBrands(brands) : [], gender: gender ? gender : user_preferences_entity_1.Gender.n, user: id });
        await this.userPrefService.create(newPrefs);
        return this.userPrefService.findOne({ user: id }, ["user", "brands", "colors", "size"]);
    }
    async update(body, request) {
        const id = await this.authService.userId(request);
        const data = __rest(body, []);
        await this.userService.update(id, Object.assign({}, data));
        return this.userService.findOne(id);
    }
    async addFav(product_id, request) {
        const id = await this.authService.userId(request);
        const favCheck = await this.userPrefService.checkFav(id, product_id);
        if (!favCheck) {
            return this.userPrefService.addFav(id, product_id);
        }
        return this.userPrefService.removeFav(id, product_id);
    }
    async forUser(request) {
        const id = await this.authService.userId(request);
        return this.userPrefService.forUser(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userGet", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPrefs", null);
__decorate([
    (0, common_1.Get)('fav'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFavs", null);
__decorate([
    (0, common_1.Get)('favCheck'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkFavs", null);
__decorate([
    (0, common_1.Post)('updatepref'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateInfo", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_dto_1.UserUpdateDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('favourited'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addFav", null);
__decorate([
    (0, common_1.Get)('foruser'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forUser", null);
UserController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_preferences_service_1.UserPreferencesService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map