"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const common_module_1 = require("../common/common.module");
const product_entity_1 = require("../product/models/product.entity");
const product_module_1 = require("../product/product.module");
const product_service_1 = require("../product/product.service");
const user_preferences_entity_1 = require("./models/user-preferences.entity");
const user_entity_1 = require("./models/user.entity");
const user_preferences_service_1 = require("./user-preferences.service");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_preferences_entity_1.UserPreference, product_entity_1.Product]),
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            product_module_1.ProductModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_preferences_service_1.UserPreferencesService, product_service_1.ProductService],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map