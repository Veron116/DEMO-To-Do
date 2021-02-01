<template>
  <div class="notes">
    <div
      class="note"
      :class="[{ full: !grid }, note.priority]"
      v-for="(note, index) in notes"
      :key="index"
    >
      <div class="note-header" :class="{ full: !grid }">
        <div class="title-wrap">
          <p
            @click="changeTitle(note)"
            :class="[note.isHiddenTitle === 'text' ? 'hidden' : '']"
          >
            {{ note.title }}
          </p>
          <input
            type="text"
            ref="title"
            v-model="newTitle"
            :class="[note.isHiddenTitle === 'input' ? 'hidden' : '']"
            @keyup.enter="saveData(note)"
            @keyup.esc="resetData(note)"
            @blur="resetData(note)"
          />
        </div>
        <p style="cursor: pointer" @click="removeNote(index)">x</p>
      </div>
      <div class="note-body">
        <p>{{ note.desc }}</p>
        <span>{{ note.date }}</span>
        <p>{{ note.priority }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true,
    },
    grid: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      oldTitle: "",
      newTitle: "",
    };
  },
  methods: {
    removeNote(index) {
      // console.log(`Note id - ${index} removed`);
      this.$emit("remove", index);
    },
    changeTitle(note) {
      console.log("change ", note);
      note.isHiddenTitle = "text";
      this.oldTitle = note.title;

      console.log(this.$refs.title);
      this.$refs.title.focus();
    },
    saveData(note) {
      if (this.newTitle) {
        note.title = this.newTitle;
      } else {
        note.title = this.oldTitle;
      }

      note.isHiddenTitle = "input";
      this.newTitle = "";
      console.log("save ", note);
    },
    resetData(note) {
      note.isHiddenTitle = "input";
    },
  },
};
</script>

<style lang="scss">
.notes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 40px 0;
}
.note {
    width: 48%;
    padding: 18px 20px;
    margin-bottom: 20px;
    background-color: #fff;
    transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
    box-shadow: 0 30px 30px rgba(58, 40, 40, 0.02);
    &:hover {
        box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
        transform: translateY(-6px);
    }
    &.full {
        width: 100%;
        text-align: center;
    }
    &.medium {
        border: 4px solid yellow;
    }
    &.critical {
        border: 4px solid red;
    }
}
.note-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.full {
        justify-content: center;
        p {
            margin-right: 16px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    .title-wrap {
        position: relative;
        input {
            position: absolute;
            top: 0;
            height: 28px;
            width: 200px;
            margin: 0;
            border-radius: 8px;
            padding-left: 5px;
        }
        .hidden {
            opacity: 0;
            z-index: -1;
        }
    }
    h1 {
        font-size: 32px;
    }
    p {
        color: blue;
        font-size: 20px;
    }
    svg {
        margin-right: 12px;
        color: #999;
        &.active {
            color: blue;
        }
        &::last-child {
            margin-right: 0;
        }
    }
}
.note-body {
    p {
        margin: 20px 0;
    }
    span {
        font-size: 14px;
        color: #999;
    }
}
</style>