console.log('in js');

$(document).ready(function () {
    console.log('in jQ');

    //Establishing Click Listeners
    clickListeners();
    
    //Load test 'Tasks' on page load
    getTask();
});//end document ready

function clickListeners(){
    $("#addButton").on('click', function() {
        console.log('in clickListeners');

        let newTask = {
            task: "testTask",
            notes: "testTask",
            complete: "testComplete",
        };
    
    saveTask(newTask);
    });
    //function for deleting
    $(document).on('click', '.deleteBtn', deleteTask);

    //function for toggling complete
    $(document).on('click', '.changeComp', toggleComp);
    /* $(document).on('click', '.changeComp', changeColor); */
}

function changeColor(){
    let taskChange = $(this).parents("tr").data("complete");
    let taskId = $(this).parents("tr").data("id");

    console.log(taskChange);
    console.log(taskId);

    let greenStyle = {
        backgroundColor: "green"
    };

    let grayStyle = {
        backgroundColor: "gray"
    };
    
    
    if( taskChange === false){
        $(taskId).css(greenStyle);
    }
    else if ( taskChange === true){
        $(taskId).css(grayStyle);
    }
}

//toggle complete
function toggleComp(){
    console.log('toggleComp');
    
    let taskId = $(this).parents("tr").data("id");
    let taskChange = $(this).parents("tr").data("complete");

    $.ajax({
        method: 'PUT',
        url: `/task/${taskId}`,
        data: {
            complete: !taskChange
        }
    })
    .then(() => {
        console.log('PUT successful');
        getTask();
    })
    .catch((err) => {
        console.log('PUT failed', err);
    })
}

//delete function
function deleteTask(){
    console.log('in deleteTask');

    let taskId = $(this).parents("tr").data("id");
    //seeing what taskId is 
    console.log("taskId is:", taskId);
    
    //sending taskId to server
    $.ajax({
        method: "DELETE",
        url: `/task/${taskId}`,
    })
    .then((res) => {
        console.log('DELETE success');

        //sweetAlert
        sweetAlert({
            title: "Delete Task",
            text: "This task has been deleted!",
            icon: "success",
            buttons: true,
        })
        getTask();
    })
    .catch((err) => {
        console.log('DELETE failed', err);
    });
}


//'GET'ting the task
function getTask(){
    console.log('in getTask');

    $.ajax({
        type: "GET",
        url: "/task",
    })
    .then(function (response) {
        //seeing what response is
        console.log('GET /task response', response);
        
        //rendering 'response' to the DOM
        renderTask(response);
    })
    .catch((err) => {
        console.log("GET unsuccessful", err);
    });
}

//Render table data on DOM
function renderTask(response){
    //clearing the DOM
    $("#viewTask").empty();
    //checking what response is 
    console.log(response);

    //looping
    for(let i = 0; i < response.length; i++){
        if(`${response[i].complete} === false`){
            $("#viewTask").append(`
                <tr data-id = ${response[i].id} data-complete = ${response[i].complete}>
                    <td>${response[i].task}</td>
                    <td>${response[i].notes}</td>
                    <td data-id = ${response[i].id}>
                        ${response[i].complete}
                    </td>
                    <td>
                        <button class = "changeComp">
                        Complete Task
                        </button>
                    </td>
                    <td>
                        <button class = "deleteBtn">
                            Delete
                        </button>
                    </td>
                </tr>
            `);
        }
        if(response[i].complete){
            $(`${response[i].id}`).addClass('green')
        }
        else{
            $(`${response[i].id}`)
        }
    }
    
}

//Saving new input data and 'POST'ing
function saveTask(){
    console.log('in saveTask');

    let taskObject = {
        task: $("#taskIn").val(),
        notes: $("#notesIn").val(),
        complete: $("#complete").val()
    };

    $.ajax({
        type: "POST",
        url: "/task",
        data: taskObject
    })
    .then(function (response){
        //clear the inputs
        $("#taskIn").val(" "),
        $("#notesIn").val(" "),
        $("#complete").val(" ");

        getTask();
    });
}
