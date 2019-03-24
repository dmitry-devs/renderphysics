import * as THREE from 'three';
import { Calc } from '../../../Core/Calc';

export class Particle {
    constructor(data, scene) {
        this.scene = scene;
        this.data = data;
        this.axis = ['x', 'y', 'z'];
    }
    createParticles(i) {
        const geometry = new THREE.SphereBufferGeometry(this.data.props[i].size, 16, 16);
        const material = new THREE.MeshBasicMaterial();
        this.data.mesh[i] = new THREE.Mesh(geometry, material);
        this.scene.add(this.data.mesh[i]);
        this.motionParticle(i);
    }
    motionParticle(i) {
        const data = {
            i,
            radius: Math.abs(Calc.inRad(this.data.props[i].radius)),
            angle: this.data.props[i].angle,
            charge: this.data.props[i].charge ? 1 : -1,
        };
        this.axis.forEach(el =>
            this.calculationMotion({ ...data, axis: el, horizontal: el !== 'y' }),
        );
    }
    calculationMotion({ i, radius, angle, charge, horizontal, axis }) {
        const square = this.getSquare(this.data.props[i], axis, horizontal);
        const ordinate = this.getOrdinate(angle[axis], radius * charge, horizontal);
        this.data.mesh[i].position[axis] += square * ordinate * charge;
        angle[axis] += radius * charge;
    }
    getSquare(props, axis, horizontal) {
        const divider = horizontal ? props.position[axis] / Math.abs(props.radius) : 1;
        return divider * Calc.inRad(props.radius ** 2);
    }
    getOrdinate(angle, radius, horizontal) {
        const angleOrdinate = angle + radius / 2;
        return horizontal ? Math.sin(angleOrdinate) : Math.cos(angleOrdinate);
    }
}
