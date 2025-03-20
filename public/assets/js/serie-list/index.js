$(document).ready(function () {

  $(".delete-serie").on("click", function (e) {
    e.preventDefault();
    let form = $(this).closest(".form-delete");

    $.confirm({
      title: "¿Está seguro de eliminar la serie?",
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

  $("#serieForm").on("submit", function (e) {
    let isValid = true;
    let errorMessage = "Todos los campos son obligatorios:\n";

    let name = $("#title").val().trim();
    let imageURL = $("#image").val().trim();
    let videoURL = $("#video").val().trim();
    let genre = $("#genreName").val();

    if (!name) {
      isValid = false;
      errorMessage += "- Nombre de la serie\n";
    }
    if (!imageURL) {
      isValid = false;
      errorMessage += "- Imagen de portada\n";
    }
    if (!videoURL) {
      isValid = false;
      errorMessage += "- Enlace del video\n";
    }
    if (!genre || genre === "Seleccione un género") {
      isValid = false;
      errorMessage += "- Género\n";
    }

    if (!isValid) {
      e.preventDefault();
      toastr.error(errorMessage, "Error", { timeOut: 3000 });
    } else {
      localStorage.setItem("toastrMessage", "Serie guardada correctamente");
    }
  });
});
