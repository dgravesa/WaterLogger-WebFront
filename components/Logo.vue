<template lang="pug">
  img.waterlogger-logo(src="/waterlogger.jpg", width="245", height="245")
</template>

<style scoped>
.waterlogger-logo {
  animation: 500ms appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
