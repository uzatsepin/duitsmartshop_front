<template>
  <div>
    <div
      v-if="editor"
      class="border border-slate-200 rounded-md p-4 flex items-center justify-between"
    >
      <div class="flex items-center gap-4 flex-wrap justify-center">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'bg-slate-200': editor.isActive('bold') }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-bold" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'bg-slate-200': editor.isActive('italic') }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-italic" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'bg-slate-200': editor.isActive('strike') }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-strikethrough" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'bg-slate-200': editor.isActive('code') }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:code-block-tags" class="w-6 h-6" />
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()">
          <Icon name="mdi:format-clear" class="w-6 h-6" />
        </button>
        <!-- <button @click="editor.chain().focus().clearNodes().run()">
            <Icon name="mdi:format-clear" class="w-6 h-6"/>
          </button> -->
        <button
          @click="editor.chain().focus().setParagraph().run()"
          class="flex items-center justify-center w-8 h-8 rounded-full"
          :class="{ 'bg-slate-200': editor.isActive('paragraph') }"
        >
          <Icon name="mdi:format-paragraph" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'bg-slate-200': editor.isActive('heading', { level: 1 }) }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-header-1" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'bg-slate-200': editor.isActive('heading', { level: 2 }) }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-header-2" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'bg-slate-200': editor.isActive('heading', { level: 3 }) }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-header-3" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'bg-slate-200': editor.isActive('heading', { level: 4 }) }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-header-4" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'bg-slate-200': editor.isActive('heading', { level: 5 }) }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-header-5" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'bg-slate-200': editor.isActive('heading', { level: 6 }) }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-header-6" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'bg-slate-200': editor.isActive('bulletList') }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-list-bulleted" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'bg-slate-200': editor.isActive('orderedList') }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-list-numbered" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'bg-slate-200': editor.isActive('codeBlock') }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-quote-open" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'bg-slate-200': editor.isActive('blockquote') }"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:format-quote-open" class="w-6 h-6" />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <Icon name="mdi:minus" class="w-6 h-6" />
        </button>
        <!-- <button @click="editor.chain().focus().setHardBreak().run()">
            hard break
          </button> -->
        <button @click="addImage">
          <Icon name="mdi:image" class="w-6 h-6" />
        </button>
      </div>
      <div class="flex items-center gap-4">
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:undo" class="w-6 h-6" />
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
          class="flex items-center justify-center w-8 h-8 rounded-full"
        >
          <Icon name="mdi:redo" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <TiptapEditorContent
      :editor="editor"
      class="border border-slate-200 rounded-md p-4 mt-4 min-h-[400px]"
    />
  </div>
</template>

<script setup>
import { Image } from "@tiptap/extension-image";

const props = defineProps({
  modelValue: {
    type: String,
    default: "Текст вашої статті",
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  extensions: [TiptapStarterKit, Image],
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
});

const addImage = () => {
  const url = prompt("URL");

  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
};

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style>
.ProseMirror {
  min-height: 350px;
}

.ProseMirror-focused {
  border: none;
  outline: none;
}
</style>
