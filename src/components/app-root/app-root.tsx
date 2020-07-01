import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/:language" component="app-home" />
          <ion-route url="/:language/:data" component="app-home" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
