var items = [
          { acto: {id:"12", descripcion:"Carta de Buena Conducta"}, unidades: 12, ley:{articulo:"Articulo "+"2",numeral:"Numeral "+"3",literal:"UNICO"}},
          { acto: {id: "21", descripcion: "Apostillado de Titulo de educación Superior"}, unidades: 32, ley:{articulo:"Articulo "+"12",numeral:"Numeral "+"1",literal:"UNICO"}},
          { acto:{id:"1", descripcion:"Apostillado de Titulo de educación básica"}, unidades: 25, ley:{articulo:"Articulo "+"24",numeral:"Numeral "+"4",literal:"a"}},
          { acto:{id:"54", descripcion:"Registro de una empresa mixta"}, unidades: 2, ley:{articulo:"Articulo "+"24",numeral:"Numeral "+"4",literal:"b"}},
          { acto:{id:"2", descripcion:"Licencia de Licoreria"}, unidades: 10, ley:{articulo:"Articulo "+"14",numeral:"Numeral "+"4",literal:"UNICO"}}
      ];

var app = new Vue({
  el: '#app',
    data () {
      return {
        items: items,
        fields: [
          { key: 'ley', label: 'Ley De Timbre Fiscal', sortable: true },
          { key: 'acto', label: 'Acto', sortable: true, 'class': 'text-center' },
          { key: 'unidades', label: 'Unidades Tributarias', sortable: true }
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
  });