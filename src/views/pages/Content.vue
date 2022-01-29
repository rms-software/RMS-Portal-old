<template>
  <div id="content">
    <Box title="Pages" collapsable>
      <button class="btn add text" @click="addNewPage">
        <unicon name="plus" fill="white"></unicon>
        Add new page
      </button>&nbsp;

      <button class="btn add text" @click="savePages">
        <unicon name="save" fill="white"></unicon>
        Save
      </button>

      <br /><br />

      <Table>
        <template #head>
          <tr>
            <th>
              Page name
            </th>

            <th>
              URL name
            </th>

            <th>

            </th>
          </tr>
        </template>

        <template #body>
          <tr v-for="(page, index) in pages">
            <td width="">
              <input type="text" v-model="page.name" />
            </td>

            <td width="">
              <input type="text" v-model="page.urlName" />
            </td>

            <td width="400" style="text-align: left">
              <button class="btn main" @click="reOrderPage(index, 'up')">
                <unicon name="angle-up" fill="white"></unicon>
              </button>&nbsp;

              <button class="btn main" @click="reOrderPage(index, 'down')">
                <unicon name="angle-down" fill="white"></unicon>
              </button>&nbsp;

              <button class="btn delete" v-if="page.userMade" @click="deletePage(index)">
                <unicon name="trash" fill="white"></unicon>
              </button>
            </td>
          </tr>
        </template>
      </Table>
    </Box>

    <Box title="Content" collapsable v-if="pages.length > 0">
      <select v-model="currentEditingPage">
        <option v-for="page in pages" :value="page.id">{{ page.name }}</option>
      </select>

      <br /><br />

      Insert the content you want on the '{{ pages.find(page => page.id === currentEditingPage).name }}'
      page here, you can use <a href="https://medium.com/@itsjzt/beginner-guide-to-markdown-229adce30074">Markdown formatting</a> to make things look a little better

      <br /><br />

      <textarea spellcheck="false" v-model="pages.find(page => page.id === currentEditingPage).markdownContent" style="resize: none; width: 100%; height: 300px;">

      </textarea>

      <br /><br />

      <hr />

      <br />

      Here is a preview of how your text will look on your website:

      <br /><br />

      <div style="padding: 10px;background: #fff;" v-html="markdown2Html(pages.find(page => page.id === currentEditingPage).markdownContent)">

      </div>
    </Box>
  </div>
</template>

<script>

// Import components
import Box from "@/components/common/Box";
import Table from "@/components/common/Table";

// Import services
import ContentService from "@/services/ContentService";

// Import libraries
import { marked } from 'marked';

export default {
  components: {
    Box,
    Table
  },

  data: () => ({
    pages: [],
    currentEditingPage: null
  }),

  async mounted() {
    this.pages = (await ContentService.getAllPages())
        .sort((a, b) => a.order > b.order);

    this.currentEditingPage = this.pages[0]?.id;
  },

  methods: {
    deletePage(pageIndex) {
      this.pages.splice(pageIndex, 1);
    },

    async savePages() {
      try {
        await ContentService.savePages(this.pages);
      } catch (e) {
        notifications.add("error", "Something went wrong while saving");
        return;
      }

      notifications.add("info", "Successfully saved pages");
    },

    reOrderPage(pageIndex, direction) {
      // Get the relevant page out of the array
      const pageToMove = this.pages[pageIndex];

      // Remove it out of the array
      this.pages.splice(pageIndex, 1);

      // Reinsert the page
      this.pages.splice(pageIndex - (direction === 'up' ? 1 : direction === 'down' ? -1 : 0), 0, pageToMove);

      // Recalculate order
      this.pages.forEach((page, index) => {
        page.order = index;
      });
    },

    addNewPage() {
      this.pages.push({
        id: null,
        order: Math.max(...this.pages.map(page => page.order)),
        name: "",
        userMade: true,
        markdownContent: "",
        urlName: ""
      });
    },

    markdown2Html(markdown) {
      return marked(markdown);
    }
  }
}
</script>

<style scoped lang="scss">

</style>