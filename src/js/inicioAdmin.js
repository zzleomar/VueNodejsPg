

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
                  OpcBreadcrumb = [
                      {
                        text: 'Inicio',
                        to: { name: 'InicioAdmin' },
                      }
                  ],
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
                }
            }