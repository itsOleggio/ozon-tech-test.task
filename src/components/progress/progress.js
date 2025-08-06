export class ProgressComponent {
    constructor(root) {
        this.root = root;
    }

    static async create({ root }) {
        if (!root) {
            throw new Error("Root element is required");
        }

        const instance = new ProgressComponent(root);
        await instance._render();
        return instance;
    }

    async _render() {
        const path = new URL('./progress.html', import.meta.url);
        const html = await fetch(path).then(response => response.text());


        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('progress');
        this.wrapper.innerHTML = html;
        this.root.appendChild(this.wrapper);

        this.input = this.wrapper.querySelector(".input");
        this.progressCircle = this.wrapper.querySelector(".status_bar__item");
        this.animateSwitch = this.wrapper.querySelector("#animate");
        this.hideSwitch = this.wrapper.querySelector("#hide");

        this._initListeners();
    }

    _initListeners() {
        if (this.input && this.progressCircle) {
            this.input.addEventListener("input", () => {
                this._updateProgressFromInput();
            });
        }

        if (this.animateSwitch && this.progressCircle) {
            this.animateSwitch.addEventListener("change", () => {
                this.progressCircle.classList.toggle("animate", this.animateSwitch.checked);
            });
        }

        if (this.hideSwitch && this.progressCircle) {
            this.hideSwitch.addEventListener("change", () => {
                this.progressCircle.classList.toggle("hide", this.hideSwitch.checked);
            });
        }
    }

    _updateProgressFromInput() {
        let value = parseInt(this.input.value, 10);

        if (isNaN(value)) value = 0;
        if (value < 0) {
            value = 0;
            alert('Value must be greater than 0');
        }
        if (value > 100) {
            value = 100;
            alert('Value must be less than 100');
        }

        const angle = (value / 100) * 360;
        this.progressCircle.style.background = `conic-gradient(#005BFF ${angle}deg, #EFF3F6 0deg)`;
    }

    setValue(value) {
        if (!this.input) return;
        this.input.value = value;
        this.input.dispatchEvent(new Event('input'));
    }

    setAnimated(isAnimated) {
        if (!this.animateSwitch) return;
        this.animateSwitch.checked = isAnimated;
        this.animateSwitch.dispatchEvent(new Event('change'));
    }

    setHidden(isHidden) {
        if (!this.hideSwitch) return;
        this.hideSwitch.checked = isHidden;
        this.hideSwitch.dispatchEvent(new Event('change'));
    }

    setMenuVisible(isVisible) {
        const inputArea = this.wrapper.querySelector('.input_area');
        if (!inputArea) return;
        inputArea.classList.toggle('visible', isVisible);
    }
}
