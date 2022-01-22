<template>
  <div>
    <Modal ref="employeeModal" @submit="updateEmployee">
      <div class="user-form">
        <ImageUploader class="image-uploader" v-model="userFormData.profilePicture" />

        <br />

        <div class="user-field">
          <span>First name</span>
          <input type="text" v-model="userFormData.firstName" />
        </div>

        <div class="user-field">
          <span>Last name</span>
          <input type="text" v-model="userFormData.lastName" />
        </div>

        <div class="user-field">
          <span>Email</span>
          <input type="text" v-model="userFormData.email" />
        </div>

        <div class="user-field">
          <span>Address</span>
          <input type="text" v-model="userFormData.address" />
        </div>

        <br />

        <div class="user-field">
          <span>Username</span>
          <input type="text" v-model="userFormData.username" />
        </div>

        <div class="user-field">
          <span>Password</span>
          <input type="password" v-model="userFormData.password" />
        </div>

        <div class="user-field">
          <span>Confirm password</span>
          <input type="password" v-model="userFormData.confirmPassword" />
        </div>
      </div>
    </Modal>

    <button class="btn add text" @click="createEmployee()">
      <unicon name="plus" fill="white"></unicon> New employee
    </button>

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
          <td><img :src="user.profilePicture" class="profile-picture" v-if="user.profilePicture" /></td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address }}</td>
          <td>
            <button class="btn delete spacing">
              <unicon name="trash" fill="white" />
            </button>

            <button class="btn edit" @click="editEmployee(user)">
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
import ImageUploader from "@/components/common/ImageUploader";

// Import services
import UsersService from "@/services/UsersService";

export default {
  components: {
    Table,
    Modal,
    ImageUploader
  },

  data: () => ({
    users: [],
    userFormData: {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      profilePicture: "",
      username: null,
      password: null,
      confirmPassword: null
    }
  }),

  async mounted() {
    this.users = await UsersService.getAllUsers();
  },

  methods: {
    async updateEmployee() {
      if (this.userFormData.password !== this.userFormData.confirmPassword) {
        notifications.add('error', 'Confirm password is not the same as password');
        return
      }

      const result = await UsersService.updateUser(this.userFormData);

      if (result === undefined)
        return

      this.$refs.employeeModal.show();
      notifications.add("info", "Person added successfully");
      this.loadEmployees();
    },

    async editEmployee(user) {
      this.userFormData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        profilePicture: user.profilePicture,
        username: null,
        password: null,
        confirmPassword: null
      };

      this.$refs.employeeModal.show();
    },

    async createEmployee() {
      this.userFormData = {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        profilePicture: "",
        username: null,
        password: null,
        confirmPassword: null
      };

      this.$refs.employeeModal.show();
    },

    async loadEmployees() {
      this.users = [];
      const that = this;

      this.$nextTick(async () => {
        that.users = await UsersService.getAllUsers();
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/views/pages/employees.scss";
</style>