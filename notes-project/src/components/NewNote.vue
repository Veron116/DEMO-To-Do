<template>
  <div class="new-note">
    <label>Title</label>
    <input v-model="note.title" type="text" />
    <label>Description</label>
    <textarea v-model="note.desc" style="margin-bottom: 20px"></textarea>
    <div class="priority-wrapper">
      <label>
        <input
          type="radio"
          value="trivial"
          name="priority"
          v-model="priority"
        />
        Trivial
      </label>
      <label>
        <input
          type="radio"
          value="medium"
          name="priority"
          v-model="priority"
          class="medium"
        />
        Medium
      </label>
      <label>
        <input
          type="radio"
          value="critical"
          name="priority"
          v-model="priority"
          class="critical"
        />
        Critical
      </label>
    </div>
    <button class="btn btnPrimary" @click="addNote">New Note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      priority: "trivial",
    };
  },
  watch: {
    priority(value) {
      this.priority = value;
      this.$emit("getPriority", this.priority);
    },
  },
  methods: {
    addNote() {
      //тут метод должен называться как в родительском компоненте
      this.$emit("addNoteMethod", this.note); //задаем коллбэк с датой из текущего компонента (данные в пропсе this.note)
    },
  },
};
</script>

<style scoped lang="scss">
.new-note {
    text-align: center;
    padding-bottom: 20px;
}
.priority-wrapper {
    display: flex;
    justify-content: center;
    margin: 36px 0;

    label {
        margin: 0 15px;
    }
    input {
        margin: 0;
        &.medium:checked {
            box-shadow: 2px 2px yellow;
        }
        &.critical:checked {
            box-shadow: 2px 2px red;
        }
    }
}
</style>