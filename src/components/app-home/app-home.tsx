import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
import monaco from '@timkendrick/monaco-editor';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome implements ComponentInterface {

  private editorContainerElement: HTMLElement;
  private monacoEditor: monaco.editor.IStandaloneCodeEditor;

  @Prop() language: string = 'javascript';
  @Prop() data: string;

  componentDidLoad() {
    this.monacoEditor = monaco.editor.create(
      this.editorContainerElement,
      {
        value: atob(this.data?.replace(/-/g, '/') || ''),
        language: this.language,
        automaticLayout: true
      }
    );
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-select
              interface="popover"
              slot="start"
              value={this.language}
              onIonChange={({ detail }) => monaco.editor.setModelLanguage(this.monacoEditor.getModel(), this.language = detail.value)}
            >
              {
                monaco.languages.getLanguages().map(language =>
                  <ion-select-option value={language.id}>{language.aliases[0]}</ion-select-option>
                )
              }
            </ion-select>
            <ion-buttons slot="end">
              <ion-button onClick={() => {
                const url = `${document.URL.split('#')[0]}#/${this.language}/${btoa(this.monacoEditor.getValue()).replace(/\//g, '-')}`;
                window.location.href = url;
              }}>Apply URL</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content scrollY={false} ref={el => this.editorContainerElement = el}>
        </ion-content>
      </Host>
    );
  }

}