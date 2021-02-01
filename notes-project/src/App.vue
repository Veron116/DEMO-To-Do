<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <!-- <message v-if="message" dataMessage="Hello msg" /> -->
          <message v-if="message" :message="message" />

          <!-- new note -->
          <newNote
            :note="note"
            @addNoteMethod="addNote"
            @getPriority="priority = $event"
          /><!--Обращаемся к коллбэку дочернего и вызываем соответ-ий метод в родительском -->

          <div class="note-header" style="margin: 36px 0">
            <!-- title -->
            <h1>{{ title }}</h1>

            <!-- search -->
            <search
              :value="search"
              placeholder="Find your note"
              @search="search = $event"
            />

            <!-- icons controls -->
            <div class="icons">
              <svg
                :class="{ active: grid }"
                @click="grid = true"
                style="cursor: pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <svg
                @click="grid = false"
                :class="{ active: !grid }"
                style="cursor: pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3" y2="6"></line>
                <line x1="3" y1="12" x2="3" y2="12"></line>
                <line x1="3" y1="18" x2="3" y2="18"></line>
              </svg>
            </div>
          </div>

          <!-- note list -->
          <notes :notes="notesFilter" :grid="grid" @remove="removeNote" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import message from "@/components/Message.vue";
import notes from "@/components/Notes.vue";
import newNote from "@/components/NewNote.vue";
import search from "@/components/Search.vue";
import { priority } from "./const";

export default {
  components: {
    message,
    notes,
    newNote,
    search,
  },
  data() {
    return {
      title: "Notes App",
      search: "",
      message: null,
      grid: true,
      priority: "trivial",
      note: {
        title: "",
        desc: "",
        priority: "trivial",
        isHiddenTitle: "input",
      },
      notes: [
        {
          title: "First note",
          desc: "Description for first note",
          date: new Date(Date.now()).toLocaleString(),
          priority: "trivial",
          isHiddenTitle: "input",
        },
        {
          title: "Second note",
          desc: "Description for second note",
          date: new Date(Date.now()).toLocaleString(),
          priority: "trivial",
          isHiddenTitle: "input",
        },
        {
          title: "Third note",
          desc: "Description for this note",
          date: new Date(Date.now()).toLocaleString(),
          priority: "trivial",
          isHiddenTitle: "input",
        },
      ],
    };
  },
  computed: {
    notesFilter() {
      let array = this.notes;
      let search = this.search;

      //If user didn't find anything show all notes
      if (!search) {
        return array;
      }
      //Small
      search = search.trim().toLowerCase();
      //Filter
      array = array.filter((item) => {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item;
        }
      });
      //Error
      return array;
    },
  },
  methods: {
    addNote() {
      let { title, desc, priority } = this.note;
      if (title === "") {
        this.message = `title can't be blank`;
        return false;
      }
      this.notes.push({
        title,
        desc,
        date: new Date(Date.now()).toLocaleString(),
        priority: this.priority,
      });
      this.$store.dispatch('setNote', this.notes);
      this.message = null;
      this.note.title = "";
      this.note.desc = "";
      this.note.priority = "trivial";
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    },
  },
};
</script>

<style>
</style>
