<template>
  <div class="message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    // dataMessage: {
    //   type: String,
    //   required: true, //   если поле должно быть обязательным
    //   //default: "default msg", //можно задать дефолтное значение если поле будет отсутствовать
    // },
    message: {
      type: String,
      required: true, //   если поле должно быть обязательным
      //default: "default msg", //можно задать дефолтное значение если поле будет отсутствовать
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  text-align: center;
  padding: 20px;
  color: red;
}
</style>
