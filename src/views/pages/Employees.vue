<template>
  <div>
    <button class="btn add text">
      <unicon name="plus" fill="white"></unicon> New employee
    </button>



    <Modal>

    </Modal>

    <Table>
      <template #head>
        <tr>
          <th></th>
          <th>Naam</th>
          <th>Email</th>
          <th>Address</th>
          <th></th>
        </tr>
      </template>

      <template #body>
        <tr v-for="user in users">
          <td><img :src="user.profilePicture" class="profile-picture" /></td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address }}</td>
          <td>
            <button class="btn delete spacing">
              <unicon name="trash" fill="white" />
            </button>
            <button class="btn edit">
              <unicon name="pen" fill="white" />
            </button>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script>
// Import components
import Table from "@/components/common/Table";
import Modal from "@/components/common/Modal";

// Import services
import UsersService from "@/services/UsersService";

export default {
  components: {
    Table,
    Modal
  },

  data: () => ({
    users: []
  }),

  async mounted() {
    this.users = await UsersService.getAllUsers();
  }
}
</script>

<style scoped>
@import "../../scss/views/pages/employees.scss";
</style>