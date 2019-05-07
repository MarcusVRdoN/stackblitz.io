Quasar.i18n.set(Quasar.i18n.ptBr);

// VALIDATE CPF's NUMBER
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") {
    return false;
  }
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    return false;
  }
  // Valida 1º digito verificador
  add = 0;
  for (i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }
  if (rev != parseInt(cpf.charAt(9))) {
    return false;
  }
  // Valida 2º digito verificador
  add = 0;
  for (i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }
  if (rev != parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}

// DOWNLOAD PARTICIPANT'S LIST OF SELECTED OFICINA
function downloadTableExcel(tableClass) {
  tableHtml = "<table border='1px'>";
  var table = document.getElementsByClassName(tableClass)[0];
  for (var i = 0; i < table.rows.length; i++) {
    tableHtml = tableHtml + removeAccents(table.rows[i].outerHTML);
  }
  tableHtml = tableHtml + "</table>";
  // return window.open('data:application/vnd.ms-excel;charset=UTF-8,' + escape(tableHtml.replace(/<br>/ig, " / ")));
  excelData = new Blob([tableHtml.replace(/<br>/gi, " / ")], {
    type: "application/vnd.ms-excel;charset=UTF-8"
  });
  url = URL.createObjectURL(excelData);
  console.log(url);
  return window.open(url);
}

// REMOVE ACCENTS
function removeAccents(str) {
  var accents =
    "ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
  var accentsOut =
    "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  str = str.split("");
  str.forEach(function(letter, index) {
    var i = accents.indexOf(letter);
    if (i != -1) {
      str[index] = accentsOut[i];
    }
  });
  return str.join("");
}

localforage.config({
  name: "Inscrições",
  description:
    "Banco de dados offline com as informações dos inscritos na feira.",
  size: 4980736
});

$(document).on("submit", "#inscricao", function(event) {
  event.preventDefault();
  vm.salvarInscricao();
});

function exportTableToCSV($table, filename) {
  var $rows = $(".q-table").find("tr:has(td),tr:has(th)"),
    // Temporary delimiter characters unlikely to be typed by keyboard
    // This is to avoid accidentally splitting the actual contents
    tmpColDelim = String.fromCharCode(11), // vertical tab character
    tmpRowDelim = String.fromCharCode(0), // null character
    // actual delimiter characters for CSV format
    colDelim = '","',
    rowDelim = '"\r\n"',
    // Grab text from table into CSV formatted string
    csv =
      '"' +
      $rows
        .map(function(i, row) {
          var $row = $(row),
            $cols = $row.find("td,th");

          return $cols
            .map(function(j, col) {
              var $col = $(col),
                text = $col.text();

              return text.replace(/"/g, '""'); // escape double quotes
            })
            .get()
            .join(tmpColDelim);
        })
        .get()
        .join(tmpRowDelim)
        .split(tmpRowDelim)
        .join(rowDelim)
        .split(tmpColDelim)
        .join(colDelim) +
      '"',
    // Data URI
    csvData = "data:application/csv;charset=utf-8," + encodeURIComponent(csv);

  // console.log(csv);
  // console.log(csvData);

  // $("#download").attr("href", csvData);
  // $("#download").click();
  return window.open(csvData);
}

// This must be a hyperlink
// $(document).on("click", "#download", function(event) {
//   exportTableToCSV.apply(this, [$(".q-table"), "export.csv"]);

//   // IF CSV, don't do event.preventDefault() or return false
//   // We actually need this to be a typical hyperlink
// });

// function teste() {
//   tableHtml = "<table border='1px'>";
//   var table = document.getElementsByClassName("q-table")[0];
//   for (var i = 0; i < table.rows.length; i++) {
//     tableHtml = tableHtml + removeAccents(table.rows[i].outerHTML);
//   }
//   tableHtml = tableHtml + "</table>";

//   excelData = new Blob([tableHtml.replace(/<br>/gi, " / ")], {
//     // type: "application/vnd.ms-excel;charset=UTF-8"
//     type: "text/csv"
//   });
//   url = URL.createObjectURL(excelData);
//   console.log(url);
//   // return window.open(url);

//   // var blob = new Blob([scope.csv],{
//   //   type: 'text/csv'
//   // });
//   // var csvUrl = URL.createObjectURL(blob);
//   // Safari doesn't allow downloading of blob urls
//   var reader = new FileReader();
//   // reader.readAsDataURL(blob);
//   reader.readAsDataURL(excelData);
//   reader.onloadend = function() {
//     var base64data = reader.result;
//     $("#download").attr(
//       "href",
//       "data:attachment/file" + base64data.slice(base64data.search(/[,;]/))
//     );
//   };
// }
