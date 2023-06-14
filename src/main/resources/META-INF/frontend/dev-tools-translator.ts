import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Plugin, PluginAPI } from "./api";
// import { PluginAPI } from "Frontend/generated/jar-resources/vaadin-dev-tools/vaadin-dev-tools.js";

@customElement("dev-tools-translator")
export class Translator extends LitElement {
  @property({ type: Object })
  private devTools!: PluginAPI;

  render() {
    return html`<div>
<button
  @click=${() => {
    const d = document.createElement("div");
    d.style.position = "absolute";
    d.style.inset = "0";
    d.style.background = "rgba(200,200,200,0.9)";
    d.style.zIndex = "100000";
    d.style.textAlign = "center";
    d.style.color = "black";
    d.style.fontSize = "2em";
    document.body.append(d);
    d.innerText = "Translating the UI...";
    const checkboxes: any[] = Array.from(
      this.renderRoot
        .querySelector("#inputs")!
        .querySelectorAll("input[type='checkbox']")
    );
    const locales = checkboxes.filter((cb) => cb.checked).map((cb) => cb.value);
    const uiId = (window as any).Vaadin.Flow.clients.ROOT.getUIId();
    this.devTools.send("translate", { locales, uiId });
  }}
>
  Translate it
</button>
<div id="inputs">
  <label><input type="checkbox" name="locales" value="de" checked />German</label>
  <label><input type="checkbox" name="locales" value="fi_FI" />Finnish</label>
  <label><input type="checkbox" name="locales" value="sv_SE" />Swedish</label>
  <label><input type="checkbox" name="locales" value="nn_NO" />Norwegian</label>
  <label><input type="checkbox" name="locales" value="es" />Spanish</label>
  <label><input type="checkbox" name="locales" value="zh_CN" />Chinese</label>
  <label><input type="checkbox" name="locales" value="eo" />Esperanto</label>
  <label><input type="checkbox" name="locales" value="tlh" />Klingon</label>
  <label><input type="checkbox" name="locales" value="la" />Latin</label>
</div>
</div>
</div>
`;
  }
}

const plugin: Plugin = {
  init: function (devTools: PluginAPI): void {
    devTools.addTab(
      "Translate",
      () =>
        html`<dev-tools-translator
          .devTools=${devTools}
        ></dev-tools-translator>`
    );
  },
};
(window as any).Vaadin.devToolsPlugins.push(plugin);
