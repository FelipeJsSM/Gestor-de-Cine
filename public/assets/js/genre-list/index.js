$(document).ready(function () {

    $(".delete-genre").on("click", function (e) {
      e.preventDefault();
      let form = $(this).closest(".form-delete");
  
      $.confirm({
        title: "¿Está seguro de eliminar el genero?",
        content: "Esta acción no se puede deshacer.",
        type: "red",
        buttons: {
          cancel: {
            text: "Cancelar",
            btnClass: "btn btn-danger",
            action: function () {
              toastr.info("Acción cancelada", "Notificación", {
                timeOut: 2000,
              });
            },
          },
          confirm: {
            text: "Eliminar",
            btnClass: "btn btn-success",
            action: function () {
              form.submit();
              toastr.success("Serie eliminada correctamente", "Notificación", {
                timeOut: 2000,
              });
            },
          }
        }
      });
    });
  
  
    if (localStorage.getItem("toastrMessage")) {
      toastr.success(localStorage.getItem("toastrMessage"), "Notificación", {
        timeOut: 3000,
      });
      localStorage.removeItem("toastrMessage");
    }
  
    $("#genreForm").on("submit", function (e) {
      let isValid = true;
      let errorMessage = "Todos los campos son obligatorios:\n";
  
      let name = $("#title").val().trim();
  
      if (!name) {
        isValid = false;
        errorMessage += "- Nombre de la serie\n";
      }
  
      if (!isValid) {
        e.preventDefault();
        toastr.error(errorMessage, "Error", { timeOut: 3000 });
      } else {
        localStorage.setItem("toastrMessage", "Serie guardada correctamente");
      }
    });
  });
  