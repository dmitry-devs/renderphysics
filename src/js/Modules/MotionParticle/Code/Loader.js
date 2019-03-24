import { LoaderBase } from '../../../Core/LoaderBase';
import { Particles } from './Particles';
import { Data } from './CollectData';

export class Loader extends LoaderBase {
    constructor() {
        super();
        this.collectData = new Data();
        this.particles = new Particles(this.scene);
        this.render();
    }
    init(data) {
        this.stop();
        const collect = this.collectData.collect(data);
        this.particles.init(collect);
        this.loop();
    }
    update() {
        this.particles.update();
    }
}
