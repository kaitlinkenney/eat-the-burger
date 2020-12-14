$(document).ready(function () {
    const burgers_elem = $("#submittedBurgers")
    const burgers_elem_two = $("#devouredBurgers")
    $.ajax("/burgers").then(function (data) {

        let burgers = data.burgers;

        let len = burgers.length;

        //appends the entered burgers with either a devour button or a delete button depending on devoured status
        for (let i = 0; i < len; i++) {
            if (burgers[i].devoured === 1) {
                burgers_elem_two.append("<li><p>" + burgers[i].burger_name + "  <button data-burgerid='" + burgers[i].id + "' class='delBurger btn btn-danger'>Delete</button></p></li>")

            }
            else {
                burgers_elem.append("<li><p>" + burgers[i].burger_name + "  <button data-burgerid='" + burgers[i].id + "' class='devourBurger btn btn-danger'>Devour</button></p></li>")
            }

        }

    })

    $("#addBurger").on("submit", function (event) {
       
        event.preventDefault();

        let newBurger = {
            burger_name: $("#addBurger [name=burger]").val().trim()
        };

        $.ajax("/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function (response) {

                burgers_elem.append(newBurger);

                location.reload();
            }
        );
    });


    $(document).on("click", ".devourBurger", function (event) {


        let id = $(this).data("burgerid");

        let updatedBurger = {
            devoured: 1
        };

        // Send the PUT request.
        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: updatedBurger
        }).then(
            function () {
                console.log("updated id ", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });


    $(document).on("click", ".delBurger", function (event) {

        //targets burger that was clicked
        let id = $(this).data("burgerid");
        
        console.log(id);

        //ajax call to delete a burger
        $.ajax("/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted id ", id);

                location.reload();
            }
        );
    });


})
