import Vue from 'vue'

import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';

import { Editor, Viewer } from '@toast-ui/vue-editor';

Vue.component('editor', Editor)
Vue.component('viewer', Viewer)