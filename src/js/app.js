var vm = new Vue({
  el: "#principal",
  data: {
    nome: "",
    dominio: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    cpf: "",
    observacoes: "",
    newsletter: 0,
    contatoWhatsapp: false,
    contatoEmail: false,
    dominios: [
      { label: "@gmail.com", value: "@gmail.com" },
      { label: "@hotmail.com", value: "@hotmail.com" },
      { label: "@icloud.com", value: "@icloud.com" },
      { label: "@outlook.com", value: "@outlook.com" },
      { label: "@live.com", value: "@live.com" },
      { label: "@yahoo.com", value: "@yahoo.com" },
      { label: "@ymail.com", value: "@ymail.com" },
      { label: "Nenhum desses", value: false }
    ],
    loading: false,
    cpfIsValid: false
  },
  watch: {
    cpf() {
      this.cpfIsValid = validarCPF(this.cpf) ? true : false;
    },
    email() {
      if (!this.email.split("@")[1]) {
        this.dominio = "";
      } else {
        console.log("@" + this.email.split("@")[1] == this.dominio);
      }
    },
    dominio() {
      this.email = this.dominio
        ? this.email.split("@")[0] + this.dominio
        : this.email;
      console.log(this.email);
    }
  },
  methods: {
    salvarInscricao() {
      this.loading = true;
      var aluno = {
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        dataNascimento: this.dataNascimento,
        cpf: this.cpf,
        observacoes: this.observacoes,
        newsletter: this.newsletter,
        contatoWhatsapp: this.contatoWhatsapp,
        contatoEmail: this.contatoEmail
      };
      localforage
        .setItem(this.cpf.replace(/\D/gi, ""), aluno)
        .then(function(value) {
          vm.$q
            .dialog({
              title: "Feito",
              message: "A inscrição foi realizada com sucesso!"
            })
            .then(() => {
              this.loading = false;
              window.location.reload();
            });
        })
        .catch(function(err) {
          alert(err);
        });
    },
    checkClick() {
      console.log("dadisuahudhasauids");
    }
  },
  mounted() {
    $("input#telefone").mask("(00) 00000-0000");
    $("input#data-nascimento").mask("00/00/0000");
    $("input#cpf").mask("000.000.000-00");
  }
});

var vmDataTable = new Vue({
  el: "#rodape",
  data: {
    columns: [
      {
        field: "nome",
        label: "Nome",
        name: "desc",
        align: "left",
        sortable: true,
        required: true
      },
      {
        field: "email",
        label: "E-mail",
        name: "desc",
        align: "left",
        sortable: true,
        required: true
      },
      {
        field: "telefone",
        label: "Telefone",
        name: "desc",
        align: "left",
        sortable: true,
        required: true
      },
      {
        field: "dataNascimento",
        label: "Data de Nascimento",
        name: "desc",
        align: "left",
        sortable: true,
        required: true
      },
      {
        field: "cpf",
        label: "CPF",
        name: "desc",
        align: "left",
        sortable: true
      },
      {
        field: "newsletter",
        label: "Newsletter",
        name: "desc",
        align: "left",
        sortable: true
      },
      {
        field: "contatoWhatsapp",
        label: "Contato pelo Whats",
        name: "desc",
        align: "left",
        sortable: true
      },
      {
        field: "contatoEmail",
        label: "Contato pelo E-mail",
        name: "desc",
        align: "left",
        sortable: true
      },
      {
        field: "observacoes",
        label: "Observações",
        name: "desc",
        align: "left",
        sortable: true
      }
    ],
    tableData: [],
    rowsPerPage: 10
  },
  created() {
    localforage.iterate(function(data, id, iterationNumber) {
      vmDataTable.tableData.push(data);
    });
  },
  mounted() {
    // console.log("teste 7");
    // setTimeout(function() {
    //   exportTableToCSV();
    //   console.log("active!!!");
    // }, 5000);
  }
});
