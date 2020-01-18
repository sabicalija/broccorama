import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus, faAngleLeft);

Vue.component("font-awesome-icon", FontAwesomeIcon);
