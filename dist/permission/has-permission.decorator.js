"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasPemission = void 0;
const common_1 = require("@nestjs/common");
const HasPemission = (access) => (0, common_1.SetMetadata)('access', access);
exports.HasPemission = HasPemission;
//# sourceMappingURL=has-permission.decorator.js.map