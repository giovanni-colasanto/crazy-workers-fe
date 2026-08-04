import { ref } from 'vue';

const visible = ref(false);
const message = ref('');

export function useSnackbar() {
  function show(msg, duration = 2500) {
    message.value = msg;
    visible.value = true;
    setTimeout(() => (visible.value = false), duration);
  }

  return { visible, message, show };
}
