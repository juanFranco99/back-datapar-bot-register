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
exports.UsuarioDolphin = void 0;
const typeorm_1 = require("typeorm");
let UsuarioDolphin = class UsuarioDolphin {
};
__decorate([
    typeorm_1.PrimaryColumn({ name: 'NCODIUSUA' }),
    __metadata("design:type", Number)
], UsuarioDolphin.prototype, "codigo", void 0);
__decorate([
    typeorm_1.Column({ name: 'CNOMEUSUA' }),
    __metadata("design:type", String)
], UsuarioDolphin.prototype, "nombreUsuario", void 0);
UsuarioDolphin = __decorate([
    typeorm_1.Entity({ name: 'CFGUSUA' })
], UsuarioDolphin);
exports.UsuarioDolphin = UsuarioDolphin;
