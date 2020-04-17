export class TouchSwipe {
    constructor(element, swipeLenght) {
        this.status = false;
        this.xDown = 0;
        this.yDown = 0;
        this.element = element;
        if (swipeLenght != undefined)
            this.swipeLenght = swipeLenght;
        else
            this.swipeLenght = 10;
        if (this.element != undefined) {
            this.element.addEventListener('touchstart', (evt) => {
                this.xDown = evt.touches[0].clientX;
                this.yDown = evt.touches[0].clientY;
            });
        }
        else {
            alert('Error: element is undefined!');
        }
    }
    onLeft(callback) {
        if (callback != undefined)
            this.onLeft = callback;
    }
    onRight(callback) {
        if (callback != undefined)
            this.onRight = callback;
    }
    onUp(callback) {
        if (callback != undefined)
            this.onUp = callback;
    }
    onDown(callback) {
        if (callback != undefined)
            this.onDown = callback;
    }
    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }
        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;
        const xDiff = this.xDown - xUp;
        const yDiff = this.yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > (0 + this.swipeLenght)) {
                this.onLeft();
            }
            else if (xDiff < (0 - this.swipeLenght)) {
                this.onRight();
            }
        }
        else {
            if (yDiff > (0 + this.swipeLenght)) {
                this.onUp();
            }
            else if (yDiff < (0 - this.swipeLenght)) {
                this.onDown();
            }
        }
        this.xDown = 0;
        this.yDown = 0;
    }
    start() {
        if (!this.status) {
            this.status = true;
            this.element.addEventListener('touchmove', (evt) => {
                this.handleTouchMove(evt);
            });
        }
    }
    stop() {
        if (this.status) {
            this.status = false;
            this.element.addRemoveListener('touchmove', (evt) => {
                this.handleTouchMove(evt);
            });
        }
    }
}
//# sourceMappingURL=touchswipe.js.map