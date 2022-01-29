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

    <Box title="Content" collapsable>
      <select v-model="currentEditingPage">
        <option v-for="page in pages" :value="page.id">{{ page.name }}</option>
      </select>
    </Box>
  </div>
</template>

<script>

// Import components
import Box from "@/components/common/Box";
import Table from "@/components/common/Table";

// Import services
import ContentService from "@/services/ContentService";

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
    this.pages = await ContentService.getAllPages();

    this.currentEditingPage = this.pages[0]?.id;
  },

  methods: {
    deletePage(pageIndex) {
      this.pages.splice(pageIndex, 1);
    },

    savePages() {
      
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
      })
    },

    addNewPage() {
      this.pages.push({
        order: Math.max(...this.pages.map(page => page.order)),
        name: "",
        userMade: true,
        markdownContent: "",
        urlName: ""
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>