import { mapGetters } from "vuex";

export const recipe = {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["getRecipeByUrl"]),
    recipe() {
      return this.getRecipeByUrl(this.url);
    }
  }
};
