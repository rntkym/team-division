function readCsv(){
  document.forms.myform.myfile.addEventListener( 'change', function(e) {
    var result = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText( result );
    reader.addEventListener( 'load', function() {
      var memberArray = reader.result.split('\n');
      memberArray.shift();
      var table = $('.table').children('tbody');
      for(var i = 0; i < memberArray.length; i++){
        memberArray[i] = memberArray[i].split(',');
        table.append('<tr>\
          <td>' + memberArray[i][0] + '</td>\
          <td>' + memberArray[i][1] + '</td>\
          </tr>');
      }
      document.getElementById('num').innerHTML = '人数：' + memberArray.length + '名';
    });
  });
}

function createArea(){
  var group = parseInt(document.getElementById('group').value);
  var row = $('#tbody').children().length;
  var perGroup = Math.ceil(row / group);

  for(var i = 0; i < group / 2; i++){
    $('#result-left').append("<ul class='list-group'>\
      <li class='list-group-item list-group-item-secondary'>" + (2 * i + 1) +"</li>\
      </ul>");
    for(var j = 0; j < perGroup; j++){
      $('#result-left').children('ul').last().append("<li class='list-group-item shuffle-area'></li>");
    }
  }

  for(var i = 0; i < Math.floor(group / 2); i++){
    $('#result-right').append("<ul class='list-group'>\
      <li class='list-group-item list-group-item-secondary'>" + 2 * (i + 1)  +"</li>\
      </ul>");
    for(var j = 0; j < perGroup; j++){
      $('#result-right').children('ul').last().append("<li class='list-group-item shuffle-area'></li>");
    }
  }
}

function start(){
  var memberArray = [];
  var row = $('#tbody').children().length;
  for(var i = 0; i < row; i++){
    memberArray.push($('#tbody').find('td').eq(2 * i).text());
  }
  roulette = setInterval(function(){
    var random = Math.floor(Math.random() * memberArray.length);
    var shuffleArea = $('.shuffle-area');
    var count = shuffleArea.length;
    for(var i = 0; i < count; i++){
      shuffleArea.eq(i).text(memberArray[(random + i) % count]);
    }
  }, 10);
}

function stop(){
  clearInterval(roulette);
  var status = true;
  var group = parseInt(document.getElementById('group').value);
  var memberArray = [];
  var copyArray = [];
  var groupArray = new Array(group);
  var row = $('#tbody').children().length;

  for(var i = 0; i < row; i++){
    var name = $('#tbody').find('td').eq(2 * i).text();
    var department = $('#tbody').find('td').eq(2 * i + 1).text().replace(/\r?\n/g, '');
    memberArray.push([department, name]);
  }

  while(status){
    status = false;
    memberArray = shuffle(memberArray);
    copyArray = memberArray.concat();
    for(var i = 0; i < group; i++){
      groupArray[i] = copyArray.splice(0, Math.ceil(copyArray.length / (group - i)));
      groupArray[i].sort();
    }

    loop:
    for(var i = 0; i < group; i++){
      for(var j = 0; j < groupArray[i].length - 1; j++){
        if(groupArray[i][j][0] != "" && groupArray[i][j][0] == groupArray[i][j + 1][0]){
          status = true;
          break loop;
        }
      }
    }
  }

  for(var i = 0; i < groupArray.length; i++){
    for(var j = 0; j < groupArray[i].length; j++){
      $('ul').eq(i).children('.shuffle-area').eq(j).text(groupArray[i][j][1]);
    }
    if(j < $('ul').eq(i).children('.shuffle-area').length){
      $('ul').eq(i).children('.shuffle-area').eq(j).text('　');
    }
  }
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]]
  }
  return array;
}
