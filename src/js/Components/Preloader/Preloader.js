class Preloader{
    constructor(){
        this.canvas = document.getElementById("atom");
        this.ctx = this.canvas.getContext('2d');
        this.radius = 30;
        this.baseX = 120;
        this.baseY = 120;
        this.currentAngle = 0;
        this.setIntervalAnimation = setInterval(() => {
            this.allAnimationAtom();
        }, 12);
    }
    allAnimationAtom(){
        this.clearSetInterval();
        this.ctx.save();
        this.ctx.clearRect(0, 0, 400, 400 );
        this.drawAtom();
        this.drawOrbit();
        this.drawElectrons();
        this.currentAngle += 0.02;
    }
    drawAtom(){
        this.ctx.beginPath();
        this.ctx.restore();
        this.ctx.arc(this.baseX, this.baseY, 7, 0, 360 );
        this.ctx.fillStyle = '#ff2e2e';
        this.ctx.closePath();
        this.ctx.fill();
    }
    drawOrbit(){
        this.ctx.drawEllipse(this.baseX, this.baseY,115,this.radius);
        this.ctx.drawEllipse(this.baseX, this.baseY,115,this.radius, this.inRad(45));
        this.ctx.drawEllipse(this.baseX, this.baseY,115,this.radius, this.inRad(135));
        this.ctx.drawEllipse(this.baseX, this.baseY,115,this.radius, this.inRad(90));
    }
    drawElectrons(){
        const data = [
            {degree: 315, x: this.calcCoordX(0), y: this.calcCoordY(0)},
            {degree: 180, x: this.calcCoordX(2), y: this.calcCoordY(2)},
            {degree: 180, x: this.calcCoordX(0.7), y: this.calcCoordY(0.7)},
            {degree: 180, x: this.calcCoordX(4), y: this.calcCoordY(4)},
            {degree: 90, x: this.calcCoordX(0), y: this.calcCoordY(0)},
            {degree: 90, x: this.calcCoordX(4), y: this.calcCoordY(4)},
            {degree: 45, x: this.calcCoordX(3), y: this.calcCoordY(3)},
            {degree: 45, x: this.calcCoordX(2), y: this.calcCoordY(2)},
            {degree: 45, x: this.calcCoordX(0.3), y: this.calcCoordY(0.3)},
        ];
        data.forEach(({degree, x, y}) => this.drawOneElectron(degree, x, y) )
    }
    calcCoordX(bias = 0){
        return Math.cos(this.currentAngle + bias) *  this.radius;
    }
    calcCoordY(bias = 0){
        return Math.sin(this.currentAngle + bias) * 3.85 * this.radius;
    }
    drawOneElectron(degree, vx, vy){
        this.ctx.electron(this.baseX, this.baseY, 3, 3, this.inRad(degree), vx, vy);
    }
    clearSetInterval(){
        if(document.querySelector('.preloader').style.display === 'none') {
            clearInterval(this.setIntervalAnimation);
        }
    }
    inRad(num) {
        return num * Math.PI / 180;
    }
}

new Preloader();


CanvasRenderingContext2D.prototype.drawEllipse = function(x, y, a, b, rotate) {
    this.save();
    this.beginPath();
    this.translate(x, y);
    this.rotate(rotate);
    this.scale(a / b, 1);
    this.arc(0, 0, b, 0, Math.PI * 2, true);
    this.restore();
    this.closePath();
    this.stroke();
};
CanvasRenderingContext2D.prototype.electron = function(x, y, a, b, rotate, vx, vy) {
    const x_el = vx + x;
    const y_el = vy + y;
    this.save();
    this.beginPath();
    this.translate(x, y);
    this.rotate(rotate);
    this.translate(-x, -y);
    this.scale(a / b, 1);
    this.arc(x_el, y_el, b, 0, Math.PI * 2, true);
    this.restore();
    this.closePath();
    this.fillStyle = '#fffd2e';
    this.save();
    this.fill();
};