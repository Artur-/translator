import { TemplateResult } from "lit";

export interface PluginAPI {
  send(command: string, data: any): void;
  get renderRoot(): HTMLElement;
  addTab(caption: string, render: () => TemplateResult): void;
}

/**
 * To register a plugin, use
 * @example
 * const plugin: Plugin = {
 *   init: function (pluginInferface: PluginAPI): void {
 *     // Your code here
 *   }
 * }
 * (window.Vaadin as any).devToolsPlugins.push(plugin);
 */
export interface Plugin {
  init(pluginInferface: PluginAPI): void;
}
