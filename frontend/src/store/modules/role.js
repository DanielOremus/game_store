import axios from "axios"
import apiEndpoints from "../../../api/apiEndpoints"

export default {
  namespaced: true,
  state: () => ({
    roleList: [],
    isLoading: false,
  }),
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    roleList(state) {
      return state.roleList
    },
  },
  mutations: {
    setRoleList(state, list) {
      state.roleList = list
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    addRole(state, role) {
      state.roleList.push(role)
    },
    updateRole(state, roleData) {
      const roleIndex = state.roleList.findIndex(
        (role) => role._id === roleData._id
      )
      state.roleList[roleIndex] = roleData
    },
    deleteRole(state, roleId) {
      state.roleList = state.roleList.filter((role) => role._id !== roleId)
    },
  },
  actions: {
    async fetchAllRoles({ commit }) {
      commit("setLoading", true)
      try {
        const response = await axios.get(apiEndpoints.role.fetchRoles, {
          withCredentials: true,
        })
        const resData = response.data
        commit("setRoleList", resData.data.roles)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async fetchRoleByUserId({ commit }, userId) {
      try {
        const response = await axios.get(
          apiEndpoints.role.fetchRoleByUserId(userId),
          {
            withCredentials: true,
          }
        )
        const resData = response.data
        commit("setRoleList", [resData.data.role])
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async createRole({ commit }, roleObj) {
      try {
        const response = await axios.post(
          apiEndpoints.role.createRole,
          roleObj,
          { withCredentials: true }
        )
        const resData = response.data
        commit("addRole", resData.data.role)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async updateRoleById({ commit }, payload) {
      const { roleId, roleObj } = payload

      try {
        const response = await axios.put(
          apiEndpoints.role.updateRoleById(roleId),
          roleObj,
          { withCredentials: true }
        )
        const resData = response.data
        commit("updateRole", resData.data.role)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async deleteRoleById({ commit }, roleId) {
      try {
        await axios.delete(apiEndpoints.role.deleteRoleById(roleId), {
          withCredentials: true,
        })
        commit("deleteRole", roleId)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    setRoleList({ commit }, list) {
      commit("setRoleList", list)
    },
  },
}
