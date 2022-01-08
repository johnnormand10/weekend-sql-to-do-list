console.log('in js');

$(document).ready(function () {
    console.log('in jQ');

    //Establishing Click Listeners
    clickListeners();
    
    //Load test 'Tasks' on page load
    getTask();
});//end document ready

function clickListeners(){
    console.log('in clickListeners');
    
    //function for deleting
    $(document).on('click', '.deleteBtn', deleteTask);

    //function for toggling complete
    $(document).on('click', '.changeComp', toggleComp);
}

//toggle complete
function toggleComp(){
    console.log('toggleComp');
    
    let taskId = $(this).parents("td").data("id");
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
    for(let task of response){
        $("viewTask").append(`
            <tr data-id = ${task.id} data-complete = ${task.complete}>
                <td>${task.task}</td>
                <td>${task.notes}</td>
                <td data-id = ${task.id}>
                    ${task.complete}
                    <button class = "changeComp">
                    Toggle
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
    
}

//Saving new input data and 'POST'ing
function saveTask(){
    console.log('in saveTask');

    let taskObject = {
        task: $("#taskIn").val(),
        notes: $("#notesIn").val()
    };

    $.ajax({
        type: "POST",
        url: "/task",
        data: taskObject
    })
    .then(function (response){
        //clear the inputs
        $("#taskIn").val(" "),
        $("#notesIn").val(" ");

        getTask();
    });
}
