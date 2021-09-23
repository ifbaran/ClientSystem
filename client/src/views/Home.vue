<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    class="elevation-1"
  >
      <template v-slot:item.providers = "{item}">
        {{getProvidersName(item)}}
      </template>

    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Clients</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="700px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Client
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="justify-center">
              <span class="text-h4">{{ formTitle }}</span>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <v-container class="mt-5">
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      outlined
                      v-model="editedClientItem.clientName"
                      label="Client Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      outlined
                      v-model="editedClientItem.clientEmail"
                      label="Client Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      outlined
                      v-model="editedClientItem.clientPhone"
                      label="Client Phone"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                  <h3 class="ml-5">Providers</h3>
                  <v-list>
                    <v-list-item v-for="(item, index) in providers" :key="index">
                      <v-checkbox v-model="selectedProvidersArray" :value="item" multiple />
                        {{item.name}}
                      <v-icon small class="ml-5" color="blue darken-3" @click="editProviderItem(item)" > mdi-pencil </v-icon>
                      <v-icon small class="ml-5" color="red darken-4" @click="deleteProvider(item)" > mdi-delete </v-icon>
                    </v-list-item>
                  </v-list>
                  <v-dialog v-model="dialogProvider" max-width="400px">
                    <template v-slot:activator="{on, attrs}">
                    <v-row>
                      <v-btn
                      color="primary"
                      dark
                      class="mb-5 mt-5 ml-5"
                      v-bind="attrs"
                      v-on="on"
                      >
                      New Provider
                      </v-btn>
                    </v-row>
                  </template>
                  <v-card>
                    <v-card-title class="justify-center">
                      <span class="text-h4"> {{ formTitleProvider }}</span>
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                      <v-container class="mt-5">
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field
                              outlined
                              v-model="editedProviderItem.name"
                              label="Provider Name"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeProviderDialog">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="saveProvider">
                        Save Provider
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  </v-dialog>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="510px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this client?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogProviderDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"> Are you sure want to delete this provider?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeProviderDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteProviderConfirm">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        medium
        color="blue darken-3"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        medium
        color="red darken-4"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="getAllClients"
      >
        Reset
      </v-btn>
    </template> 
  </v-data-table>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'Home',

    data() {
      return {
        clients: [],
        providers: [],
        selectedProvidersArray: [],
        dialog: false,
        dialogDelete: false,
        dialogProvider: false,
        dialogProviderDelete: false,
        headers: [
        {
          text: 'Client Name',
          align: 'start',
          sortable: false,
          value: 'clientName',
        },
        { text: 'Client Email', value: 'clientEmail' },
        { text: 'Client Phone', value: 'clientPhone' },
        { text: 'Providers', value: 'providers' },
		    { text: 'Actions', value: 'actions', sortable: false },
      ],
       
        editedClientIndex: -1,

        editedClientItem: {
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          providers: '',
        },

        defaultClientItem: {
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          providers: '',
        },

        defaultProviderItem:{
          name: ''
        },

        editedProviderItem: {
          name: ''
        },

        editedProviderIndex: -1
      }
    },

    computed: {
      // Set client form title 
      formTitle () {
        return this.editedClientIndex === -1 ? 'New Client' : 'Edit Client'
      },
      // Set provider form title 
      formTitleProvider() {
        return this.editedProviderIndex === -1 ? 'New Provider' : 'Edit Provider'
      }
    },

    methods: {
      // Get all clients
      getAllClients: function(){
        const getClientsUrl = "/clients";
        axios
        .get(getClientsUrl)
        .then( (res) => { 
          this.clients = res.data;
        });;
      },

      // Get all providers
      getAllProviders: function(){
        const getProvidersUrl = "/providers";
        axios.get(getProvidersUrl)
        .then((res) => {
          this.providers = res.data;
        })
      },

      // Set client details on client's new/edit form 
      editItem: function(item) {
        this.editedClientIndex = this.clients.indexOf(item)
        this.editedClientItem = Object.assign({}, item)
        this.selectedProvidersArray = this.editedClientItem.providers
        this.dialog = true
      },

      // Set client details when delete
      deleteItem: function(item) {
        this.editedClientIndex = this.clients.indexOf(item)
        this.editedClientItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      // Set provider details when delete
      deleteProvider: function(item) {
        this.editedProviderItem = this.providers.indexOf(item)
        this.editedProviderItem = Object.assign({}, item)
        this.dialogProviderDelete = true
      },

      // Set provider details on provider's new/edit form
      editProviderItem: function(item) {
        this.editedProviderIndex = this.providers.indexOf(item)
        this.editedProviderItem = Object.assign({}, item);
        this.dialogProvider = true;
      },

      // Close dialog of delete provider
      closeProviderDelete: function() {
        this.dialogProviderDelete = false
        this.$nextTick(() => {
          this.editedProviderItem = Object.assign({}, this.defaultProviderItem)
          this.editedProviderIndex = -1
        })
      },

      // Close dialog of client form
      close : function(){
        this.dialog = false
        this.$nextTick(() => {
          this.editedClientItem = Object.assign({}, this.defaultClientItem)
          this.editedClientIndex = -1
          this.clearSelectedProviders();
        })
      },

      // Close dialog of delete client
      closeDelete: function() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedClientItem = Object.assign({}, this.defaultClientItem)
          this.editedClientIndex = -1
        })
      },

      // Close dialog of provider form
      closeProviderDialog: function(){
          this.dialogProvider = false
          this.$nextTick(() => {
            this.editedProviderItem = Object.assign({}, this.defaultProviderItem)
            this.editedProviderIndex = -1
        })
      },

      // Delete provider and update client, the client has got deleted provider
      deleteProviderConfirm: function(){
        const deleteProviderByIdUrl = "/delete-provider";
        const updateClientByIdUrl = "/update-client";
        let tempProviders = [];
        this.clients.forEach(client => {
          tempProviders = client.providers;
          client.providers.forEach(clientProvider => {
            if (this.editedProviderItem._id == clientProvider._id) {
              const providerIndex = tempProviders.indexOf(clientProvider);
              if (providerIndex > -1) {
                tempProviders.splice(providerIndex, 1);
              }
              client.providers = tempProviders;
              axios.delete(`${deleteProviderByIdUrl}/${this.editedProviderItem._id}`);
              axios.patch(`${updateClientByIdUrl}/${client._id}`, client);
            }
          });
        });
        this.getAllProviders();
        this.getAllClients();
        this.close();
        this.closeProviderDelete();
      },

      // Delete client
      deleteItemConfirm: function() {
        const deleteClientByIdUrl = "/delete-client";
        axios.delete(`${deleteClientByIdUrl}/${this.editedClientItem._id}`);
        this.getAllClients();
        this.closeDelete();
      },

      // New/Edit client
      save: function() {
        const createClientUrl = "/create-client";
        const updateClientByIdUrl = "/update-client"
        this.editedClientItem.providers = this.selectedProvidersArray;
        if (this.editedClientIndex > -1) {
          axios.patch(`${updateClientByIdUrl}/${this.editedClientItem._id}`, this.editedClientItem);
          this.clearSelectedProviders();
          this.getAllClients();
        } else {
          axios.post(createClientUrl, this.editedClientItem);
          this.clearSelectedProviders();
          this.getAllClients();
        }
        this.close()
      },

      // New/Edit provider
      saveProvider: function(){
        const createProviderUrl = "/create-provider";
        const updateProviderByIdUrl = "/update-provider";
        if (this.editedProviderIndex > -1) {
          axios.patch(`${updateProviderByIdUrl}/${this.editedProviderItem._id}`, this.editedProviderItem);
          this.getAllProviders();
          this.getAllClients();
        } else {
          axios.post(createProviderUrl, this.editedProviderItem);
          this.getAllProviders();
          this.getAllClients();
        }
        this.closeProviderDialog();
      },

      // Clear array of selected provider 
      clearSelectedProviders: function () {
        this.selectedProvidersArray = [];
      },

      // The function show name of provider if the provider exist the client
      getProvidersName: function(item){
        let tempProviderName = "";
        for (let i = 0; i < item.providers.length; i++) {
          if(item.providers.length == 1){
            tempProviderName = item.providers[i].name;
          }
          else {
            if(tempProviderName == ""){
              tempProviderName = item.providers[i].name;
            }
            else {
              tempProviderName = tempProviderName + ", " + item.providers[i].name;
            }
          }
        }
        return tempProviderName;
      }
    },

    watch: {
      dialog (val) {
        val || this.close();
      },
      dialogDelete (val) {
        val || this.closeDelete();
      },
      dialogProvider(val) {
        val || this.closeProviderDialog();
      }
    },

   created() {
        this.getAllProviders();
        this.getAllClients();
      },

  }
</script>
