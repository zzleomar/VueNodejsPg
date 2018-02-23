  <template>
    <div>
      
    <breadcrumb></breadcrumb>

     <b-container fluid>
    <!-- User Interface controls -->
    <b-row class="t-margenTop">
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Buscar" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Ingrese Busqueda" />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Ordenar" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- Opción de Ordenado --</option>
            </b-form-select>
            <b-input-group-button>
              <b-form-select :disabled="!sortBy" v-model="sortDesc">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </b-col>
    
    </b-row>

    <!-- Main table element -->
    <b-table hover class='text-center thead-gris t-margenTop' show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
    >
      <template slot="nombres" slot-scope="row">{{row.value.nombre}} {{row.value.apellidos}}</template>
      <template slot="acto" slot-scope="row" >{{row.value.descripcion}}</template>
      <template slot="unidades" slot-scope="row" >{{row.value}}</template>
      <template slot="fecha" slot-scope="row" >{{row.value}}</template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
   </b-table>
      <b-col md="12" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" align="right" />
      </b-col>
  

  </b-container>
    </div>
</template>
<script type="text/x-template" id="breadcrumb">
      <ol class="breadcrumb">
      <li class="breadcrumb-item active">Inicio</li>
    </ol>
</script>
  <script>
import Vue from 'vue'

          var items = [
              { nombres: {nombre: "Tiger", apellidos:"Nixon"}, acto:{id:"2", descripcion:"System Architect"}, unidades: 12, fecha: "2011/04/25", costo: 320.800},
              { nombres: {nombre: "Garrett", apellidos:"Winters"}, acto:{id:"31", descripcion:"Baccountant"}, unidades: 8, fecha: "2011/07/25", costo: 170.750},
              { nombres: {nombre: "Nixon", apellidos:"Winters"}, acto:{id:"1", descripcion:"Tuntant"}, unidades: 7, fecha: "2011/07/25", costo: 70.500},
              { nombres: {nombre: "Airi", apellidos:"Satou"}, acto:{id:"4", descripcion:"Accountant"}, unidades: 18, fecha: "2008/11/28", costo: 162.700},
              { nombres: {nombre: "Tiger", apellidos:"Nixon"}, acto:{id:"12", descripcion:"System Architect"}, unidades: 12, fecha: "2011/04/25", costo: 320.800},
              { nombres: {nombre: "Garrett", apellidos:"Winters"}, acto:{id:"6", descripcion:"Baccountant"}, unidades: 8, fecha: "2011/07/25", costo: 170.750},
              { nombres: {nombre: "Nixon", apellidos:"Winters"}, acto:{id:"15", descripcion:"Tuntant"}, unidades: 7, fecha: "2011/07/25", costo: 70.500},
              { nombres: {nombre: "Airi", apellidos:"Satou"}, acto:{id:"24", descripcion:"Accountant"}, unidades: 18, fecha: "2008/11/28", costo: 162.700},
              { nombres: {nombre: "Tiger", apellidos:"Nixon"}, acto:{id:"87", descripcion:"System Architect"}, unidades: 12, fecha: "2011/04/25", costo: 320.800},
              { nombres: {nombre: "Garrett", apellidos:"Winters"}, acto:{id:"26", descripcion:"Baccountant"}, unidades: 8, fecha: "2011/07/25", costo: 170.750},
              { nombres: {nombre: "Nixon", apellidos:"Winters"}, acto:{id:"8", descripcion:"Tuntant"}, unidades: 7, fecha: "2011/07/25", costo: 70.500},
              { nombres: {nombre: "Airi", apellidos:"Satou"}, acto:{id:"19", descripcion:"Accountant"}, unidades: 18, fecha: "2008/11/28", costo: 162.700},
              { nombres: {nombre: "Tiger", apellidos:"Nixon"}, acto:{id:"40", descripcion:"System Architect"}, unidades: 12, fecha: "2011/04/25", costo: 320.800},
              { nombres: {nombre: "Garrett", apellidos:"Winters"}, acto:{id:"9", descripcion:"Baccountant"}, unidades: 8, fecha: "2011/07/25", costo: 170.750},
              { nombres: {nombre: "Nixon", apellidos:"Winters"}, acto:{id:"54", descripcion:"Tuntant"}, unidades: 7, fecha: "2011/07/25", costo: 70.500},
              { nombres: {nombre: "Airi", apellidos:"Satou"}, acto:{id:"44", descripcion:"Accountant"}, unidades: 18, fecha: "2008/11/28", costo: 162.700}
          ];

          import axios from 'axios'

            export default {
              name: 'InicioAdmin',
              data () {
                return {
                  items: items,
                  fields: [
                    { key: 'nombres', label: 'Contribuyente', sortable: true },
                    { key: 'acto', label: 'Acto', sortable: true, 'class': 'text-center' },
                    { key: 'unidades', label: 'Unidades Tributarias', sortable: true },
                    { key: 'fecha', label: 'Fecha', sortable: true },
                    { key: 'costo', label: 'Costo', sortable: true }
                  ],
                  currentPage: 1,
                  perPage: 5,
                  totalRows: items.length,
                  pageOptions: [ 5, 10, 15 ],
                  sortBy: null,
                  sortDesc: false,
                  filter: null,
                  modalInfo: { title: '', content: '' }
                }
              },
              computed: {
                  sortOptions () {
                    // Create an options list from our fields
                    return this.fields
                      .filter(f => f.sortable)
                      .map(f => { return { text: f.label, value: f.key } })
                  }
                },
                methods: {
                  info (item, index, button) {
                    this.modalInfo.title = `Row index: ${index}`
                    this.modalInfo.content = JSON.stringify(item, null, 2)
                    this.$root.$emit('bv::show::modal', 'modalInfo', button)
                  },
                  resetModal () {
                    this.modalInfo.title = ''
                    this.modalInfo.content = ''
                  },
                  onFiltered (filteredItems) {
                    // Trigger pagination to update the number of buttons/pages due to filtering
                    this.totalRows = filteredItems.length
                    this.currentPage = 1
                  }
                },
                components: {
                  'breadcrumb': () => import('./breadcrumb')
                }
            }
 </script>