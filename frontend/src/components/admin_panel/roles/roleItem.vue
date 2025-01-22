<template>
  <v-col cols="12" lg="2" xl="2" class="d-flex justify-center align-center">
    <v-text-field class="px-5" variant="underlined" v-model="title">
    </v-text-field>
  </v-col>
  <v-col cols="12" lg="8" xl="8">
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(permissionObj, model) in pagesPermissions"
          cols="12"
          xl="6"
          class="model-container"
        >
          <v-card color="grey-darken-3">
            <v-card-title class="py-0">{{ model }}:</v-card-title>
            <div class="d-flex justify-space-evenly">
              <v-checkbox
                v-for="(value, permission) in filteredPermissionObj(
                  permissionObj
                )"
                :label="permission"
                hide-details
                v-model="pagesPermissions[model][permission]"
              ></v-checkbox>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
  <v-col cols="12" lg="2" xl="2">
    <div
      class="actions-container d-flex h-100 ga-3 justify-center align-center"
    >
      <v-btn v-if="!id" block color="success" @click="onCreate">Create</v-btn>
      <template v-else-if="canEdit || canDelete">
        <v-btn
          v-if="canEdit"
          class="flex-grow-1"
          color="primary"
          @click="onSave"
          >Save</v-btn
        >
        <v-btn
          v-if="canDelete"
          class="flex-grow-1"
          color="red-darken-2"
          @click="onDelete"
          >Delete</v-btn
        >
      </template>
      <span v-else class="text-subtitle-1">N/A</span>
    </div>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "RoleItem",
  props: {
    role: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      id: this.role._id,
      title: this.role.title,
      pagesPermissions: JSON.parse(JSON.stringify(this.role.pagesPermissions)),
    }
  },
  computed: {
    ...mapGetters("permissions", { userPagesPermissions: "pagesPermissions" }),
    canEdit() {
      return this.userPagesPermissions?.roles.update
    },
    canDelete() {
      return this.userPagesPermissions?.roles.delete
    },
  },
  methods: {
    ...mapActions("role", ["updateRoleById", "deleteRoleById", "createRole"]),
    filteredPermissionObj(permissionObj) {
      const { _id, ...permissions } = permissionObj
      return permissions
    },
    async onSave() {
      //TODO: add alert
      try {
        await this.updateRoleById({
          roleId: this.id,
          roleObj: {
            title: this.title,
            pagesPermissions: this.pagesPermissions,
          },
        })
      } catch (error) {
        console.warn(error)
      }
    },
    async onDelete() {
      //TODO: add alert
      try {
        await this.deleteRoleById(this.id)
      } catch (error) {
        console.warn(error)
      }
    },
    async onCreate() {
      //TODO: add alert
      try {
        await this.createRole({
          title: this.title,
          pagesPermissions: this.pagesPermissions,
        })
        this.setInitData()
      } catch (error) {
        console.warn(error)
      }
    },
    setInitData() {
      this.title = this.role.title
      this.pagesPermissions = JSON.parse(
        JSON.stringify(this.role.pagesPermissions)
      )
    },
  },
}
</script>

<style lang="css" scoped></style>
