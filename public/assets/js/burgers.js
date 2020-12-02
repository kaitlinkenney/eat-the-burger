$(document).ready(function () {
    const burgers_elem = $("#submittedBurgers")
    const burgers_elem_two = $("#devouredBurgers")
    $.ajax("/burgers").then(function (data) {

        let burgers = data.burgers;
        console.log(burgers);
        let len = burgers.length;

        // if (burgers.devoured===1){
            
        // }
        for (let i = 0; i < len; i++) {
            if (burgers[i].devoured===1){
                burgers_elem_two.append("<li><p>" + burgers[i].burger_name + "<button data-burgerid='" + burgers[i].id + "' class='delBurger btn btn-danger'>Delete</button></p></li>")
                console.log("true");
            }
            else{
                burgers_elem.append("<li><p>" + burgers[i].burger_name + "<button data-burgerid='" + burgers[i].id + "' class='devourBurger btn btn-danger'>Devour</button></p></li>")
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
                console.log("added new burger");
                console.log(response);
                burgers_elem.append(newBurger);

                location.reload();
            }
        );
    });


    $(document).on("click", ".devourBurger", function (event) {
        console.log("test123")

        let id = $(this).data("burgerid");

        let updatedBurger = {
            devoured: 1
        };
        console.log(updatedBurger);
        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: updatedBurger
        }).then(
            function () {
                console.log("updated id ", id);

                location.reload();
            }
        );
    });

    

    $(document).on("click", ".delBurger", function (event) {

        let id = $(this).data("burgerid");

        console.log(id);
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
