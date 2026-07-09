import { Component, h, Host, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lab21-tabs',
  styleUrl: 'lab21-tabs.css',
  shadow: true,
})
export class Lab21Tabs {
  @Prop() defaultValue = '';
  @Prop() value = '';
  @State() active: string = this.defaultValue || this.value;

  @Event() lab21Change: EventEmitter<string>;

  private el!: HTMLElement;

  private tabs: { value: string; label: string }[] = [];
  private panels: Map<string, HTMLElement> = new Map();

  componentWillLoad() {
    this.active = this.defaultValue || this.value;
  }

  private select(value: string) {
    this.active = value;
    this.lab21Change.emit(value);
  }

  render() {
    return (
      <Host>
        <div class="tabs">
          <slot name="tab" onSlotchange={() => this.collectTabs()}></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </Host>
    );
  }

  private collectTabs() {
    const tabEls = Array.from(this.el.querySelectorAll('[slot="tab"]'));
    this.tabs = tabEls.map((el) => ({
      value: el.getAttribute('data-value') || '',
      label: el.textContent || '',
    }));
    this.tabs.forEach((t) => {
      const panel = this.el.querySelector(`[data-panel="${t.value}"]`);
      if (panel) this.panels.set(t.value, panel as HTMLElement);
    });
    this.updatePanels();
  }

  private updatePanels() {
    this.panels.forEach((panel, value) => {
      panel.style.display = value === this.active ? 'block' : 'none';
    });
  }
}
