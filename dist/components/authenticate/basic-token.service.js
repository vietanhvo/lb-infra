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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var BasicTokenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicTokenService = void 0;
const base_service_1 = require("../../base/base.service");
const common_1 = require("../../common");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
let BasicTokenService = BasicTokenService_1 = class BasicTokenService extends base_service_1.BaseService {
    constructor(getUserIdFn) {
        super({ scope: BasicTokenService_1.name });
        this.getUserIdFn = getUserIdFn;
    }
    verify(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!credential) {
                this.logger.error('verify', 'Missing basic credential for validating request!');
                throw new rest_1.HttpErrors.Unauthorized('Invalid basic request credential!');
            }
            try {
                const { username, password } = credential;
                const basicCredential = {
                    identifier: { scheme: 'username', value: username },
                    credential: { scheme: 'basic', value: password },
                };
                const userProfile = yield this.getUserIdFn(basicCredential);
                return Object.assign(Object.assign({}, userProfile), { [security_1.securityId]: `${userProfile.userId}` });
            }
            catch (error) {
                throw new rest_1.HttpErrors.Unauthorized(`Error verifying token : ${error.message}`);
            }
        });
    }
};
exports.BasicTokenService = BasicTokenService;
exports.BasicTokenService = BasicTokenService = BasicTokenService_1 = __decorate([
    __param(0, (0, core_1.inject)(common_1.AuthenticateKeys.BASIC_USER_PROFILE_FN)),
    __metadata("design:paramtypes", [Function])
], BasicTokenService);
//# sourceMappingURL=basic-token.service.js.map