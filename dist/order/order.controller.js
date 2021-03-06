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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const order_service_1 = require("./order.service");
const order_items_service_1 = require("./order-items.service");
const auth_service_1 = require("../auth/auth.service");
const order_create_dto_1 = require("./models/order.create.dto");
let OrderController = class OrderController {
    constructor(orderService, orderItemsService, authService) {
        this.orderService = orderService;
        this.orderItemsService = orderItemsService;
        this.authService = authService;
    }
    async chart(request) {
        const id = await this.authService.userId(request);
        return this.orderService.chart(id);
    }
    async all(request) {
        const id = await this.authService.userId(request);
        return this.orderService.all(null, {
            user: { id: id },
        }, { id: "DESC" });
    }
    async transactionDetails(id) {
        return this.orderService.findOne({
            id,
        }, ['order_items', "order_items.product"]);
    }
    async create(body, request) {
        const id = await this.authService.userId(request);
        const items = await this.orderItemsService.create(body.order_items.map((i) => ({
            product_title: i.product_title,
            price: i.price,
            quantity: i.quantity,
            product: i.product_id
        })));
        return this.orderService.create({
            user: id,
            order_items: items,
            total: body.total
        });
    }
};
__decorate([
    (0, common_1.Get)('chart'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "chart", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "all", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "transactionDetails", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_create_dto_1.OrderCreateDTO, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
OrderController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        order_items_service_1.OrderItemsService,
        auth_service_1.AuthService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map