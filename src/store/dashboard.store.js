import {defineStore} from "pinia";

const DEFAULT_SIDEBAR_WIDTH = 280;

export const useSidebarStore = defineStore('sidebar', {
        state: () => {
            return {
                sidebarWidth: DEFAULT_SIDEBAR_WIDTH
            }
        },

        getters: {
            width: state => state.sidebarWidth
        },

        actions: {
            show() {
                this.sidebarWidth = DEFAULT_SIDEBAR_WIDTH;
            },

            hide() {
                this.sidebarWidth = 0;
            },
        }
    }
);
