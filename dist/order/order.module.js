"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
const common_module_1 = require("../common/common.module");
const product_entity_1 = require("../product/models/product.entity");
const product_service_1 = require("../product/product.service");
const user_entity_1 = require("../user/models/user.entity");
const order_item_entity_1 = require("./models/order-item.entity");
const order_items_service_1 = require("./order-items.service");
const order_controller_1 = require("./order.controller");
const order_entity_1 = require("./models/order.entity");
const order_service_1 = require("./order.service");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, order_item_entity_1.OrderItem, user_entity_1.User, product_entity_1.Product]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, order_items_service_1.OrderItemsService, auth_service_1.AuthService, product_service_1.ProductService]
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map