<template>
  <div class="modal">
    <div class="modal__overlay">
      <div class="modal__content" ref="modal">
        <header class="modal__header">
          <h4>{{ header }}</h4>
          <button
            class="modal__close-button"
            @click.prevent="$emit('close')"
            @keydown.enter="$emit('close')"
          >
            x
          </button>
        </header>
        <main>
          <p class="modal__message">{{ message }}</p>
        </main>
        <footer class="modal__footer">
          <button
            class="modal__ok-button"
            aria-label="Click to close the error modal."
            @click.prevent="$emit('close')"
            @keydown.enter="$emit('close')"
          >
            ok
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script src="./Modal.js"></script>

<style scoped lang="scss" src="./Modal.scss"></style>
