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
exports.Entidad = void 0;
const typeorm_1 = require("typeorm");
const empresa_1 = require("./empresa");
let Entidad = class Entidad {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id_interno' }),
    __metadata("design:type", Number)
], Entidad.prototype, "codigo", void 0);
__decorate([
    typeorm_1.Column({ name: 'id' }),
    __metadata("design:type", Number)
], Entidad.prototype, "codigo_dolphin", void 0);
__decorate([
    typeorm_1.Column({ name: 'telefono' }),
    __metadata("design:type", String)
], Entidad.prototype, "telefono", void 0);
__decorate([
    typeorm_1.ManyToOne(type => empresa_1.Empresa, { eager: true }),
    typeorm_1.JoinColumn({ name: 'empresa_id' }),
    __metadata("design:type", empresa_1.Empresa)
], Entidad.prototype, "empresa", void 0);
__decorate([
    typeorm_1.Column({ name: 'nombre' }),
    __metadata("design:type", String)
], Entidad.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({ name: 'accountsid', nullable: true }),
    __metadata("design:type", String)
], Entidad.prototype, "accountId", void 0);
__decorate([
    typeorm_1.Column({ name: 'padrao' }),
    __metadata("design:type", Boolean)
], Entidad.prototype, "padron", void 0);
Entidad = __decorate([
    typeorm_1.Entity({ name: 'entidad' })
], Entidad);
exports.Entidad = Entidad;
