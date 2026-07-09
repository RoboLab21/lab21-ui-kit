import { Component, h, Host, Prop, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lab21-dialog',
  styleUrl: 'lab21-dialog.css',
  shadow: true,
})
export class Lab21Dialog {
  @Prop() open = false;
  @Prop() heading = '';

  @Event() lab21Close: EventEmitter<void>;

  @Watch('open')
  watchOpen() {
    this.visible = this.open;
  }

  @Prop({ mutable: true }) visible: boolean = this.open;

  private close = () => {
    this.visible = false;
    this.open = false;
    this.lab21Close.emit();
  };

  render() {
    if (!this.visible) return <Host style={{ display: 'none' }}></Host>;

    return (
      <Host>
        <div class="overlay" onClick={this.close}>
          <div class="dialog" onClick={(e) => e.stopPropagation()}>
            {this.heading && <header class="header">{this.heading}</header>}
            <div class="body">
              <slot></slot>
            </div>
            <footer class="footer">
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      </Host>
    );
  }
}
