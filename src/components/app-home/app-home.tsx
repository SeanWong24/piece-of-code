import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome implements ComponentInterface {

  private textareaElement: HTMLTextAreaElement;

  @Prop() data: string;

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Share Code</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick={() => prompt('Showing URL', `${document.URL.split('#')[0]}#/${btoa(this.textareaElement.value)}`)}>Get URL</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content scrollY={false}>
          <textarea ref={el => this.textareaElement = el} style={{ height: '100%', width: '100%' }} value={atob(this.data)}></textarea>
        </ion-content>
      </Host>
    );
  }

}
