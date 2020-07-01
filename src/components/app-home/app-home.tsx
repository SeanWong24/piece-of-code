import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
import monaco from '@timkendrick/monaco-editor';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome implements ComponentInterface {

  private editorContainerElement: HTMLElement;
  private monacoEditor: monaco.editor.IStandaloneCodeEditor;

  @Prop() data: string;

  componentDidLoad() {
    const base64Data = document.URL.split('#/')[1];
    this.monacoEditor = monaco.editor.create(
      this.editorContainerElement,
      {
        value: atob(base64Data || ''),
        language: 'typescript',
        automaticLayout: true
      }
    );
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Share Code</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick={() => {
                const url = `${document.URL.split('#')[0]}#/${btoa(this.monacoEditor.getValue())}`;
                if (prompt('Copying the URL', url)) {
                  navigator.clipboard?.writeText(url);
                }
              }}>Get URL</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content scrollY={false} ref={el => this.editorContainerElement = el}>
        </ion-content>
      </Host>
    );
  }

}
