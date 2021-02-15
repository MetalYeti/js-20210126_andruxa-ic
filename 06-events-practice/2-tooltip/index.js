class Tooltip {
  constructor() {
    if (Tooltip.instance) {return Tooltip.instance;}
    Tooltip.instance = this;
    this.bindShow = this.show.bind(this);
    this.bindHide = this.hide.bind(this);
    this.bindMove = this.moveTooltip.bind(this);    
  }

  initialize() {
    this.render();

    document.addEventListener('pointerover', this.bindShow);    
    document.addEventListener('pointerout', this.bindHide);
    document.addEventListener('mousemove', this.bindMove);
  }

  render() {
    const div = document.createElement('div');

    div.innerHTML = `<div class="tooltip">This is tooltip</div>`;

    this.element = div.firstElementChild;
    document.body.append(this.element);
  }

  show(event) {
    if (!event.target.hasAttribute('data-tooltip')) {return;}
    document.body.append(this.element);
    this.element.hidden = false;
    this.updateText(event.target.dataset.tooltip);
  }

  moveTooltip(event) {
    this.element.style.position = 'absolute';
    this.element.style.left = event.clientX + 5 + 'px';
    this.element.style.top = event.clientY + 5 + 'px';
  }

  hide(event) {
    if (!event.target.hasAttribute('data-tooltip')) {return;}
    this.element.remove(); 
    this.element.hidden = true;
  }

  updateText(text) {
    this.element.textContent = text;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    Tooltip.instance = null;
    this.remove();
    document.removeEventListener('pointerover', this.bindShow);    
    document.removeEventListener('pointerout', this.bindHide);
    document.removeEventListener('mousemove', this.bindMove);   
  }

}

const tooltip = new Tooltip();

export default tooltip;
