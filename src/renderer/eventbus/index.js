import Vue from "vue";
import { ipcRenderer } from "electron";

export const EventBus = new Vue();

export const tunnelEvents = events => {
  if (typeof events === "string") events = [events];
  for (const event of events) {
    ipcRenderer.on(event, () => {
      EventBus.$emit(event);
    });
  }
};

export const cancelTunnel = events => {
  if (typeof events === "string") events = [events];
  for (const event of events) {
    EventBus.$off(event);
  }
};
