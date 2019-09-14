console.log( 'js' );

$( document ).ready( setUp)
  console.log( 'JQ' );

function setUp() {
    getTask()
    $( '#addTask' ).on( 'click', addTask)
    $( '#viewTask' ).on( 'click', '.completedBtn', taskComplete)
    deleteComplete();
} // end setUp

function getTask(){
    console.log( 'getting task' );

    $.ajax({
        type: 'GET',
        url: '/toDoTask'
    }).then(function(response){
          console.log(response);
          appendTask(response);
    }).catch(function(error){
        console.log('errrrrrrrrrrorrrrrrrrrrr', error)
    })
} // end GET getTask

function addTask(){
    console.log( 'adding task' );
    let taskAdded = {
        task: $( '#taskInput' ).val(),
        complete: 'Not Complete'
    };
    $.ajax({
        type: 'POST',
        url: '/toDoTask',
        data: taskAdded,
    }).then(function (response) {
        console.log('Response from server:', response);
        getTask()
    }).catch(function (error) {
        console.log('Error in POST:', error)
    });

    $( '#taskInput' ).val('');
} // end addTask POST

function appendTask(toDoAppend) {
    $( '#viewTask' ).empty();
    for( let i = 0; i < toDoAppend.length; i++){
        let list = toDoAppend[i];
        console.log( 'show results', list)
        if(list.complete == 'complete'){
            let row = $(`<tr>
                <td style="color:springgreen;">${list.task}</td>
                <td style="color:springgreen;">${list.complete}</td>
                <td></td>
                <td><button class="deleteBtn">Delete</button><td>
            </tr>`
        );
        row.data('id', list.id);
        $('#viewTask').append(row);
        } else {
            let row = $(`<tr>
                <td style="color:white;">${list.task}</td>
                <td style="color:white;">${list.complete}</td>
                <td><button class= "completedBtn">Completed</button></td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>`
        );
        row.data('id', list.id);
        $('#viewTask').append(row);
        }
    }
} // end appendTask

function taskComplete(){
    console.log("completeBtn clicked")
    let id = $(this).closest('tr').data('id');
    $.ajax({
        url: `/toDoTask/complete/${id}`,
        method: 'PUT'
    }).then(function (response) {
        console.log(response);
        getTask();
    }).catch(function (err) {
        console.log(err);
    })
} // end taskComplete PUT

function deleteComplete(){
    $('#viewTask').on('click', '.deleteBtn', deleteTask)
} // end deleteComplete

function deleteTask(){
    console.log('delete btn clicked');
    if (confirm('You sure you want to delete task?')) {
        let id = $(this).closest('tr').data('id');
        $.ajax({
          type: 'DELETE',
          url: `/toDoTask/delete/${id}`
        }).then(function (response) {
          console.log('delete', response);
          getTask();
        }).catch(function (error) {
          alert('error on delete', error)
        })
      }
} // end deleteTask DELETE