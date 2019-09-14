console.log( 'js' );

$( document ).ready( setUp)
  console.log( 'JQ' );

function setUp() {
    getTask()
    $( '#addTask' ).on( 'click', addTask)
}

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
} // end getTask

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
} // end addTask

function appendTask(toDoAppend) {
    $( '#viewTask' ).empty();
    for( let i = 0; i < toDoAppend.length; i++){
        let list = toDoAppend[i];
        console.log( 'show results', list)
        if(list.complete == 'complete'){
            let row = $(`<tr>
                <td style="color:springgreen;">${list.task}</td>
                <td style="color:springgreen;">${list.completed}</td>
                <td></td>
                <td><button class="deleteBtn">Delete</button><td>
            </tr>`
        );
        row.data('id', list.id);
        $('#viewTask').append(row);
        } else {
            let row = $(`<tr>
                <td style="color:white;">${list.task}</td>
                <td style="color:white;">${list.completed}</td>
                <td><button class= "completedBtn">Completed</button></td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>`
        );
        row.data('id', list.id);
        $('#viewTask').append(row);
        }
    }
} // end appendTask
