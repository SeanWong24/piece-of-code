import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
import monaco from '@timkendrick/monaco-editor';
import pako from 'pako';

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
    let result = '';
    if (this.data) {
      const encodedBuffer = this.base64ToBuffer(this.data);
      const inflatedBuffer = pako.inflate(encodedBuffer);
      result = new TextDecoder('utf8').decode(inflatedBuffer);
    }

    this.monacoEditor = monaco.editor.create(
      this.editorContainerElement,
      {
        value: result.replace(/-/g, '/'),
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
                const text = this.monacoEditor.getValue();
                const deflatedText = pako.deflate(new TextEncoder().encode(text));
                const base64String = this.bufferToBase64(deflatedText);
                const url = `${document.URL.split('#')[0]}#/${this.language}/${base64String.replace(/\//g, '-')}`;
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

  bufferToBase64(buffer: Uint8Array) {
    var binstr = Array.prototype.map.call(buffer, function (character) {
      return String.fromCharCode(character);
    }).join('');
    return btoa(binstr);
  }

  base64ToBuffer(base64: string) {
    var binstr = atob(base64);
    var buffer = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function (character, i) {
      buffer[i] = character.charCodeAt(0);
    });
    return buffer;
  }

}
